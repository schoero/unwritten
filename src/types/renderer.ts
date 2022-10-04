import { TypeKind } from "./types.js";

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
  renderStrikeThroughText: (text: string) => string;
  renderTitle: (title: string, size: number, anchor?: string) => string;
  renderUnderlineText: (text: string) => string;
  renderWarning: (text: string) => string;
}

export interface RendererAPI {
  renderFunction: (entity: Function) => RenderedFunction;
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


//-- Renderer API

export enum RenderKinds {
  NewLine = "br",
  OrderedList = "ol",
  Title = "title",
  UnorderedList = "ul",
  link = "link",
  tag = "tag",
  text = "text",
  type = "type"
}

export enum RenderTarget {
  documentation = "documentation",
  tableOfContents = "tableOfContents"
}

export type RenderedElements = (RenderedElement<RenderKinds> | RenderedEntity<TypeKind>)[];

export interface RenderedElement<Kind extends RenderKinds> {
  kind: Kind;
}

export interface RenderedTitle<
  Title extends RenderedElements,
  Content extends RenderedElements | undefined = undefined
> extends RenderedElement<RenderKinds.Title> {
  title: Title;
  content?: Content;
}

export interface RenderedOrderedList<
  Content extends RenderedElements
> extends RenderedElement<RenderKinds.OrderedList> {
  content: Content;
}

export interface RenderedUnorderedList<
  Content extends RenderedElements
> extends RenderedElement<RenderKinds.UnorderedList> {
  content: Content;
}

export interface RenderedLink<Content extends RenderedElements> extends RenderedElement<RenderKinds.link> {
  content: Content;
  url: string;
}

export interface RenderedText <Content extends RenderedElements | string> extends RenderedElement<RenderKinds.text> {
  text: Content;
}

export interface RenderedNewLine extends RenderedElement<RenderKinds.NewLine> {}


export interface RenderedType extends RenderedElement<RenderKinds.type> {
  label: string;
}

export interface RenderedTag extends RenderedElement<RenderKinds.tag> {
  label: string;
}


//-- Entities

export interface RenderedEntity<Kind extends TypeKind> {
  kind: Kind;
}


//-- Function

export interface RenderedFunction extends RenderedEntity<TypeKind.Function> {
  [RenderTarget.documentation]: {
    body: [
      RenderedUnorderedList<RenderedParameter[RenderTarget.documentation][]>,
      RenderedText<string>
    ];
    title: RenderedTitle<[
      name: RenderedText<string>,
      ...parameters: RenderedParameter[RenderTarget.tableOfContents][]
    ]>;
  };
  [RenderTarget.tableOfContents]: RenderedLink<[
    RenderedText<string>,
    ...RenderedParameter[RenderTarget.tableOfContents][]
  ]>;
}

export interface RenderedParameter extends RenderedEntity<TypeKind.Parameter> {
  [RenderTarget.documentation]: RenderedText<[
    rest: RenderedText<string>,
    name: RenderedText<string>,
    type: RenderedType,
    description: RenderedText<string>,
    ...modifiers: RenderedTag[]
  ]>;
  [RenderTarget.tableOfContents]: RenderedText<string>;
}