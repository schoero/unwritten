
export interface RenderExtension {
  fileExtension: string;
  name: string;
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
  renderUnderlineText: (text: string) => string;
  renderTitle: (title: string, size: number, anchor?: string) => string;
  renderStrikeThroughText: (text: string) => string;
  renderWarning: (text: string) => string;
}

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
  Setters = "setters",
  Namespace = "namespace",
  Namespaces = "namespaces",
  Properties = "properties",
  TypeAliases = "types",
  Variable = "variable",
  Variables = "variables",
  Property = "property",
  TypeAlias = "type",
  Setter = "setter",
  Modules = "modules"
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
export type RenderedEntitiesForDocumentation = RenderedClassForDocumentation | RenderedEnumForDocumentation | RenderedFunctionForDocumentation | RenderedInterfaceForDocumentation | RenderedNamespaceForDocumentation | RenderedObjectLiteralVariable | RenderedTypeAliasForDocumentation | RenderedVariableForDocumentation;


//-- Entity categories

export type RenderedEntityCategoryForTableOfContents = [
  entityCategoryName: string,
  entityCategoryContent: [RenderedEntitiesForTableOfContents[]]
];

export type RenderedEntityCategoryForDocumentation = {
  [categoryName: string]: RenderedEntitiesForDocumentation[];
};


//-- Function

export type RenderedFunctionForTableOfContents = string[];

export type RenderedFunctionForDocumentation = {
  [key in keyof RenderedFunctionImplementationOrOverloadForDocumentation]: RenderedFunctionImplementationOrOverloadForDocumentation[key]
};

export type RenderedFunctionImplementationOrOverloadForDocumentation = {
  [implementationOrOverloadName: string]: [
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
    description: string | undefined,
    constructor: { [constructorTitle: string]: RenderedFunctionForDocumentation; } | undefined,
    properties: { [propertiesTitle: string]: RenderedPropertyForDocumentation[]; } | undefined,
    methods: { [methodsTitle: string]: RenderedFunctionImplementationOrOverloadForDocumentation[]; } | undefined,
    setters: { [settersTitle: string]: RenderedFunctionImplementationOrOverloadForDocumentation[]; } | undefined,
    getters: { [gettersTitle: string]: RenderedFunctionImplementationOrOverloadForDocumentation[]; } | undefined
  ];
};


//-- Property

export type RenderedPropertyForTableOfContents = string;
export type RenderedPropertyForDocumentation = string;


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
    members: [RenderedPropertyForDocumentation[]]
  ];
};


//-- Namespace

export type RenderedNamespaceForTableOfContents = [
  namespaceName: string,
  namespaceContent: RenderedEntityCategoryForTableOfContents[]
];

export type RenderedNamespaceForDocumentation = {
  [namespaceName: string]: RenderedEntityCategoryForDocumentation;
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

export type RenderedObjectLiteralVariable = {
  [variableName: string]: [
    description: string | undefined,
    properties: [RenderedPropertyForDocumentation[]],
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