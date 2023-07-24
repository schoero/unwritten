import {
  existsSync as virtualExistsSync,
  mkdirSync as virtualMkdirSync,
  readdirSync as virtualReaddirSync,
  readFileSync as virtualReadFileSync,
  rmSync as virtualRmSync,
  writeFileSync as virtualWriteFileSync
} from "unwritten:platform/file-system/virtual-fs.js";

import type { FileSystem } from "unwritten:types:file-system.js";


const fileSystem: FileSystem = {
  existsSync: virtualExistsSync,
  mkdirSync: virtualMkdirSync,
  readFileSync: (path: string) => virtualReadFileSync(path, "utf-8"),
  readdirSync: virtualReaddirSync,
  rmSync: virtualRmSync,
  writeFileSync: virtualWriteFileSync
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
