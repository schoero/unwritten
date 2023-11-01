import type { ExportableEntityKinds } from "unwritten:interpreter/type-definitions/entities";


export interface MarkupRenderConfig {

  /** Indentation characters */
  indentation?: string;

  /** Defines how inline titles should be encapsulated in the rendered output. */
  inlineTitleEncapsulation?: Encapsulation | false;

  /** Newline character */
  newLine?: "\n" | "\r\n" | "os";

  /** Defines how parameters should be encapsulated in the rendered output. */
  parameterEncapsulation?: Encapsulation | false;

  /** Defines how properties should be encapsulated in the rendered output. */
  propertyEncapsulation?: Encapsulation | false;

  /** Defines the order in which entities should be rendered. */
  renderOrder?: ExportableEntityKinds[];

  /**
   * Defines whether the parent name of members should be rendered in the signature.
   * @example
   * Class.method() instead of method()
   */
  renderParentNames?: boolean | "documentation" | "tableOfContents";

  /** Defines whether the renderer should render private members. */
  renderPrivateMembers?: boolean;

  /** Defines whether the renderer should render links to the source code. */
  renderSourceCodeLinks?: boolean;

  /** Defines how string literal type annotations should be encapsulated in the rendered output. */
  stringLiteralEncapsulation?: Encapsulation | false;

  /** Defines how tags like `@beta` or `@deprecated` should be encapsulated in the rendered output. */
  tagEncapsulation?: Encapsulation | false;

  /** Translations for otherwise hardcoded labels */
  translations?: {
    keyType: string;
    valueType: string;
    abstract?: string;
    beta?: string;
    callSignature_many?: string;
    callSignature_one?: string;
    checkType?: string;
    class_many?: string;
    class_one?: string;
    constraint_many?: string;
    constraint_one?: string;
    constructSignature_many?: string;
    constructSignature_one?: string;
    ctor_many?: string;
    ctor_one?: string;
    default?: string;
    definedIn?: string;
    deprecated?: string;
    description_many?: string;
    description_one?: string;
    enum_many?: string;
    enum_one?: string;
    event_many?: string;
    event_one?: string;
    example_many?: string;
    example_one?: string;
    exportAssignment_many?: string;
    exportAssignment_one?: string;
    extendsType?: string;
    falseType?: string;
    function_many?: string;
    function_one?: string;
    getter_many?: string;
    getter_one?: string;
    interface_many?: string;
    interface_one?: string;
    internal?: string;
    intersection?: string;
    mappedType?: string;
    method_many?: string;
    method_one?: string;
    module_many?: string;
    module_one?: string;
    namespace_many?: string;
    namespace_one?: string;
    object_many?: string;
    object_one?: string;
    optional?: string;
    parameter_many?: string;
    parameter_one?: string;
    property_many?: string;
    property_one?: string;
    readonly?: string;
    remark_many?: string;
    remark_one?: string;
    required?: string;
    rest?: string;
    returnType?: string;
    see?: string;
    setter_many?: string;
    setter_one?: string;
    static?: string;
    throws?: string;
    trueType?: string;
    type_many?: string;
    type_one?: string;
    typeAlias_many?: string;
    typeAlias_one?: string;
    typeLiteral?: string;
    typeParameter_many?: string;
    typeParameter_one?: string;
    union?: string;
    variable_many?: string;
    variable_one?: string;
  };

  /** Defines how type annotations should be encapsulated in the rendered output. */
  typeEncapsulation?: Encapsulation | false;

  /** Defines how type parameters should be encapsulated in the rendered output.*/
  typeParameterEncapsulation?: Encapsulation | false;
}

export interface MarkdownRenderConfig extends MarkupRenderConfig {
  /** Defines which HTML tags are allowed in the rendered output. Will be used in the future to render anchor nodes */
  allowedHTMLTags?: string[] | false;

  /** Defines the string that should be used to separate sections in the rendered output. */
  sectionSeparator?: string | false;
}

export interface HTMLRenderConfig extends MarkupRenderConfig {
  /** Renders the table of contents in an aside element and the documentation in a main element. */
  sidebar?: boolean;
}

export type Encapsulation = [prefix: string, suffix: string];
