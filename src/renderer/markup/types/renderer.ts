import type { AnchorIdentifier, LinkRegistry } from "../utils/linker.js";

import type { ExportableEntities } from "unwritten:compiler/type-definitions/entities.js";
import type { Description, Example, JSDocTags, Remarks } from "unwritten:compiler/type-definitions/shared.js";
import type { JSDocTags as JSDocTagNames } from "unwritten:compiler:enums/jsdoc.js";
import type { BuiltInRenderers } from "unwritten:renderer:enums/renderer.js";
import type { RenderContext } from "unwritten:type-definitions/context.js";
import type { Renderer } from "unwritten:type-definitions/renderer.js";


export type MarkupRenderContext = HTMLRenderContext | MarkdownRenderContext;
export type MarkupRenderer = HTMLRenderer | MarkdownRenderer;


//-- Markdown renderer

export type MarkdownRenderContext = RenderContext<MarkdownRenderer>;
export type MarkdownRenderer = Renderer & {
  fileExtension: "md";
  name: BuiltInRenderers.Markdown;
  render: <CustomRenderer extends Renderer>(ctx: RenderContext<CustomRenderer>, entities: ExportableEntities[]) => string;
  renderAnchorLink: (text: string, anchor: string) => RenderedLink;
  renderBoldText: (text: string) => string;
  renderCode: (code: string, language?: string) => string;
  renderHorizontalRule: () => string;
  renderHyperLink: (text: string, url: string) => string;
  renderItalicText: (text: string) => string;
  renderLineBreak: () => string;
  renderList: (items: string[]) => string;
  renderListEnd: () => string | undefined | void;
  renderListItem: (item: string) => string;
  renderListStart: () => string | undefined | void;
  renderNewLine: () => string;
  renderParagraph: (text: string) => string;
  renderSmallText: (text: string) => string;
  renderSourceCodeLink: (file: string, line: number, column: number) => string;
  renderStrikeThroughText: (text: string) => string;
  renderTitle: (title: string, size: number, anchor?: string) => string;
  renderUnderlineText: (text: string) => string;
  renderWarning: (text: string) => string;
  _linkRegistry?: LinkRegistry;
};


//-- HTML renderer

export type HTMLRenderContext = RenderContext<HTMLRenderer>;
export type HTMLRenderer = Renderer & {
  fileExtension: "html";
  name: BuiltInRenderers.HTML;
  render: <CustomRenderer extends Renderer>(ctx: RenderContext<CustomRenderer>, entities: ExportableEntities[]) => string;
  renderAnchorLink: (text: string, anchor: string) => string;
  renderBoldText: (text: string) => string;
  renderCode: (code: string, language?: string) => string;
  renderHorizontalRule: () => string;
  renderHyperLink: (text: string, url: string) => string;
  renderItalicText: (text: string) => string;
  renderLineBreak: () => string;
  renderList: (items: string[]) => string;
  renderListEnd: () => string | undefined | void;
  renderListItem: (item: string) => string;
  renderListStart: () => string | undefined | void;
  renderNewLine: () => string;
  renderParagraph: (text: string) => string;
  renderSmallText: (text: string) => string;
  renderSourceCodeLink: (file: string, line: number, column: number) => string;
  renderStrikeThroughText: (text: string) => string;
  renderTitle: (title: string, size: number, anchor?: string) => string;
  renderUnderlineText: (text: string) => string;
  renderWarning: (text: string) => string;
  _linkRegistry?: LinkRegistry;
};


export enum RenderCategories {
  Class = "class",
  Classes = "classes",
  Constructor = "constructor",
  Constructors = "constructors",
  Enum = "enum",
  Enums = "enums",
  Function = "function",
  Functions = "functions",
  Getter = "getter",
  Getters = "getters",
  Interface = "interface",
  Interfaces = "interfaces",
  Method = "method",
  Methods = "methods",
  Module = "module",
  Modules = "modules",
  Namespace = "namespace",
  Namespaces = "namespaces",
  Properties = "properties",
  Property = "property",
  Setter = "setter",
  Setters = "setters",
  TypeAlias = "type",
  TypeAliases = "types",
  Variable = "variable",
  Variables = "variables"
}

export type CategoryNames = {
  [key in RenderCategories]: string;
};

export type RenderableJSDocTags = Pick<JSDocTags, JSDocTagNames.Alpha | JSDocTagNames.Beta | JSDocTagNames.Deprecated | JSDocTagNames.Internal>;

export type RenderedName = string;
export type RenderedDescription = string | undefined;
export type RenderedExample = string | undefined;
export type RenderedRemarks = string | undefined;
export type RenderedJSDocTags = string | undefined;
export type RenderedPosition = string | undefined;


//-- Renderer Object

export type RenderObject = RenderedList | RenderedMultilineContent | RenderedTitle | SingleLineContent;

export type RenderedTitle = {
  [title: AnchorIdentifier | string]: RenderObject;
};

export type SingleLineContent = string;
export type RenderedParagraph = [SingleLineContent];
export type RenderedMultilineContent = (RenderedList | RenderedTitle | RenderObject | SingleLineContent | undefined)[];

export type RenderedList = [RenderedMultilineContent | RenderObject[]];

export type RenderedLink = string;


//-- Rendered entities

export type RenderedEntitiesForTableOfContents = RenderedClassForTableOfContents | RenderedEnumForTableOfContents | RenderedFunctionForTableOfContents | RenderedInterfaceForTableOfContents | RenderedNamespaceForTableOfContents | RenderedTypeAliasForTableOfContents | RenderedVariableForTableOfContents;
export type RenderedEntitiesForDocumentation = RenderedClassForDocumentation | RenderedEnumForDocumentation | RenderedFunctionForDocumentation | RenderedInterfaceForDocumentation | RenderedNamespaceForDocumentation | RenderedTypeAliasForDocumentation | RenderedVariableForDocumentation;


//-- Categories

export type RenderedCategoryForTableOfContents = [
  categoryName: string,
  categoryContent: [RenderedEntitiesForTableOfContents[]]
];

export type RenderedCategoryForDocumentation = {
  [categoryName: string]: RenderedEntitiesForDocumentation[];
};


//-- Types

export type RenderedTypes =
  | RenderedAnyType
  | RenderedArrayType
  | RenderedBigIntLiteralType
  | RenderedBigIntType
  | RenderedBooleanLiteralType
  | RenderedBooleanType
  | RenderedNeverType
  | RenderedNullType
  | RenderedNumberLiteralType
  | RenderedNumberType
  | RenderedStringLiteralType
  | RenderedStringType
  | RenderedSymbolType
  | RenderedTupleType
  | RenderedUndefinedType
  | RenderedUnionType
  | RenderedUnknownType
  | RenderedVoidType;


//-- Primitive types

export type RenderedStringType = string;
export type RenderedNumberType = string;
export type RenderedBooleanType = string;
export type RenderedBigIntType = string;
export type RenderedSymbolType = string;
export type RenderedVoidType = string;
export type RenderedUndefinedType = string;
export type RenderedNullType = string;
export type RenderedNeverType = string;
export type RenderedUnknownType = string;
export type RenderedAnyType = string;

/** @deprecated Use actual types instead */
export type RenderedPrimitiveType = string;


//-- Literal types

export type RenderedStringLiteralType = string;
export type RenderedNumberLiteralType = string;
export type RenderedBooleanLiteralType = string;
export type RenderedBigIntLiteralType = string;


//-- Array type

export type RenderedArrayType = string;


//-- Tuple type

export type RenderedTupleType = string;


//-- Union type

export type RenderedUnionType = string;


//-- Intersection type

export type RenderedIntersectionType = string;


/** @deprecated Use actual types instead */
export type RenderedLiteralType = string;

export type RenderedObjectLiteralType = [
  description: Description,
  example: Example,
  properties: [RenderedPropertyForDocumentation[]]
];


//-- Function

export type RenderedFunctionForTableOfContents = RenderedSignaturesForTableOfContents;
export type RenderedFunctionForDocumentation = RenderedSignaturesForDocumentation;


//-- Signature

export type RenderedSignaturesForTableOfContents = RenderedSignatureForTableOfContents[];
export type RenderedSignaturesForDocumentation = {
  [key in keyof RenderedSignatureForDocumentation]: RenderedSignatureForDocumentation[key]
};

export type RenderedSignatureForTableOfContents = RenderedLink;
export type RenderedSignatureForDocumentation = {
  [signature: AnchorIdentifier]: [
    jsdocTags: RenderedJSDocTags,
    position: RenderedPosition,
    parametersAndReturnType: [
      RenderedParametersForDocumentation
    ],
    description: Description,
    remarks: Remarks,
    example: Example
  ];
};


//-- Class

export type RenderedClassForTableOfContents = [
  className: string,
  members: [
    constructor: [[title: string, content: string[][]]] | undefined,
    properties: [[title: string, content: string[][]]] | undefined,
    methods: [[title: string, content: string[][]]] | undefined,
    setters: [[title: string, content: string[][]]] | undefined,
    getters: [[title: string, content: string[][]]] | undefined
  ]
];

export type RenderedClassForDocumentation = {
  [className: AnchorIdentifier]: [
    description: Description,
    example: Example,
    constructor: { [constructorTitle: string]: RenderedFunctionForDocumentation; } | undefined,
    properties: { [propertiesTitle: string]: RenderedPropertyForDocumentation[]; } | undefined,
    methods: { [methodsTitle: string]: RenderedSignatureForDocumentation[]; } | undefined,
    setters: { [settersTitle: string]: RenderedSignatureForDocumentation[]; } | undefined,
    getters: { [gettersTitle: string]: RenderedSignatureForDocumentation[]; } | undefined
  ];
};


//-- Property

export type RenderedPropertyForTableOfContents = string;
export type RenderedPropertyForDocumentation = string;


//-- Parameter

export type RenderedParametersForTableOfContents = string;
export type RenderedParametersForDocumentation = RenderedMultilineContent;
export type RenderedParametersForSignature = string;

export type RenderedParameterForTableOfContents = string;
export type RenderedParameterForSignature = string;
export type RenderedParameterForDocumentation = string;


//-- Enum

export type RenderedEnumForTableOfContents = RenderedName;
export type RenderedEnumForDocumentation = {
  [enumName: RenderedName]: [
    description: Description,
    members: [RenderedPropertyForDocumentation[]]
  ];
};


//-- Interface

export type RenderedInterfaceForTableOfContents = RenderedName;
export type RenderedInterfaceForDocumentation = {
  [interfaceName: AnchorIdentifier]: [
    jsdocTags: RenderedJSDocTags,
    position: RenderedPosition,
    description: Description,
    example: Example,
    constructSignatures: [RenderedSignaturesForTableOfContents] | undefined,
    callSignatures: [RenderedSignaturesForTableOfContents] | undefined,
    // Implementations
    constructSignatures: RenderedSignaturesForDocumentation | undefined,
    callSignatures: RenderedSignaturesForDocumentation | undefined
  ];
};


//-- Namespace

export type RenderedNamespaceForTableOfContents = [
  namespaceName: string,
  namespaceContent: RenderedCategoryForTableOfContents[]
];

export type RenderedNamespaceForDocumentation = {
  [namespaceName: string]: RenderedCategoryForDocumentation;
};


//-- Variable

export type RenderedVariableForTableOfContents = RenderedName;
export type RenderedVariableForDocumentation = {
  [variableName: RenderedName]: [
    jsdocTags: RenderedJSDocTags,
    position: RenderedPosition,
    type: string | undefined,
    description: Description,
    remarks: Remarks,
    example: Example
  ];
};


//-- Type alias

export type RenderedTypeAliasForTableOfContents = RenderedName;
export type RenderedTypeAliasForDocumentation = {
  [typeAliasName: RenderedName]: [
    jsdocTags: RenderedJSDocTags,
    position: RenderedPosition,
    typeParameters: RenderedTypeParametersForDocumentation,
    type: string | undefined,
    description: Description,
    Remarks: Remarks,
    Example: Example
  ];
};


//-- Parameter

export type RenderedTypeParametersForTableOfContents = string;
export type RenderedTypeParametersForDocumentation = RenderedMultilineContent | undefined;
export type RenderedTypeParametersForSignature = string;

export type RenderedTypeParameterForTableOfContents = string;
export type RenderedTypeParameterForSignature = string;
export type RenderedTypeParameterForDocumentation = string;
