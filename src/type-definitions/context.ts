import type { TypeChecker } from "typescript";
import type ts from "typescript";

import type { FileSystem } from "unwritten:type-definitions/file-system.js";
import type { Logger } from "unwritten:type-definitions/logger.js";
import type { OS } from "unwritten:type-definitions/os.js";
import type { Path } from "unwritten:type-definitions/path.js";
import type { Process } from "unwritten:type-definitions/process.js";

import type { CompleteConfig } from "./config.js";
import type { Renderer } from "./renderer.js";


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
  locker?: Set<number>;
}

export interface RenderContext<CustomRenderer extends Renderer> extends DefaultContext {
  config: CompleteConfig;
  renderer: CustomRenderer;
}
