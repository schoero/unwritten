import type { TypeChecker } from "typescript";

import type { Logger } from "unwritten:logger/index.js";

import type { CompleteConfig } from "./config.js";
import type { Renderer } from "./renderer.js";


export interface DefaultContext {
  logger?: typeof Logger;
}

export interface CompilerContext extends DefaultContext {
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
