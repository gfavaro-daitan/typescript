"use strict";
/* const person: {
    name: string;
    age: number;
    hobbies: string[];
    role: [number,string];
} = {
    name: 'Maximilian',
    age: 30,
    hobbies: ['Sports', 'Cooking'],
    role: [2, 'author']
};

 */
var Role;
(function (Role) {
    Role[Role["ADMIN"] = 0] = "ADMIN";
    Role[Role["READL_ONLY"] = 1] = "READL_ONLY";
    Role[Role["AUTHOR"] = 2] = "AUTHOR";
})(Role || (Role = {}));
;
var person = {
    name: 'Maximilian',
    age: 30,
    hobbies: ['Sports', 'Cooking'],
    role: Role.ADMIN
};
//person.role.push('admin');
//person.role[1] = 10;
var favoriteActivities;
favoriteActivities = ['Sports'];
console.log(person.name);
