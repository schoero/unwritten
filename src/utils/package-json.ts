import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const currentDirectoryPath = dirname(fileURLToPath(import.meta.url));
const packageJsonPath = resolve(currentDirectoryPath, "../../package.json");
const packageJson = JSON.parse(readFileSync(packageJsonPath, "utf8"));

export const name = packageJson.name;
export const version = packageJson.version;
export const issues = packageJson.bugs.url;
export const homepage = packageJson.homepage;
export const license = packageJson.license;
export const author = packageJson.author;
export const description = packageJson.description;
export const repository = packageJson.repository;
export const keywords = packageJson.keywords;
