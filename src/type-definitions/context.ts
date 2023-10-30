import type { TypeChecker } from "typescript";
import type ts from "typescript";

import type { FileSystem } from "unwritten:type-definitions/file-system";
import type { Logger } from "unwritten:type-definitions/logger";
import type { OS } from "unwritten:type-definitions/os";
import type { Path } from "unwritten:type-definitions/path";
import type { Process } from "unwritten:type-definitions/process";

import type { CompleteConfig } from "./config";
import type { Renderer } from "./renderer";


export interface DefaultContext {
  dependencies: {
    fs: FileSystem;
    os: OS;
    path: Path;
    process: Process;
    ts: typeof ts;
    logger?: Logger;
  };
}

export interface InterpreterContext extends DefaultContext {
  checker: TypeChecker;
  config: CompleteConfig;
  /**
   * @internal
   */
  symbolLocker?: Set<number>;
  /**
   * @internal
   */
  typeLocker?: Set<number>;
}

export interface RenderContext<CustomRenderer extends Renderer = Renderer> extends DefaultContext {
  config: CompleteConfig;
  renderer: CustomRenderer;
}
