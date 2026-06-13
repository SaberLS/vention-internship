// - `compress.js` - implement function that compresses file `fileToCompress.txt` to `archive.gz` using `zlib` and Streams API

import { createReadStream, createWriteStream } from "node:fs";
import { createGzip } from "node:zlib";
import { pipeline } from "node:stream/promises";
import { join } from "node:path";

const compress = async () => {
  const gzip = createGzip();

  const filesDir = join(import.meta.dirname, "files");

  const source = createReadStream(join(filesDir, "fileToCompress.txt"));
  const destination = createWriteStream(join(filesDir, "archive.gz"));

  await pipeline(source, gzip, destination);
};

await compress();
