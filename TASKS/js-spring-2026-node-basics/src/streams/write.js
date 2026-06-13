import { join } from "node:path";
import { createWriteStream } from "node:fs";
import { stdin } from "node:process";

const write = async () =>
  new Promise((resolve, reject) => {
    const filePath = join(import.meta.dirname, "files", "fileToWrite.txt");

    const outStream = createWriteStream(filePath);

    stdin.pipe(outStream);

    outStream.once("finish", resolve);
    outStream.once("error", reject);
  });

await write();
