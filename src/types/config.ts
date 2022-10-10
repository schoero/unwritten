import { MarkupRenderConfig } from "../renderer/markup/types/config.js";
import { BuiltInRenderers } from "./renderer.js";

export interface Config {
  /** Compiler configuration. */
  compilerConfig?: CompilerConfig;
  /** Links to external documentation of native types. */
  externalTypes?: ExternalTypes;
  /** Render configuration. */
  renderConfig?: RenderConfig;
}

export interface RenderConfig {
  [BuiltInRenderers.Markdown]: MarkupRenderConfig;
  [BuiltInRenderers.HTML]: MarkupRenderConfig;
  [key: string]: {
    [key: string]: any;
  };
}

export interface ConfigWithSchema extends Config {
  $schema: string;
}

export type Complete<Config> = {
  [key in keyof Config]-?: Config[key];
};


export interface CompilerConfig {

  /** An array of excluded directories. */
  exclude?: string[];

}


export interface ExternalTypes {
  [key: string]: string;
}