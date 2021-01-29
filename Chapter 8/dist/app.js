"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
function Logger(logString) {
    console.log("Loggger factory");
    return function (constructor) {
        console.log(constructor);
        console.log(logString);
    };
}
function WithTemplate(template, hookId) {
    return function (originalConstructor) {
        return /** @class */ (function (_super) {
            __extends(class_1, _super);
            function class_1() {
                var _ = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    _[_i] = arguments[_i];
                }
                var _this = _super.call(this) || this;
                console.log("Rendering template");
                var hookEl = document.getElementById(hookId);
                if (hookEl) {
                    hookEl.innerHTML = template;
                    hookEl.querySelector("h1").textContent = _this.name;
                }
                return _this;
            }
            return class_1;
        }(originalConstructor));
    };
}
// @Logger('LOGGING - PERSON')
var Person = /** @class */ (function () {
    function Person() {
        this.name = "Max";
        console.log("Creating person object...");
    }
    Person = __decorate([
        Logger("LOGGING"),
        WithTemplate("<h1>My person object</h1>", "app")
    ], Person);
    return Person;
}());
// const pers = new Person();
// console.log(pers);
// --
function Log(target, propertyName) {
    console.log("Property decorator!");
    console.log(target);
}
function Log2(target, name, descriptor) {
    console.log("Accesor decorator!");
    console.log(target);
    console.log(name);
}
function Log3(target, name, descriptor) {
    console.log("Method decorator!");
    console.log(target);
    console.log(name);
    console.log(descriptor);
}
function Log4(target, name, position) {
    console.log("Parameter decorator!");
    console.log(target);
    console.log(name);
}
var Product = /** @class */ (function () {
    function Product(t) {
        this.title = t;
        this._price = 0;
    }
    Object.defineProperty(Product.prototype, "price", {
        set: function (val) {
            if (val > 0) {
                this._price = val;
            }
            else {
                throw new Error("Invalid price - should be positive!");
            }
        },
        enumerable: false,
        configurable: true
    });
    Product.prototype.getPriceWithTax = function (tax) {
        return this.price * (1 + tax);
    };
    __decorate([
        Log
    ], Product.prototype, "title", void 0);
    __decorate([
        Log2
    ], Product.prototype, "price", null);
    __decorate([
        Log3,
        __param(0, Log4)
    ], Product.prototype, "getPriceWithTax", null);
    return Product;
}());
var p1 = new Product("Mac");
function Autobind(taget, methodName, descriptor) {
    var originalMethod = descriptor.value;
    var adjDescriptor = {
        configurable: true,
        enumerable: false,
        get: function () {
            var boundFn = originalMethod.bind(this);
            return boundFn;
        },
    };
    return adjDescriptor;
}
var Printer = /** @class */ (function () {
    function Printer() {
        this.message = "This works!";
    }
    Printer.prototype.showMessage = function () {
        console.log(this.message);
    };
    __decorate([
        Autobind
    ], Printer.prototype, "showMessage", null);
    return Printer;
}());
var p = new Printer();
var button = document.querySelector("button");
button.addEventListener("click", p.showMessage);
var registeredValidators = {};
function Necessary(target, propName) {
    var _a;
    registeredValidators[target.constructor.name] = (_a = {},
        _a[propName] = ["required"],
        _a);
}
function PositiveNumber(target, propName) {
    var _a;
    registeredValidators[target.constructor.name] = (_a = {},
        _a[propName] = ["positive"],
        _a);
}
function validate(obj) {
    var objvalidatorConfig = registeredValidators[obj.constructor.name];
    if (!objvalidatorConfig) {
        return true;
    }
    var isValid = true;
    for (var prop in objvalidatorConfig) {
        for (var _i = 0, _a = objvalidatorConfig[prop]; _i < _a.length; _i++) {
            var validator = _a[_i];
            switch (validator) {
                case "required":
                    isValid = isValid && !!obj[prop];
                case "positive":
                    isValid = isValid && obj[prop] > 0;
            }
        }
    }
    return isValid;
}
var Course = /** @class */ (function () {
    function Course(t, p) {
        this.title = t;
        this.price = p;
    }
    __decorate([
        Necessary
    ], Course.prototype, "title", void 0);
    __decorate([
        PositiveNumber
    ], Course.prototype, "price", void 0);
    return Course;
}());
var courseForm = document.querySelector("form");
courseForm.addEventListener("submit", function (event) {
    event.preventDefault();
    var titleEl = document.getElementById("title");
    var priceEl = document.getElementById("price");
    var title = titleEl.value;
    var price = +priceEl.value;
    var createdCourse = new Course(title, price);
    if (!validate(createdCourse)) {
        alert("Invalid input, please try again!");
        return;
    }
    console.log(createdCourse);
});
