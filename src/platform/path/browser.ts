import sharedPath from "unwritten:platform/path/shared.js";
import { cwd } from "unwritten:platform/process/browser.js";

import type { Path } from "unwritten:type-definitions/path.js";


const path: Path = {
  ...sharedPath,
  absolute(fromOrTo: string, toOrUndefined?: string): string {
    const from = toOrUndefined ? fromOrTo : cwd();
    const to = toOrUndefined ? toOrUndefined : fromOrTo;
    return sharedPath.absolute(from, to, cwd());
  },
  relative(from: string, to: string): string {
    return sharedPath.relative(from, to, cwd());
  }
};

export const {
  absolute,
  getDirectory,
  getFileExtension,
  getFileName,
  join,
  normalize,
  relative
} = path;

export default path;
