import { createReadStream, createWriteStream } from "node:fs";
import { createGunzip } from "node:zlib";
import { pipeline } from "node:stream/promises";
import { join } from "node:path";

const decompress = async () => {
  const gunzip = createGunzip();

  const filesDir = join(import.meta.dirname, "files");

  const source = createReadStream(join(filesDir, "archive.gz"));
  const destination = createWriteStream(join(filesDir, "fileToCompress.txt"));

  await pipeline(source, gunzip, destination);
};

await decompress();
