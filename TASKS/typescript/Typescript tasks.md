# TypeScript Challenges

The goal is not just to write working code, but to leverage TypeScript's type system to create self-documenting, bulletproof, and scalable architectures.

---

## Part 1. Foundation & Type Safety

### Challenge 1: The Blind Parser

**The Problem:**
`JSON.parse` returns `any`, which completely disables TypeScript's safety net. This is dangerous because TypeScript will not warn you if the data shape changes, leading to unexpected runtime crashes.

```typescript
function getUserNameFromJSON(jsonString: string) {
  // JSON.parse returns `any`. TS won't highlight an error if 'user' or 'name' are missing.
  const data = JSON.parse(jsonString);

  return data.user.name;
}
```

**Your Mission:**

- Refactor the function to eliminate the implicit loss of type safety. The goal is to treat unverified external data as `unknown`, not `any`.
- Implement a mechanism that proves the object's structure to the TypeScript compiler at runtime before allowing access to `data.user.name`.
- If the parsed data does not match the expected shape, handle it gracefully (e.g., return `null` or throw a descriptive error).

**Verify your solution:**

```typescript
console.log(getUserNameFromJSON('{"user":{"name":"Alice"}}')); // "Alice"
console.log(getUserNameFromJSON('{"user":{"age":25}}')); // null  (name field missing)
console.log(getUserNameFromJSON('{"wrong":"shape"}')); // null  (user field missing)
```

---

### Challenge 2: Context-Aware Returns

**The Problem:**
A single function handles multiple input types and returns a differently shaped object depending on what was passed. TypeScript currently merges the return shapes into a union, causing ambiguity and property access errors downstream.

```typescript
// If we pass an id (number), we return { id: number, status: string }
// If we pass a username (string), we return { username: string, status: string }
function fetchUser(identifier: number | string) {
  if (typeof identifier === "number") {
    return { id: identifier, status: "active" };
  } else {
    return { username: identifier, status: "active" };
  }
}

const userById = fetchUser(101);
// TS thinks userById.id might not exist, since the return type is a union
console.log(userById.id); // TypeScript Error
```

**Your Mission:**

- Enhance the function's typing so that TypeScript can definitively predict the exact return shape based strictly on the input type provided at the call site.

**Verify your solution:**

```typescript
const userById = fetchUser(101);
const userByName = fetchUser("alice");

console.log(userById.id); // 101
console.log(userByName.username); // "alice"

// These should still be TypeScript errors:
// console.log(userById.username);  // id-based result has no username
// console.log(userByName.id);      // name-based result has no id
```

---

## Part 2. Data Modeling & Abstractions

### Challenge 3: Modeling the Unknown

**The Problem:**
You received a raw, nested payload from a backend API. Dumping everything into a single massive interface is hard to maintain, and some fields behave differently — missing entirely vs. explicitly set to empty.

```typescript
const rawUserData = {
  id: "e3b0c442",
  username: "intern_01",
  email: "intern@example.com",
  isActive: true,
  personalInfo: {
    firstName: "Ivan",
    lastName: "Ivanov",
    age: 22,
    phone: null, // Can be null or a string — the field is always present
  },
  roles: ["user", "editor"],
  lastLogin: "2023-10-25T12:00:00Z", // NOTE: may be absent for users who have never logged in
};
```

**Your Mission:**

- Design a scalable and strictly typed schema for this data.
- Break the payload into logical, reusable blocks (do not put everything into one giant interface).
- Ensure the `roles` array cannot accept arbitrary strings — only a predefined set of valid role values.

**Verify your solution:**

```typescript
// Both of these should compile without errors:
const activeUser: User = {
  id: "e3b0c442",
  username: "intern_01",
  email: "intern@example.com",
  isActive: true,
  personalInfo: { firstName: "Ivan", lastName: "Ivanov", age: 22, phone: null },
  roles: ["user", "editor"],
  lastLogin: "2023-10-25T12:00:00Z",
};

const newUser: User = {
  id: "abc123",
  username: "new_user",
  email: "new@example.com",
  isActive: false,
  personalInfo: {
    firstName: "Jane",
    lastName: "Doe",
    age: 20,
    phone: "+447700900000",
  },
  roles: ["user"],
  // lastLogin is intentionally absent — valid for a user who has never logged in
};

// These should be TypeScript errors:
// roles: ["user", "superadmin"]  // "superadmin" is not a known role
// phone: undefined               // phone must be string | null, not absent
```

---

### Challenge 4: Eliminating Impossible States

**The Problem:**
The current state implementation allows conflicting scenarios (e.g., a `"loading"` state that also has an `errorMessage`). Worse, checking `status` doesn't help TypeScript understand which other fields are safe to access.

```typescript
type Status = "loading" | "success" | "error";

// This structure needs to be rewritten as a Discriminated Union
interface State {
  status: Status;
  data?: string[];
  errorMessage?: string;
}

function renderUI(state: State) {
  if (state.status === "loading") {
    return "Loading...";
  }
  if (state.status === "success") {
    // TS should understand that `data` definitely exists here, but currently it complains
    return `Data: ${state.data.join(", ")}`;
  }
  if (state.status === "error") {
    // Same problem for `errorMessage`
    return `Error: ${state.errorMessage.toUpperCase()}`;
  }
}
```

**Your Mission:**

- Redesign the `State` architecture so that impossible combinations of fields cannot be expressed or compiled.
- Refactor `renderUI` to take advantage of this new architecture.
- Bonus task: Implement a safeguard that **intentionally breaks compilation** if a developer adds a new `Status` in the future but forgets to handle it inside `renderUI`. Hint: think about what type a variable should be assigned in an unreachable branch.

**Verify your solution:**

```typescript
console.log(renderUI({ status: "loading" }));
// "Loading..."

console.log(renderUI({ status: "success", data: ["item1", "item2"] }));
// "Data: item1, item2"

console.log(renderUI({ status: "error", errorMessage: "not found" }));
// "Error: NOT FOUND"
```

---

### Challenge 5: The Flexible Extractor

**The Problem:**
We need a utility function that extracts a specific column from a dataset. TypeScript should enforce that we only ask for columns that actually exist, and it should automatically infer the correct type of the extracted array.

```typescript
// The function takes an array of objects and a property name to extract from each object.
function pluck(items, key) {
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
```

**Your Mission:**

- Make `pluck` completely type-safe without hardcoding it to the `users` array.
- Ensure that calling `pluck(users, "salary")` throws a compilation error.
- Ensure `names` is automatically inferred as `string[]` and `ages` as `number[]` — no manual annotations.

---

### Challenge 6: The DRY Architecture

**The Problem:**
The database entity, the object used to create a new record, and the object used to update a record all share similar fields. Re-declaring these interfaces manually violates the DRY (Don't Repeat Yourself) principle and creates maintenance overhead.

```typescript
interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  discount: number;
  createdAt: Date;
  updatedAt: Date;
}
```

**Your Mission:**
Derive the following three types **directly** from the base `Product` interface without duplicating any property names manually:

- **`CreatePayload`** — everything from `Product` except auto-generated fields (`id`, `createdAt`, `updatedAt`).
- **`UpdatePayload`** — requires `id` to be present, but every other field should be entirely optional.
- **`ClientPreview`** — a strictly read-only version containing only `id`, `title`, and `price`.

**Verify your solution:**

```typescript
// These should compile without errors:
const create: CreatePayload = {
  title: "Widget",
  description: "A fine widget",
  price: 9.99,
  discount: 0,
};
const update: UpdatePayload = { id: "abc-123", price: 12.99 }; // only updating price — rest is optional
const preview: ClientPreview = { id: "abc-123", title: "Widget", price: 9.99 };

// These should be TypeScript errors:
// const badCreate: CreatePayload = { id: "auto", title: "Widget", description: "...", price: 1, discount: 0 };
//   → id is forbidden in CreatePayload

// const badUpdate: UpdatePayload = { title: "Widget" };
//   → id is required in UpdatePayload

// preview.price = 5;
//   → ClientPreview is read-only
```

---

### Challenge 7: The Amnesic Array

**The Problem:**
Filtering an array of mixed types works flawlessly at runtime. However, TypeScript loses track of the specific type after `.filter()`, causing downstream method calls to fail at compile time.

```typescript
interface Cat {
  type: "cat";
  meow: () => void;
}
interface Dog {
  type: "dog";
  bark: () => void;
}

const animals: (Cat | Dog | undefined | null)[] = [
  { type: "cat", meow: () => console.log("Meow") },
  null,
  { type: "dog", bark: () => console.log("Woof") },
  undefined,
];

// TS thinks the type of `cats` is still (Cat | Dog | undefined | null)[]
const cats = animals.filter((animal) => animal && animal.type === "cat");

cats.forEach((cat) => cat.meow()); // TS Error — it doesn't know these are Cat
```

**Your Mission:**

- Implement a custom utility that teaches TypeScript how to narrow the specific type after `.filter()` runs.
- Resolve the `.meow()` compilation error **without using the `as` keyword**.
- **Bonus:** Create a generic version of this utility that strips `null` and `undefined` from any array of any union type — similar to what `Boolean` does at runtime, but type-safe at compile time.

**Verify your solution:**

```typescript
const cats = animals.filter(isCat); // should be Cat[], not (Cat | Dog | null | undefined)[]
cats.forEach((cat) => cat.meow()); // prints "Meow" — no TypeScript error
console.log(cats.length); // 1

// Bonus verify — stripping nulls from any array:
const defined = animals.filter(isNonNullable); // should be (Cat | Dog)[], not (Cat | Dog | null | undefined)[]
console.log(defined.length); // 2
```

---

## Part 3. The Metaprogramming Track (Advanced)

### Challenge 8: The Deep Freeze

**The Problem:**
TypeScript's standard `Readonly<T>` only protects the top level of an object. Nested configurations can still be accidentally mutated, leading to hard-to-track bugs.

```typescript
interface AppConfig {
  version: string;
  settings: {
    theme: string;
    features: {
      beta: boolean;
    };
  };
}

const config: Readonly<AppConfig> = {
  version: "1.0",
  settings: {
    theme: "light",
    features: { beta: true },
  },
};

config.version = "2.0"; // TS Error — correct!
config.settings.theme = "dark"; // TS allows this — but we need to forbid it!
```

**Your Mission:**

- Design a custom generic type `DeepReadonly<T>` that completely freezes an object's structure.
- The immutability must cascade dynamically through **all** nested objects and arrays, regardless of how deep the structure goes.

**Verify your solution:**

```typescript
// Replace Readonly<AppConfig> with DeepReadonly<AppConfig>, then all of these should be TypeScript errors:
// config.version = "2.0";                  // Error — top level, was already caught
// config.settings.theme = "dark";          // Error — nested level, was previously allowed!
// config.settings.features.beta = false;   // Error — two levels deep, was previously allowed!
```

---

### Challenge 9: The Dynamic Emitter

**The Problem:**
We are building an event subscription manager. We want event names to be strictly derived from the state interface's property names. Hardcoding the event strings means we have to update them manually every time the state changes.

```typescript
interface StoreState {
  theme: string;
  volume: number;
  isMuted: boolean;
}

// Event names should be auto-generated: "themeChanged", "volumeChanged", "isMutedChanged"
function subscribe(event: string, callback: (val: any) => void) {
  // Implementation is irrelevant — focus on typing the signature correctly
}

subscribe("themeChanged", (val) => console.log(val)); // Should work
// subscribe("passwordChanged", (val) => {});         // TS should throw an error!
```

**Your Mission:**

- Dynamically generate a type representing all valid event strings (e.g., `"themeChanged"`, `"volumeChanged"`) strictly from the keys of `StoreState` — no hardcoding.
- **Bonus:** Strongly type the callback payload. If the user subscribes to `"volumeChanged"`, TypeScript must enforce that `val` is `number`. If they subscribe to `"isMutedChanged"`, `val` must be `boolean`.

---

### Challenge 10: The Core Extractor

**The Problem:**
We are using a function that returns a `Promise`. We need a type alias for the resolved inner value, but we don't want to define that interface manually — we want to derive it from the function's return type automatically.

```typescript
function fetchUserProfile() {
  return Promise.resolve({ id: 1, avatarUrl: "https://..." });
}

// We need to extract { id: number; avatarUrl: string } without duplicating it manually.

type ProfileData = ReturnType<typeof fetchUserProfile>;
// ^^^ This gives us Promise<{ id: number; avatarUrl: string }> — not what we want!
```

**Your Mission:**

- Create a custom utility type `Awaited_<T>` (note: `Awaited` is already built-in — implement your own for learning purposes) that unwraps any `Promise<T>` to its resolved inner type `T`.
- Use it to correctly type `ProfileData` as `{ id: number; avatarUrl: string }`.
- **Bonus:** Upgrade the utility to handle deeply nested promises — `Promise<Promise<string>>` should collapse all the way to `string`.

**Verify your solution:**

```typescript
type ProfileData = Awaited_<ReturnType<typeof fetchUserProfile>>;
// Hover over ProfileData — it should show { id: number; avatarUrl: string }, not Promise<...>

// This should compile without errors:
const profile: ProfileData = {
  id: 1,
  avatarUrl: "https://example.com/avatar.png",
};

// Bonus — these type aliases should all resolve to the primitive, not a Promise:
type T1 = Awaited_<Promise<string>>; // string
type T2 = Awaited_<Promise<Promise<number>>>; // number
type T3 = Awaited_<boolean>; // boolean (non-Promise passthrough)
```

---
