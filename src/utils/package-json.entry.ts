import { readFileSync } from "unwritten:platform/file-system/node";
import { absolute, getDirectory } from "unwritten:platform/path/node";
import { assert } from "unwritten:utils:general";


const currentDirectoryPath = getDirectory(import.meta.url);
const packageJsonPath = absolute(currentDirectoryPath, "../../package.json");
const packageJson = JSON.parse(readFileSync(packageJsonPath));

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
