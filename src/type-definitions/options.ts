import type ts from "typescript";

import type { Renderer } from "unwritten:type-definitions/renderer";

import type { BuiltInRenderers } from "../renderer/enums/renderer";
import type { Config } from "./config";


export interface Options {
  /** Verbose logging. */
  debug?: boolean;
  /** Array of paths that should not be included in the documentation. */
  exclude?: string[];
  /**
   * Output file path
   * Defaults to ./docs based on the current working directory.
   */
  output?: string;
  /** Silence logging. */
  silent?: boolean;
  /** Path to tsconfig.json. */
  tsconfig?: ts.CompilerOptions | string;
}

export interface BrowserAPIOptions extends Options {
  /** Config object. */
  config?: Config;
  /**
   * Whether the output should be rendered as HTML, Markdown, JSON or TypeScript.
   * You can also provide a path to a custom renderer that implements the Renderer interface.
   */
  renderer?: BuiltInRenderers | Renderer;
}

export interface APIOptions extends Options {
  /** Path to .unwritten.json or config object. */
  config?: Config | string;
  /**
   * Whether the output should be rendered as HTML, Markdown, JSON or TypeScript.
   * You can also provide a path to a custom renderer that implements the Renderer interface.
   */
  renderer?: BuiltInRenderers | Renderer | string;
}

export interface CLIOptions extends Options {
  /** Path to .unwritten.json. */
  config?: string;
  /**
   * Whether the output should be rendered as HTML or Markdown.
   */
  renderer?: BuiltInRenderers;
}
