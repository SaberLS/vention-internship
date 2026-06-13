import { join } from "node:path";
import { createReadStream } from "node:fs";
import { stdout } from "node:process";

const read = async () =>
  new Promise((resolve, reject) => {
    const toRead = join(import.meta.dirname, "files", "fileToRead.txt");

    const readStream = createReadStream(toRead);

    readStream.once("error", (error) => {
      reject(error);
    });

    readStream.once("end", () => {
      stdout.write("\n");
      resolve();
    });

    readStream.pipe(stdout);
  });

await read();
