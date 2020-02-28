let a = 2;
const b = (a = a * 2, a);
console.log(b);