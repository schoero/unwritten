
export interface RenderExtension {
  name: string;
  fileExtension: string;
  renderAnchorLink: (text: string, anchor: string) => string;
  renderSourceCodeLink: (text: string, file: string, line: number, column: number) => string;
  renderHyperLink: (text: string, url: string) => string;
  renderNewLine: () => string;
  renderLineBreak: () => string;
  renderParagraph: (text: string) => string;
  renderList: (items: string[]) => string;
  renderListStart: () => string | void | undefined;
  renderListEnd: () => string | void | undefined;
  renderListItem: (item: string) => string;
  renderTitle: (title: string, size: number, anchor?: string) => string;
  renderHorizontalRule: () => string;
  renderStrikeThroughText: (text: string) => string;
  renderBoldText: (text: string) => string;
  renderItalicText: (text: string) => string;
  renderUnderlineText: (text: string) => string;
  renderCode: (code: string, language?: string) => string;
  renderSmallText: (text: string) => string;
  renderWarning: (text: string) => string;
}

export enum RenderCategories {
  Function = "function",
  Functions = "functions",
  Class = "class",
  Classes = "classes",
  Constructor = "constructor",
  Constructors = "constructors",
  Property = "property",
  Properties = "properties",
  Method = "method",
  Methods = "methods",
  Setter = "setter",
  Setters = "setters",
  Getter = "getter",
  Getters = "getters",
  Interface = "interface",
  Interfaces = "interfaces",
  Enum = "enum",
  Enums = "enums",
  TypeAlias = "type",
  TypeAliases = "types",
  Variable = "variable",
  Variables = "variables",
  Namespace = "namespace",
  Namespaces = "namespaces",
  Module = "module",
  Modules = "modules",
}

export type CategoryNames = {
  [key in RenderCategories]: string;
};


//-- Renderer Object

export type RenderObject = string |
  RenderedMultilineContent |
  RenderedTitle |
  RenderedList;

export type RenderedTitle = {
  [title: string]: RenderObject;
};

export type RenderedMultilineContent = (string | undefined | RenderedTitle | RenderedList | RenderObject)[];

export type RenderedList = [RenderObject[] | RenderedMultilineContent];



//-- Rendered entities

export type RenderedEntitiesForTableOfContents = RenderedFunctionForTableOfContents | RenderedClassForTableOfContents | RenderedInterfaceForTableOfContents | RenderedEnumForTableOfContents | RenderedNamespaceForTableOfContents | RenderedVariableForTableOfContents | RenderedTypeAliasForTableOfContents;
export type RenderedEntitiesForDocumentation = RenderedFunctionForDocumentation | RenderedClassForDocumentation | RenderedInterfaceForDocumentation | RenderedEnumForDocumentation | RenderedNamespaceForDocumentation | RenderedVariableForDocumentation | RenderedObjectLiteralVariable | RenderedTypeAliasForDocumentation;


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
    type: string | undefined,
  ];
};