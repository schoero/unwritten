import ts from "typescript";

import { Locker } from "quickdoks:compiler:locker/index.js";
import { Logger } from "quickdoks:logger/index.js";

import { CompleteConfig } from "./config.js";
import { Renderer } from "./renderer.js";


export type DefaultContext = {
  logger?: Logger;
};

export type CompilerContext = DefaultContext & {
  checker: ts.TypeChecker;
  config: CompleteConfig;
  locker: Locker;
};

export type RenderContext<CustomRenderer extends Renderer = Renderer> = DefaultContext & {
  config: CompleteConfig;
  renderer: CustomRenderer;
};
