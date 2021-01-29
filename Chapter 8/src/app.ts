function Logger(logString: string) {
  console.log("Loggger factory");
  return function (constructor: Function) {
    console.log(constructor);
    console.log(logString);
  };
}

function WithTemplate(template: string, hookId: string) {
  return function <T extends { new (...args: any[]): { name: string } }>(
    originalConstructor: T
  ) {
    return class extends originalConstructor {
      constructor(..._: any[]) {
        super();
        console.log("Rendering template");
        const hookEl = document.getElementById(hookId);
        if (hookEl) {
          hookEl.innerHTML = template;
          hookEl.querySelector("h1")!.textContent = this.name;
        }
      }
    };
  };
}

// @Logger('LOGGING - PERSON')
@Logger("LOGGING")
@WithTemplate("<h1>My person object</h1>", "app")
class Person {
  name = "Max";

  constructor() {
    console.log("Creating person object...");
  }
}

// const pers = new Person();

// console.log(pers);

// --

function Log(target: any, propertyName: string | Symbol) {
  console.log("Property decorator!");
  console.log(target);
}

function Log2(target: any, name: string, descriptor: PropertyDescriptor) {
  console.log("Accesor decorator!");
  console.log(target);
  console.log(name);
}

function Log3(
  target: any,
  name: string | Symbol,
  descriptor: PropertyDescriptor
) {
  console.log("Method decorator!");
  console.log(target);
  console.log(name);
  console.log(descriptor);
}

function Log4(target: any, name: string | Symbol, position: number) {
  console.log("Parameter decorator!");
  console.log(target);
  console.log(name);
}

class Product {
  @Log
  title: string;
  private _price: number;

  @Log2
  set price(val: number) {
    if (val > 0) {
      this._price = val;
    } else {
      throw new Error("Invalid price - should be positive!");
    }
  }

  constructor(t: string) {
    this.title = t;
    this._price = 0;
  }

  @Log3
  getPriceWithTax(@Log4 tax: number) {
    return this.price * (1 + tax);
  }
}

const p1 = new Product("Mac");

function Autobind(
  taget: any,
  methodName: string,
  descriptor: PropertyDescriptor
) {
  const originalMethod = descriptor.value;
  const adjDescriptor: PropertyDescriptor = {
    configurable: true,
    enumerable: false,
    get() {
      const boundFn = originalMethod.bind(this);
      return boundFn;
    },
  };
  return adjDescriptor;
}

class Printer {
  message = "This works!";

  @Autobind
  showMessage() {
    console.log(this.message);
  }
}

const p = new Printer();

const button = document.querySelector("button") as HTMLButtonElement;
button.addEventListener("click", p.showMessage);

// ---

interface ValidatorConfig {
  [property: string]: {
    [validatableProperty: string]: string[];
  };
}

const registeredValidators: ValidatorConfig = {};

function Necessary(target: any, propName: string) {
  registeredValidators[target.constructor.name] = {
    [propName]: ["required"],
  };
}

function PositiveNumber(target: any, propName: string) {
  registeredValidators[target.constructor.name] = {
    [propName]: ["positive"],
  };
}
function validate(obj: any) {
  const objvalidatorConfig = registeredValidators[obj.constructor.name];
  if (!objvalidatorConfig) {
    return true;
  }
  let isValid = true;
  for (const prop in objvalidatorConfig) {
    for (const validator of objvalidatorConfig[prop]) {
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

class Course {
  @Necessary
  title: string;
  @PositiveNumber
  price: number;

  constructor(t: string, p: number) {
    this.title = t;
    this.price = p;
  }
}

const courseForm = document.querySelector("form")!;
courseForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const titleEl = document.getElementById("title") as HTMLInputElement;
  const priceEl = document.getElementById("price") as HTMLInputElement;

  const title = titleEl.value;
  const price = +priceEl.value;

  const createdCourse = new Course(title, price);

  if (!validate(createdCourse)) {
    alert("Invalid input, please try again!");
    return;
  }
 
  console.log(createdCourse);
});
