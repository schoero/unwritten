import type { ExportableEntityKinds } from "unwritten:interpreter:type-definitions/entities.js";


export interface MarkupRenderConfig {

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
   * Defines whether the renderer should render private members.
   */
  renderPrivateMembers?: boolean;

  /**
   * Defines whether the undefined type should be rendered in optional types.
   */
  renderUndefinedInOptionalTypes?: boolean;

  /**
   * Defines the string that should be used to separate sections in the rendered output.
   */
  sectionSeparator?: string | false;

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
    "call-signature_one"?: string;
    "call-signature_other"?: string;
    class_one?: string;
    class_other?: string;
    "construct-signature_one"?: string;
    "construct-signature_other"?: string;
    constructor_one?: string;
    constructor_other?: string;
    default?: string;
    "defined-in"?: string;
    deprecated?: string;
    description_one?: string;
    description_other?: string;
    enum_one?: string;
    enum_other?: string;
    example_one?: string;
    example_other?: string;
    "export-assignment_one"?: string;
    "export-assignment_other"?: string;
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
    object_one?: string;
    object_other?: string;
    optional?: string;
    parameter_one?: string;
    parameter_other?: string;
    property_one?: string;
    property_other?: string;
    readonly?: string;
    remarks_one?: string;
    remarks_other?: string;
    required?: string;
    rest?: string;
    "return-type"?: string;
    setter_one?: string;
    setter_other?: string;
    static?: string;
    type_one?: string;
    type_other?: string;
    "type-alias_one"?: string;
    "type-alias_other"?: string;
    "type-parameter_one"?: string;
    "type-parameter_other"?: string;
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
  /** Renders the table of contents in an aside element and the documentation in a main element. */
  sidebar?: boolean;
}

export type Encapsulation = [prefix: string, suffix: string];
