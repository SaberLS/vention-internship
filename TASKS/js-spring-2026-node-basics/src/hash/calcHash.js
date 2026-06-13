import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import process from "node:process";

const calculateHash = async () =>
  new Promise((resolve, reject) => {
    const toHashPath = path.join(
      import.meta.dirname,
      "files",
      "fileToCalculateHashFor.txt",
    );

    const hash = crypto.createHash("SHA256");
    hash.setEncoding("hex");

    const stream = fs.createReadStream(toHashPath);

    const onError = () => {
      stream.off("finish", onFinish);
      reject(new Error("FS operation failed"));
    };
    const onFinish = () => {
      stream.off("error", onError);
      process.stdout.write(hash.read() + "\n");
      resolve();
    };

    stream.once("error", onError);
    hash.once("finish", onFinish);

    stream.pipe(hash);
  });

await calculateHash();
