import process from "node:process";

const propName = /^--(.+)$/;
const parseArgs = () => {
  const args = process.argv.slice(2);
  const result = {};

  for (let i = 0; i < args.length; i += 2) {
    const key = args[i].slice(2);

    if (key !== undefined) result[key] = args[i + 1];
  }

  process.stdout.write(
    Object.entries(result)
      .map((entry) => entry.join(" is "))
      .join(", ") + "\n",
  );
};

parseArgs();
