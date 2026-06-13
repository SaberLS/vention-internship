import path from "node:path";
import fsPromises from "node:fs/promises";

const read = async () => {
  const fileToRead = path.join(import.meta.dirname, "files", "fileToRead.txt");

  try {
    const text = await fsPromises.readFile(fileToRead, "utf-8");

    process.stdout.write(text);
  } catch {
    throw new Error("FS operation failed");
  }
};

await read();
