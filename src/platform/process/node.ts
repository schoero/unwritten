import { sep } from "node:path";
import { cwd as nodeCWD } from "node:process";

import type { Process } from "unwritten:type-definitions/platform";


const process: Process = {
  cwd: () => {
    const currentWorkingDirectory = nodeCWD();
    return currentWorkingDirectory.endsWith(sep)
      ? currentWorkingDirectory
      : `${currentWorkingDirectory}${sep}`;
  }
};

export const {
  cwd
} = process;

export default process;
