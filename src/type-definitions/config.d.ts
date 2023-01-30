import type { TypeKind } from "unwritten:compiler:enums/types.js";
import type { BuiltInRenderers } from "unwritten:renderer:enums/renderer.js";
import type { MarkupRenderConfig } from "unwritten:renderer:markup/types/config.js";

import type { Complete } from "./utils.js";


export type Config = {
  /** Compiler configuration. */
  compilerConfig?: CompilerConfig;
  /** Extend another config */
  extends?: string;
  /** Links to external documentation of native types. */
  externalTypes?: ExternalTypes;
  /** Render configuration. */
  renderConfig?: RenderConfig;
};

export type CompleteConfig = Config & {
  compilerConfig: Complete<CompilerConfig>;
  externalTypes: ExternalTypes;
  renderConfig: CompleteRenderConfig;
};

export type CompleteRenderConfig = {
  [BuiltInRenderers.Markdown]: Complete<MarkupRenderConfig>;
  [BuiltInRenderers.HTML]: Complete<MarkupRenderConfig>;
  [key: string]: {
    [key: string]: any;
  };
};

export type RenderConfig = {
  [key: string]: {
    [key: string]: any;
  };
};

export type ConfigWithSchema = Config & {
  $schema: string;
};

export type CompilerConfig = {

  /** An array of excluded directories. */
  exclude?: string[];

};

export type ExternalTypes = {
  [key in TypeKind | string]?: string;
};
