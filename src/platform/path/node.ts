import { isAbsolute, sep } from "node:path";

import { homeDirectory } from "unwritten:platform/os/node";
import sharedPath from "unwritten:platform/path/shared";
import { cwd } from "unwritten:platform/process/node";

import type { Path } from "unwritten:type-definitions/platform";


const deps = { cwd, homeDirectory, isAbsolute, separator: sep };

const path: Path = {
  absolute(fromOrTo: string, toOrUndefined?: string): string {
    const from = toOrUndefined ? fromOrTo : cwd();
    const to = toOrUndefined ? toOrUndefined : fromOrTo;
    return sharedPath.absolute(deps, from, to);
  },
  getDirectory(path: string) {
    return sharedPath.getDirectory(deps, path);
  },
  getFileExtension(path: string) {
    return sharedPath.getFileExtension(deps, path);
  },
  getFileName(path: string, includeExtension?: boolean) {
    return sharedPath.getFileName(deps, path, includeExtension);
  },
  join(...segments: string[]) {
    return sharedPath.join(deps, ...segments);
  },
  normalize(path: string) {
    return sharedPath.normalize(deps, path);
  },
  relative(from: string, to: string): string {
    return sharedPath.relative(deps, from, to);
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
