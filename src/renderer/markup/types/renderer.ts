import { Description, Example } from "../../../types/compositions.js";
import { BuiltInRenderers, Renderer } from "../../../types/renderer.js";


export interface MarkupRenderImplementation {
  fileExtension: string;
  name: BuiltInRenderers;
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
  renderSourceCodeLink: (text: string, file: string, line: number, column: number) => string;
  renderStrikeThroughText: (text: string) => string;
  renderTitle: (title: string, size: number, anchor?: string) => string;
  renderUnderlineText: (text: string) => string;
  renderWarning: (text: string) => string;
}

export type MarkupRenderer = MarkupRenderImplementation & Renderer;

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


//-- Renderer Object

export type RenderObject = RenderedList | RenderedMultilineContent | RenderedTitle | string;

export type RenderedTitle = {
  [title: string]: RenderObject;
};

export type RenderedMultilineContent = (RenderedList | RenderedTitle | RenderObject | string | undefined)[];

export type RenderedList = [RenderedMultilineContent | RenderObject[]];



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


//-- Primitive types

export type RenderedPrimitiveType = string;


//-- Literal types

export type RenderedLiteralType = string;

export type RenderedObjectLiteralType = [
  description: string | undefined,
  example: string | undefined,
  properties: [RenderedPropertyForDocumentation[]]
];


//-- Function

export type RenderedFunctionForTableOfContents = string[];

export type RenderedFunctionForDocumentation = {
  [key in keyof RenderedFunctionSignatureForDocumentation]: RenderedFunctionSignatureForDocumentation[key]
};

export type RenderedFunctionSignatureForDocumentation = {
  [signature: string]: [
    parametersAndReturnType: [string[]],
    description: string | undefined,
    example: string | undefined
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
  [className: string]: [
    description: Description | undefined,
    example: Example | undefined,
    constructor: { [constructorTitle: string]: RenderedFunctionForDocumentation; } | undefined,
    properties: { [propertiesTitle: string]: RenderedPropertyForDocumentation[]; } | undefined,
    methods: { [methodsTitle: string]: RenderedFunctionSignatureForDocumentation[]; } | undefined,
    setters: { [settersTitle: string]: RenderedFunctionSignatureForDocumentation[]; } | undefined,
    getters: { [gettersTitle: string]: RenderedFunctionSignatureForDocumentation[]; } | undefined
  ];
};


//-- Property

export type RenderedPropertyForTableOfContents = string;
export type RenderedPropertyForDocumentation = string;


//-- Member

export type RenderedMemberForTableOfContents = string;
export type RenderedMemberForDocumentation = string;


//-- Parameter

export type RenderedParameterForTableOfContents = string;
export type RenderedParameterForDocumentation = string;


//-- Enum

export type RenderedEnumForTableOfContents = string;
export type RenderedEnumForDocumentation = {
  [enumName: string]: [
    description: string | undefined,
    members: [RenderedPropertyForDocumentation[]]
  ];
};


//-- Interface

export type RenderedInterfaceForTableOfContents = string;
export type RenderedInterfaceForDocumentation = {
  [interfaceName: string]: [
    description: string | undefined,
    example: string | undefined,
    members: [RenderedPropertyForDocumentation[]]
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

export type RenderedVariableForTableOfContents = string;
export type RenderedVariableForDocumentation = {
  [variableName: string]: [
    description: string | undefined,
    type: string | undefined,
    example: string | undefined
  ];
};


//-- Type alias

export type RenderedTypeAliasForTableOfContents = string;
export type RenderedTypeAliasForDocumentation = {
  [typeAliasName: string]: [
    description: string | undefined,
    type: string | undefined
  ];
};