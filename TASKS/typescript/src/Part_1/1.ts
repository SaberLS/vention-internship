const parseJson = (json: string): unknown => JSON.parse(json);

function getUserNameFromJSON(jsonString: string): string | null {
  const data = parseJson(jsonString);

  if (
    data !== null &&
    typeof data === "object" &&
    "user" in data &&
    data.user !== null &&
    typeof data.user === "object" &&
    "name" in data.user &&
    typeof data.user.name === "string"
  )
    return data.user.name;

  return null;
}

const correctData = [
  '{"user":{"name":"Alice"}}',
  '{"user":{"name":"Stefan", "age": 12}}',
  '{"user":{"name":"Ryszard"}, "other": ""}',
  '{"user":{"name":""}}',
];

const incorrectData = [
  '{"user":{"age": 25}}',
  '{"user":{"name": 25}}',
  "{}",
  '{"not_user": {"name": "Name"}}',
];

console.log("CORRECT DATA");
for (const data of correctData) console.log(getUserNameFromJSON(data));

console.log("INCORRECT DATA");
for (const data of incorrectData) console.log(getUserNameFromJSON(data));
