import process from "node:process";

const regex = /^TEST_/;

const parseEnv = () => {
  const output = [];

  for (const [key, value] of Object.entries(process.env))
    if (regex.test(key)) output.push(`${key}=${value}`);

  process.stdout.write(output.join("; ") + "\n");
};

parseEnv();
