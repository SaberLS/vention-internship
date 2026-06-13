import fsPromises from "node:fs/promises";
import path from "node:path";

const create = async () => {
  const filePath = path.join(import.meta.dirname, "files", "fresh.txt");
  const content = "I am fresh and young";

  try {
    await fsPromises.writeFile(filePath, content, { flag: "wx" });
  } catch {
    throw new Error("FS operation failed");
  }
};

await create();
