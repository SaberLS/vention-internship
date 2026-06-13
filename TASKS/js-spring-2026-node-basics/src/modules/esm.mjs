import { release, version } from "node:os";
import path from "node:path";
import { createServer as createServerHttp } from "node:http";

import "./files/c.cjs";

const random = Math.random();

const unknownObject = (
  await (random > 0.5
    ? import("./files/a.json", { with: { type: "json" } })
    : import("./files/b.json", { with: { type: "json" } }))
).default;

console.log(`Release ${release()}`);
console.log(`Version ${version()}`);
console.log(`Path segment separator is "${path.sep}"`);

console.log(`Path to current file is ${import.meta.filename}`);
console.log(`Path to current directory is ${import.meta.dirname}`);

const myServer = createServerHttp((_, res) => {
  res.end("Request accepted");
});

const PORT = 3000;

console.log(unknownObject);

myServer.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
  console.log("To terminate it, use Ctrl+C combination");
});

export { unknownObject, myServer };
