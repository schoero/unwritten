import type { BuiltInRenderers } from "../renderer/enums/renderer";

import type { TypeKind } from "unwritten:interpreter/enums/type";
import type { JSONRenderConfig } from "unwritten:renderer:json:type-definitions/config";
import type { HTMLRenderConfig, MarkdownRenderConfig } from "unwritten:renderer:markup/types-definitions/config";

import type { Complete, PartialByKey } from "./utils";


export interface BaseConfig {
  /** Links to external documentation of native types. */
  externalTypes?: ExternalTypes;
  /** Interpreter configuration. */
  interpreterConfig?: InterpreterConfig;
  /** Output dir */
  outputDir?: string;
  /** Render configuration. */
  renderConfig?: RenderConfig;
}

export interface BrowserConfig extends BaseConfig {}

export interface NodeConfig extends BaseConfig {
  /** Extend another config */
  extends?: string;
}

export type Config = BrowserConfig | NodeConfig;

export interface CompleteNodeConfig extends PartialByKey<Required<NodeConfig>, "extends"> {
  renderConfig: CompleteRenderConfig;
}

export interface CompleteBrowserConfig extends Required<BrowserConfig> {
  renderConfig: CompleteRenderConfig;
}

export type CompleteConfig = CompleteBrowserConfig | CompleteNodeConfig;

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

export interface ConfigForSchema extends NodeConfig {
  $schema?: string;
  interpreterConfig?: InterpreterConfig;
  renderConfig?: {
    [BuiltInRenderers.Markdown]?: MarkdownRenderConfig;
    [BuiltInRenderers.HTML]?: HTMLRenderConfig;
    [BuiltInRenderers.JSON]?: JSONRenderConfig;
  } & {
    [key: string]: {
      [key: string]: any;
    };
  };
}

export interface InterpreterConfig {
  /** An array or object of excluded directories. */
  exclude?: string[] | {
    [key: string]: string[] | "*";
  };
}

export type ExternalTypes = {
  [Key in TypeKind | (string & {}) ]?: string;
};
