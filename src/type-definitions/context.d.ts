import type { TypeChecker } from "typescript";

import type { Logger } from "unwritten:logger/index.js";

import type { CompleteConfig } from "./config.js";
import type { Renderer } from "./renderer.js";


export type DefaultContext = {
  logger?: typeof Logger;
};

export type CompilerContext = DefaultContext & {
  checker: TypeChecker;
  config: CompleteConfig;
  /**
   * @internal
   */
  locker?: Set<number>;
};

export type RenderContext<CustomRenderer extends Renderer> = DefaultContext & {
  config: CompleteConfig;
  renderer: CustomRenderer;
};
