import type { TypeKind } from "unwritten:interpreter:enums/types.ts";
import type { BuiltInRenderers } from "unwritten:renderer:enums/renderer.js";
import type { JSONRenderConfig } from "unwritten:renderer:json/type-definitions/config.js";
import type { HTMLRenderConfig, MarkdownRenderConfig } from "unwritten:renderer:markup/types-definitions/config.js";

import type { Complete } from "./utils.js";


export interface Config {
  /** Extend another config */
  extends?: string;
  /** Links to external documentation of native types. */
  externalTypes?: ExternalTypes;
  /** Interpreter configuration. */
  interpreterConfig?: InterpreterConfig;
  /** Render configuration. */
  renderConfig?: RenderConfig;
}

export interface CompleteConfig extends Config {
  externalTypes: ExternalTypes;
  interpreterConfig: Complete<InterpreterConfig>;
  renderConfig: CompleteRenderConfig;
}

export interface CompleteRenderConfig {
  [BuiltInRenderers.Markdown]: Complete<MarkdownRenderConfig>;
  [BuiltInRenderers.HTML]: Complete<HTMLRenderConfig>;
  [BuiltInRenderers.JSON]: Complete<JSONRenderConfig>;
  [key: string]: {
    [key: string]: any;
  };
}

export interface RenderConfig {
  [key: string]: {
    [key: string]: any;
  };
}

export interface ConfigWithSchema extends Config {
  $schema: string;
}

export interface InterpreterConfig {
  /** An array of excluded directories. */
  exclude?: string[];
}

export type ExternalTypes = {
  [key in TypeKind | string]?: string;
};
