import type { Process } from "unwritten:type-definitions/platform";


const process: Process = {
  cwd: () => "/"
};

export const {
  cwd
} = process;

export default process;
