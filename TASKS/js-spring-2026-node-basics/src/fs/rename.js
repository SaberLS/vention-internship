import fs from "node:fs";
import path from "node:path";

const rename = async () => {
  const filesDir = path.join(import.meta.dirname, "files");

  const toRename = path.join(filesDir, "wrongFilename.txt");
  const correctName = path.join(filesDir, "properFilename.md");

  try {
    if (fs.existsSync(correctName)) throw new Error();

    await fs.promises.rename(toRename, correctName);
  } catch {
    throw new Error("FS operation failed");
  }
};

await rename();
