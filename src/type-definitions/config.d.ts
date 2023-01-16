import type { TypeKind } from "quickdoks:compiler/enums/types.js";
import type { MarkupRenderConfig } from "quickdoks:renderer:markup/types/config.js";

import type { BuiltInRenderers } from "./renderer.js";
import type { Complete } from "./utils.js";


export interface Config {
  /** Compiler configuration. */
  compilerConfig?: CompilerConfig;
  /** Extend another config */
  extends?: string;
  /** Links to external documentation of native types. */
  externalTypes?: ExternalTypes;
  /** Render configuration. */
  renderConfig?: RenderConfig;
}

export interface CompleteConfig extends Config {
  compilerConfig: Complete<CompilerConfig>;
  externalTypes: ExternalTypes;
  renderConfig: CompleteRenderConfig;
}

export interface CompleteRenderConfig {
  [BuiltInRenderers.Markdown]: Complete<MarkupRenderConfig>;
  [BuiltInRenderers.HTML]: Complete<MarkupRenderConfig>;
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

export interface CompilerConfig {

  /** An array of excluded directories. */
  exclude?: string[];

}

export interface ExternalTypes {
  [key: TypeKind | string]: string;
}
