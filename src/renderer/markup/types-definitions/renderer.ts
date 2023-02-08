import type { ExportableEntities } from "unwritten:compiler/type-definitions/entities.js";
import type { JSDocTags } from "unwritten:compiler/type-definitions/shared.js";
import type { JSDocTags as JSDocTagNames } from "unwritten:compiler:enums/jsdoc.js";
import type { BuiltInRenderers } from "unwritten:renderer:enums/renderer.js";
import type { RenderContext } from "unwritten:type-definitions/context.js";
import type { Renderer } from "unwritten:type-definitions/renderer.js";


export type MarkupRenderContext = HTMLRenderContext | MarkdownRenderContext;
export type MarkupRenderer = Renderer & {
  fileExtension: string;
  name: BuiltInRenderers.HTML | BuiltInRenderers.Markdown;
  render: <CustomRenderer extends Renderer>(ctx: RenderContext<CustomRenderer>, entities: ExportableEntities[]) => string;
  renderAnchorLink: (text: string, anchor: string) => string;
  renderAnchorTag: (anchor: string) => string;
  renderBoldText: (text: string) => string;
  renderCode: (code: string, language?: string) => string;
  renderHorizontalRule: () => string;
  renderHyperLink: (text: string, url: string) => string;
  renderItalicText: (text: string) => string;
  renderLineBreak: () => string;
  renderList: (items: string[]) => string;
  renderListEnd: () => string;
  renderListItem: (item: string) => string;
  renderListStart: () => string;
  renderNewLine: () => string;
  renderParagraph: (text: string) => string;
  renderSmallText: (text: string) => string;
  renderSourceCodeLink: (file: string, line: number, column: number) => string;
  renderStrikeThroughText: (text: string) => string;
  renderTitle: (title: string, size: number, anchor?: string) => string;
  renderUnderlineText: (text: string) => string;
  renderWarning: (text: string) => string;
};


//-- Markdown renderer

export type MarkdownRenderContext = RenderContext<MarkdownRenderer>;
export type MarkdownRenderer = MarkupRenderer & {
};


//-- HTML renderer

export type HTMLRenderContext = RenderContext<HTMLRenderer>;
export type HTMLRenderer = MarkupRenderer & {
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
