import type { JSDocTags } from "unwritten:compiler/type-definitions/shared.js";
import type { JSDocTags as JSDocTagNames } from "unwritten:compiler:enums/jsdoc.js";

import type {
  ContainerNode,
  LinkNode,
  ListNode,
  ParagraphNode,
  PositionNode,
  SmallNode,
  TitleNode
} from "./nodes.js";


//-- Categories

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

export interface RenderedCategoryForTableOfContents extends ContainerNode {
  content: [TitleNode, ListNode];
}

export interface RenderedCategoryForDocumentation extends ContainerNode {
  content: [TitleNode, ContainerNode];
}


export type RenderableJSDocTags = Pick<JSDocTags, JSDocTagNames.Alpha | JSDocTagNames.Beta | JSDocTagNames.Deprecated | JSDocTagNames.Internal>;


//-- Types

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


//-- Entities

export type RenderedEntitiesForTableOfContents =
  | RenderedFunctionEntityForTableOfContents;


//-- Function

export interface RenderedFunctionEntityForTableOfContents extends ContainerNode {
  content: RenderedSignatureEntityForTableOfContents[];
}

export interface RenderedFunctionEntityForDocumentation extends ContainerNode {
  content: RenderedSignatureEntityForDocumentation[];
}


//-- Signature

export interface RenderedSignatureEntityForTableOfContents extends LinkNode {

}

export interface RenderedSignatureEntityForDocumentation extends ContainerNode {
  content: [
    title: TitleNode,
    position: PositionNode,
    tags: SmallNode,
    parametersAndReturnType: ListNode,
    description: ParagraphNode,
    remarks: ParagraphNode,
    example: ParagraphNode
  ];
}


//-- Parameter

export type RenderedParameterEntityForSignature = string;
export type RenderedParameterEntitiesForSignature = string;
export type RenderedParameterEntityForDocumentation = string;
