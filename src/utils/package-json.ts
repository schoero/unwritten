import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import { assert } from "vitest";


const currentDirectoryPath = dirname(fileURLToPath(import.meta.url));
const packageJsonPath = resolve(currentDirectoryPath, "../../package.json");
const packageJson = JSON.parse(readFileSync(packageJsonPath, "utf8"));

const author: string = packageJson.author;
const description: string = packageJson.description;
const homepage: string = packageJson.homepage;
const issues: string = packageJson.bugs.url;
const license: string = packageJson.license;
const name: string = packageJson.name;
const repository: string = packageJson.repository.url;
const version: string = packageJson.version;

assert(typeof author === "string");
assert(typeof description === "string");
assert(typeof homepage === "string");
assert(typeof license === "string");
assert(typeof issues === "string");
assert(typeof name === "string");
assert(typeof repository === "string");
assert(typeof version === "string");

export {
  author,
  description,
  homepage,
  issues,
  license,
  name,
  repository,
  version
};
