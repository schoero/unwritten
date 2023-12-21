import type { Process } from "unwritten:type-definitions/platform";


const process: Process = {
  cwd: () => "/",
  env: {
    DEBUG: undefined
  }
};

export const {
  cwd,
  env
} = process;

export default process;
