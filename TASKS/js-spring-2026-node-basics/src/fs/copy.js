import fs from "node:fs/promises";
import path from "node:path";

const copy = async () => {
  try {
    const filesPath = path.join(import.meta.dirname, "files");
    const targetPath = path.join(import.meta.dirname, "files_copy");

    await fs.cp(filesPath, targetPath, {
      force: false,
      recursive: true,
      errorOnExist: true,
    });
  } catch {
    throw new Error("FS operation failed");
  }
};

await copy();
