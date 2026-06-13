import { write } from "node:fs";
import { stdin, stdout } from "node:process";
import { Transform } from "node:stream";

const transform = async () =>
  new Promise((resolve, reject) => {
    const reverse = new Transform({
      transform(chunk, encoding, callback) {
        callback(null, [...chunk.toString()].reverse().join(""));
      },
    });

    stdin.pipe(reverse).pipe(stdout);

    reverse.once("end", resolve);
    reverse.once("error", reject);
  });

await transform();
