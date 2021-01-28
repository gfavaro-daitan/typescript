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

function add(a: Combinable, b: Combinable) {
  if (typeof a === "string" || typeof b === "string") {
    return a.toString() + b.toString();
  }
  return a + b;
}

type UnkownEmployee = Employee | Admin;

function printEmployeeInformation(emp: UnkownEmployee) {
  console.log("Name: " + emp.name);
  if ("privileges" in emp) {
    console.log("privileges: " + emp.privileges);
  }
}

// printEmployeeInformation(e1);
printEmployeeInformation({ name: "Manu", startDate: new Date() });

class Car {
  drive() {
    console.log("Driving...");
  }
}

class Truck {
  drive() {
    console.log("Driving a truck...");
  }

  loadCargo(amount: number) {
    console.log("Loding cargo " + amount);
  }
}

type Vechicle = Car | Truck;

const v1 = new Car();
const v2 = new Truck();

function useVechicle(vechicle: Vechicle) {
  vechicle.drive();
  if (vechicle instanceof Truck) {
    vechicle.loadCargo(1000);
  }
}

useVechicle(v1);
useVechicle(v2);

interface Bird {
  type: "bird";
  flyingSpeed: number;
}

interface Horse {
  type: "horse";
  runningSpeed: number;
}

type Animal = Bird | Horse;

function moveAnimal(animal: Animal) {
  let speed;
  switch (animal.type) {
    case "bird":
      speed = animal.flyingSpeed;
      break;
    case "horse":
      speed = animal.runningSpeed;
      break;
  }
  console.log('Moving at speed: '+ speed);
}

moveAnimal({type: 'bird', flyingSpeed: 10});
