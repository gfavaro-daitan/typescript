
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

enum Role { ADMIN, READL_ONLY, AUTHOR};

const person = {
    name: 'Maximilian',
    age: 30,
    hobbies: ['Sports', 'Cooking'],
    role: Role.ADMIN
};


//person.role.push('admin');
//person.role[1] = 10;

let favoriteActivities: any[];
favoriteActivities = ['Sports'];

console.log(person.name);

