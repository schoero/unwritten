import {
  existsSync as nodeExistsSync,
  mkdirSync as nodeMkdirSync,
  readdirSync as nodeReaddirSync,
  readFileSync as nodeReadFileSync,
  rmSync as nodeRmSync,
  writeFileSync as nodeWriteFileSync
} from "node:fs";

import type { FileSystem } from "unwritten:type-definitions/platform";


const fileSystem: FileSystem = {
  existsSync: nodeExistsSync,
  mkdirSync: nodeMkdirSync,
  readdirSync: (path: string, options) => nodeReaddirSync(path, { encoding: "utf-8", ...options }),
  readFileSync: (path: string) => nodeReadFileSync(path, "utf-8"),
  rmSync: nodeRmSync,
  writeFileSync: nodeWriteFileSync
};

export const {
  existsSync,
  mkdirSync,
  readdirSync,
  readFileSync,
  rmSync,
  writeFileSync
} = fileSystem;

export default fileSystem;
