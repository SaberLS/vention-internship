import path from "node:path";
import fsPromises from "node:fs/promises";

const remove = async () => {
  const toRemove = path.join(import.meta.dirname, "files", "fileToRemove.txt");

  try {
    await fsPromises.unlink(toRemove);
  } catch {
    throw new Error("FS operation failed");
  }
};

await remove();
