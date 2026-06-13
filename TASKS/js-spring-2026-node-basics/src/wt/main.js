import { availableParallelism } from "node:os";
import { join } from "node:path";
import { Worker } from "node:worker_threads";

function* createWorkers(amount) {
  const workerPath = join(import.meta.dirname, "worker.js");

  for (let i = 0; i < amount; i++) yield new Worker(workerPath);
}

const performCalculations = async () => {
  // Write your code here
  const cores = availableParallelism();

  const workers = [...createWorkers(cores)];

  const handleWorker = (worker, n) =>
    new Promise((resolve, reject) => {
      const onMessage = (data) => {
        worker.off("error", onError);
        resolve({
          status: "resolved",
          data,
        });
      };

      const onError = () => {
        worker.off("message", onMessage);
        resolve({
          status: "error",
          data: null,
        });
      };

      worker.once("message", onMessage);
      worker.once("error", onError);

      worker.postMessage({ n });
    });

  const results = await Promise.all(
    workers.map((worker, i) => handleWorker(worker, 10 + i)),
  );

  console.log(results);

  await Promise.all(workers.map((worker) => worker.terminate()));
};

await performCalculations();
