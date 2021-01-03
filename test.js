/**
 * QUESTION 01
 */

let obj = {
  a: 10,
  b: 20
};

let obj2 = {
  a: 10,
  b: 20
};

console.log(obj == obj2);
console.log(obj === obj2);

let obj3 = obj;

console.log(obj3 == obj);
console.log(obj3 === obj);

/**
 * QUESTION 02
 */

var arr = [1, 2, 3, 4, 5];

for (var i = 0; i < arr.length; i++) {
  setTimeout(() => console.log(arr[i]), 500);
}

const arr1 = [1, 2, 3, 4, 5];

for (let i = 0; i < arr.length; i++) {
  setTimeout(() => console.log(arr1[i]), 500);
}

/**
 * QUESTION 03
 */

console.log(1);
setTimeout(() => console.log(2), 0);
console.log(3);
Promise.resolve(console.log(4));

/**
 * QUESTION 04
 */

let a1 = [1, 2, 3];
let a2 = [1, 2, 3];

console.log(a1 == a2);
console.log(JSON.stringify(a1) == JSON.stringify(a2));

let EXAM = [
  {
    Subeject: "English",
    result: {
      point: 80,
      grade: "A+"
    }
  },
  {
    Subeject: "Physics",
    result: {
      point: 85,
      grade: "A+"
    }
  },
  {
    Subeject: "Math",
    result: {
      point: 89,
      grade: "A+"
    }
  }
];

let totalRes = 0;
EXAM.map(subject => (totalRes += subject.result.point));

console.log(totalRes);
console.log((totalRes/EXAM.length).toFixed(2));