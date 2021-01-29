type Admin = {
  name: string;
  privileges: string[];
};

type Employee = {
  name: string;
  startDate: Date;
};

type ElevatedEmployee = Admin & Employee;

const e1: ElevatedEmployee = {
  name: "Max",
  privileges: ["create-server"],
  startDate: new Date(),
};

type Combinable = string | number;
type Numeric = number | boolean;

type Universal = Combinable & Numeric;

function add(a: number, b: number): number;
function add(a: string, b: string): string;
function add(a: Combinable, b: Combinable) {
  if (typeof a === "string" || typeof b === "string") {
    return a.toString() + b.toString();
  }
  return a + b;
}


const result = add("1", "5");
console.log(result);

const fetchedUserData = {
  id: 'u1',
  name: 'Max',
  // job: { title: 'CEO', description: 'My own company' }S
};

console.log(fetchedUserData?.job?.title);

const userInput = '';

// const storedData = userInput || 'DEFAULT'; 
const storedData = userInput ?? 'DEFAULT'; 

console.log(storedData);


// type UnkownEmployee = Employee | Admin;

// function printEmployeeInformation(emp: UnkownEmployee) {
//   console.log("Name: " + emp.name);
//   if ("privileges" in emp) {
//     console.log("privileges: " + emp.privileges);
//   }
// }

// // printEmployeeInformation(e1);
// printEmployeeInformation({ name: "Manu", startDate: new Date() });

// class Car {
//   drive() {
//     console.log("Driving...");
//   }
// }

// class Truck {
//   drive() {
//     console.log("Driving a truck...");
//   }

//   loadCargo(amount: number) {
//     console.log("Loding cargo " + amount);
//   }
// }

// type Vechicle = Car | Truck;

// const v1 = new Car();
// const v2 = new Truck();

// function useVechicle(vechicle: Vechicle) {
//   vechicle.drive();
//   if (vechicle instanceof Truck) {
//     vechicle.loadCargo(1000);
//   }
// }

// useVechicle(v1);
// useVechicle(v2);

// interface Bird {
//   type: "bird";
//   flyingSpeed: number;
// }

// interface Horse {
//   type: "horse";
//   runningSpeed: number;
// }

// type Animal = Bird | Horse;

// function moveAnimal(animal: Animal) {
//   let speed;
//   switch (animal.type) {
//     case "bird":
//       speed = animal.flyingSpeed;
//       break;
//     case "horse":
//       speed = animal.runningSpeed;
//       break;
//   }
//   console.log('Moving at speed: '+ speed);
// }

// moveAnimal({type: 'bird', flyingSpeed: 10});

// const userInputElement = document.getElementById('input');

// if(userInputElement) {
//   (userInputElement as HTMLInputElement).value = 'Hi there';
// }

// interface ErrorContainer { // { email: 'Not a valid email', username: 'Must start'}
// [prop: string]: string;
// }

// const errorBag: ErrorContainer = {
// email: 'Not a valid email!'
// };