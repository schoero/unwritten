import type { Process } from "unwritten:type-definitions/process";


const process: Process = {
  cwd: () => "/"
};

export const {
  cwd
} = process;

export default process;
