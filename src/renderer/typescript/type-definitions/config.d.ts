export interface TypeScriptRenderConfig {

  /** Indentation characters */
  indentation?: string;

  /** Newline character */
  newLine?: "\n" | "\r\n" | "os";

  /** Whether meta information, such as description, example etc. should be rendered */
  renderJSDoc?: boolean;

  /** Whether the type of a parameter should be rendered */
  renderTypesInSignatures?: boolean;
}
