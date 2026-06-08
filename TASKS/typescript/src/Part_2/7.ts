interface Cat {
  type: "cat";
  meow: () => void;
}
interface Dog {
  type: "dog";
  bark: () => void;
}

type MaybeAnimal = Cat | Dog | undefined | null;
const animals: MaybeAnimal[] = [
  { type: "cat", meow: () => console.log("Meow") },
  null,
  { type: "dog", bark: () => console.log("Woof") },
  undefined,
];

function isNonNullable<T>(data: T): data is NonNullable<T> {
  return data !== null && data !== undefined;
}

function isCat(maybeCat: MaybeAnimal): maybeCat is Cat {
  return (
    maybeCat !== null &&
    typeof maybeCat === "object" &&
    "type" in maybeCat &&
    maybeCat.type === "cat" &&
    "meow" in maybeCat &&
    typeof maybeCat.meow === "function"
  );
}

// TS thinks the type of `cats` is still (Cat | Dog | undefined | null)[]
const cats = animals.filter(isCat);

cats.forEach((cat) => cat.meow()); // TS Error — it doesn't know these are Cat

console.log(cats.length); // 1

// Bonus verify — stripping nulls from any array:
const defined = animals.filter(isNonNullable); // should be (Cat | Dog)[], not (Cat | Dog | null | undefined)[]
console.log(defined.length); // 2
