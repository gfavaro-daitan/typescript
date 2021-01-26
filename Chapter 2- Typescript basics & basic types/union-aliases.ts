type Combinable = number | string;


function combine(
  input1: Combinable,
  input2: Combinable,
  resultConversion: 'as-number' | 'as-text'
) {
  let result;
  if (typeof input1 === "number" && typeof input2 === "number" || resultConversion === 'as-number') {
    result = +input1 + +input2;
  } else {
    result = input1.toString() + input2.toString();
  }
//   if (resultConversion === "as-number") {
//     return +result;
//   } else {
//       return result.toString();
//   }

return result;

}

const combinedAges = combine(10, 20, "as-number");
console.log(combinedAges);

const combinedStringAges = combine("10", "20", "as-number");
console.log(combinedStringAges);

const combinedNames = combine("João", "Maria", "as-text");
console.log(combinedNames);
