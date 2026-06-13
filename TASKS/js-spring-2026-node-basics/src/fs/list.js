import path from "node:path";
import fsPromises from "node:fs/promises";

const list = async () => {
  const filesDir = path.join(import.meta.dirname, "files");

  try {
    const files = await fsPromises.readdir(filesDir);

    process.stdout.write(files.join("\n"));
  } catch {
    throw new Error("FS operation failed");
  }
};

await list();
