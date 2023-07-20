import sharedPath from "unwritten:platform/path/shared.js";

import type { Path } from "unwritten:type-definitions/path.js";


const path: Path = {
  ...sharedPath,
  absolute(from: string, to?: string): string {
    return to ? this.normalize(to) : this.normalize(from);
  }
};

export const {
  absolute: resolve,
  getDirectory,
  getFileExtension,
  getFileName,
  normalize,
  relative
} = path;

export default path;
