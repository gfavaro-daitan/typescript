"use strict";
// const names: Array<string> = ['Max','Manuel'];
// // names[0].split(' ');
// const promise: Promise<string> = new Promise((resolve, reject) => {
// setTimeout( () => {
//     resolve('This is done!');
// },2000)
// });
// promise.then(data => {
//     // data.split(' ');
// })
function merge(objA, objB) {
    return Object.assign(objA, objB);
}
const mergedObj = merge({ name: "Max", hobbies: ["a"] }, { age: 30 });
console.log(mergedObj);
function countAndDescribe(element) {
    let descriptionText = "Got no value.";
    if (element.length > 0) {
        descriptionText = "Got " + element.length + " elements";
    }
    return [element, descriptionText];
}
console.log(countAndDescribe(["Sports", "Count"]));
function extractAndConvert(obj, key) {
    return obj[key];
}
console.log(extractAndConvert({ name: "Max" }, "name"));
class DataStorage {
    constructor() {
        this.data = [];
    }
    addItem(item) {
        this.data.push(item);
    }
    removeItem(item) {
        if (this.data.indexOf(item) === -1) {
            return;
        }
        this.data.splice(this.data.indexOf(item), 1);
    }
    getItems() {
        return [...this.data];
    }
}
const textStorage = new DataStorage();
textStorage.addItem("Max");
textStorage.addItem("Manu");
textStorage.removeItem("Max");
console.log(textStorage.getItems());
function createCourseGoal(title, description, date) {
    let courseGoal = {};
    courseGoal.title = title;
    courseGoal.description = description;
    courseGoal.completeUntil = date;
    return courseGoal;
}
const names = ['Max', 'sports'];
// names.push('Manu');
// names.pop();
