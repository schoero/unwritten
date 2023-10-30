import {
  existsSync as nodeExistsSync,
  mkdirSync as nodeMkdirSync,
  readdirSync as nodeReaddirSync,
  readFileSync as nodeReadFileSync,
  rmSync as nodeRmSync,
  writeFileSync as nodeWriteFileSync
} from "node:fs";

import type { FileSystem } from "unwritten:types:file-system";


const fileSystem: FileSystem = {
  existsSync: nodeExistsSync,
  mkdirSync: nodeMkdirSync,
  readFileSync: (path: string) => nodeReadFileSync(path, "utf-8"),
  readdirSync: (path: string, options) => nodeReaddirSync(path, { encoding: "utf-8", ...options }),
  rmSync: nodeRmSync,
  writeFileSync: nodeWriteFileSync
};

export const {
  existsSync,
  mkdirSync,
  readFileSync,
  readdirSync,
  rmSync,
  writeFileSync
} = fileSystem;

export default fileSystem;
