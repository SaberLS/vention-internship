import { spawn } from "node:child_process";
import process from "node:process";
import path from "node:path";

const spawnChildProcess = async (args) =>
  new Promise((resolve, reject) => {
    const file = path.join(import.meta.dirname, "files", "script.js");
    const child = spawn("node", [file, ...args]);

    const onError = (error) => {
      child.off("close", onClose);
      reject(error);
    };
    const onClose = (data) => {
      child.off("error", onError);
      process.stdin.unpipe(child.stdin);
      resolve(data);
    };

    child.once("error", onError);
    child.once("close", onClose);

    process.stdin.pipe(child.stdin);
    child.stdout.pipe(process.stdout);
  });

// Put your arguments in function call to test this functionality
spawnChildProcess(["test", "CLOSE"]);
