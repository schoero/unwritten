import { sep } from "node:path";
import { cwd as nodeCWD, env as nodeENV } from "node:process";

import type { Process } from "unwritten:type-definitions/platform";


const process: Process = {
  cwd: () => {
    const currentWorkingDirectory = nodeCWD();
    return currentWorkingDirectory.endsWith(sep)
      ? currentWorkingDirectory
      : `${currentWorkingDirectory}${sep}`;
  },
  env: {
    DEBUG: nodeENV.DEBUG
  }
};

export const {
  cwd,
  env
} = process;

export default process;
