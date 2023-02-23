import type { ExportableEntityKinds } from "unwritten:compiler:type-definitions/entities.js";

import type { CategoryNames } from "./renderer.js";


export interface MarkupRenderConfig {

  /**
    * Defines the title of the categories for the rendered entities.
    */
  categoryNames?: CategoryNames;

  /** Indentation characters */
  indentation?: string;

  /** Newline character */
  newLine?: "\n" | "\r\n" | "os";

  /**
   * Defines how parameters should be encapsulated in the rendered output.
   */
  parameterEncapsulation?: Encapsulation | false;

  /**
   * Defines how properties should be encapsulated in the rendered output.
   */
  propertyEncapsulation?: Encapsulation | false;

  /**
   * As per {@link https://tsdoc.org/pages/tags/param/ | specification}, parameters should be separated by a hyphen from the description.
   * You can remove this hyphen from the output by setting this option to `false`.
   */
  removeHyphenAtStartOfTag?: boolean;

  /**
    * Defines the order in which entities should be rendered.
    */
  renderOrder?: ExportableEntityKinds[];

  /**
   * Defines how string literal type annotations should be encapsulated in the rendered output.
   */
  stringLiteralEncapsulation?: Encapsulation | false;

  /**
   * Defines how tags like `@beta` or `@deprecated` should be encapsulated in the rendered output.
   */
  tagEncapsulation?: Encapsulation | false;

  /** Translations for otherwise hardcoded labels */
  translations?: {
    abstract?: string;
    beta?: string;
    class_one?: string;
    class_other?: string;
    constructor_one?: string;
    constructor_other?: string;
    default?: string;
    deprecated?: string;
    function_one?: string;
    function_other?: string;
    getter_one?: string;
    getter_other?: string;
    interface?: string;
    interface_other?: string;
    internal?: string;
    method_one?: string;
    method_other?: string;
    module_one?: string;
    module_other?: string;
    namespace_one?: string;
    namespace_other?: string;
    optional?: string;
    property_one?: string;
    property_other?: string;
    readonly?: string;
    required?: string;
    rest?: string;
    returns?: string;
    setter_one?: string;
    setter_other?: string;
    static?: string;
    type?: string;
    type_other?: string;
    variable_one?: string;
    variable_other?: string;
  };

  /**
   * Defines how type annotations should be encapsulated in the rendered output.
   */
  typeEncapsulation?: Encapsulation | false;

  /**
   * Defines how type parameters should be encapsulated in the rendered output.
   */
  typeParameterEncapsulation?: Encapsulation | false;
}

export interface MarkdownRenderConfig extends MarkupRenderConfig {
  /** Defines which HTML tags are allowed in the rendered output. */
  allowedHTMLTags?: string[] | false;
}

export interface HTMLRenderConfig extends MarkupRenderConfig {

}

export type Encapsulation = [prefix: string, suffix: string];
