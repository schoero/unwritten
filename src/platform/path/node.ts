import { resolve as nodeResolve } from "node:path";

import sharedPath from "unwritten:platform/path/shared.js";

import type { Path } from "unwritten:type-definitions/path.js";


const path: Path = {
  ...sharedPath,
  absolute(path: string): string {
    return this.normalize(nodeResolve(path));
  }
};

export const {
  absolute,
  getDirectory,
  getFileExtension,
  getFileName,
  normalize,
  relative
} = path;

export default path;
