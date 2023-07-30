import { cwd as nodeCWD } from "node:process";

import type { Process } from "unwritten:type-definitions/process.js";


const process: Process = {
  cwd: () => {
    const currentWorkingDirectory = nodeCWD();
    return currentWorkingDirectory.endsWith("/")
      ? currentWorkingDirectory
      : `${currentWorkingDirectory}/`;
  }
};

export const {
  cwd
} = process;

export default process;
