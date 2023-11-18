import type { TypeChecker } from "typescript";
import type ts from "typescript";

import type { OS } from "unwritten:type-definitions/platform";

import type { CompleteConfig } from "./config";
import type { FileSystem, Logger, Path, Process } from "./platform";
import type { Renderer } from "./renderer";


export type DefaultContext = DefaultBrowserContext | DefaultNodeContext;

type BaseDependencies = {
  os: OS;
  path: Path;
  process: Process;
  ts: typeof ts;
  logger?: Logger;
};

export interface NodeDependencies extends BaseDependencies {
  fs: FileSystem;
}

export interface BrowserDependencies extends BaseDependencies {}

export interface DefaultBrowserContext {
  dependencies: BrowserDependencies;
}

export interface DefaultNodeContext {
  dependencies: NodeDependencies;
}

interface BaseInterpreterContext {
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

export interface InterpreterBrowserContext extends BaseInterpreterContext, DefaultBrowserContext {
}

export interface InterpreterNodeContext extends BaseInterpreterContext, DefaultNodeContext {
}

export type InterpreterContext = InterpreterBrowserContext | InterpreterNodeContext;


interface BaseRenderContext<CustomRenderer extends Renderer = Renderer> {
  config: CompleteConfig;
  renderer: CustomRenderer;
}

export interface RenderBrowserContext<CustomRenderer extends Renderer> extends
  BaseRenderContext<CustomRenderer>,
  DefaultBrowserContext {}

export interface RenderNodeContext<CustomRenderer extends Renderer> extends
  BaseRenderContext<CustomRenderer>,
  DefaultNodeContext {}

export type RenderContext<CustomRenderer extends Renderer = Renderer> =
  | RenderBrowserContext<CustomRenderer>
  | RenderNodeContext<CustomRenderer>;
