// The function takes an array of objects and a property name to extract from each object.
function pluck<TItem, Tkey extends keyof TItem>(items: TItem[], key: Tkey) {
  return items.map((item) => item[key]);
}

const users = [
  { id: 1, name: "Alice", age: 25 },
  { id: 2, name: "Bob", age: 30 },
];

const names = pluck(users, "name"); // Expected type: string[]
const ages = pluck(users, "age"); // Expected type: number[]
// const invalid = pluck(users, "salary"); // TS should throw a compilation error!

console.log(names); // ["Alice", "Bob"]
console.log(ages); // [25, 30]
// Tip: hover over `names` and `ages` in your editor — their inferred types should be string[] and number[], not any[]

pluck(users, "salary");
