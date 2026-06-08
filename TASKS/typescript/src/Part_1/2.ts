function fetchUser(identifier: string): {
  username: string;
  status: "active";
};
function fetchUser(identifier: number): {
  id: number;
  status: "active";
};

function fetchUser(identifier: string | number) {
  if (typeof identifier === "number")
    return { id: identifier, status: "active" };

  return { username: identifier, status: "active" };
}

const userById = fetchUser(101);
console.log(userById.id); // TypeScript Error

const userByName = fetchUser("Alice");
console.log(userByName.username);

// @ts-expect-error
console.log(userById.username); // id-based result has no username

console.log(userByName.id); // name-based result has no id
