"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var userName = "Max";
// let age = 30;
// age = 29;
// if (age > 20) {
//   let isOld = true;
// }
// console.log(isOld);
// const add = (a: number, b: number = 1) => a + b;
// console.log(add(2, 5));
// const printOutput: (a: number | string) => void = output => console.log(output);
// printOutput(add(2, 3));
var hobbies = ["Sports", "Cooking"];
var activeHobbies = ["Hiking"];
activeHobbies.push.apply(activeHobbies, hobbies);
var person = {
    firstName: "Max",
    age: 30,
};
var copiedPerson = __assign({}, person);
var add = function () {
    var numbers = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        numbers[_i] = arguments[_i];
    }
    return numbers.reduce(function (curResult, curValue) {
        return curResult + curValue;
    }, 0);
};
var addedNumbers = add(5, 10, 2, 3, 3);
console.log(addedNumbers);
var hobby1 = hobbies[0], hobby2 = hobbies[1], remainingHobbies = hobbies.slice(2);
console.log(hobbies, hobby1, hobby2);
var firstName = person.firstName, age = person.age;
console.log(firstName + "\xa0" + age);
