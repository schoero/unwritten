export interface TypeScriptRenderConfig {

  /** Indentation characters */
  indentation?: string;

  /** Newline character */
  newLine?: "\n" | "\r\n" | "os";

  /** Quote character */
  quote?: "'" | "\"";

  /** Whether meta information, such as description, example etc. should be rendered */
  renderJSDoc?: boolean;

  /** Whether a semicolon should be rendered at the end of a statement */
  renderSemicolon?: boolean;

  /** Whether the type of a parameter should be rendered */
  renderTypesInSignatures?: boolean;
}
