import type { JSDocTags } from "unwritten:compiler/type-definitions/shared.js";
import type { JSDocTags as JSDocTagNames } from "unwritten:compiler:enums/jsdoc.js";

import type {
  ContainerNode,
  LinkNode,
  ListNode,
  ParagraphNode,
  SmallNode,
  TitleNode,
  WrapperNode
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

export interface ConvertedCategoryForTableOfContents extends ContainerNode {
  children: [TitleNode, ListNode];
}

export interface ConvertedCategoryForDocumentation extends ContainerNode {
  children: [TitleNode, ContainerNode];
}


export type RenderableJSDocTags = Pick<JSDocTags, JSDocTagNames.Alpha | JSDocTagNames.Beta | JSDocTagNames.Deprecated | JSDocTagNames.Internal>;


//-- Types

//-- Types

export type ConvertedTypes =
  | ConvertedArrayType
  | ConvertedIntersectionType
  | ConvertedLiteralTypes
  | ConvertedPrimitiveTypes
  | ConvertedTupleType
  | ConvertedUnionType;


//-- Primitive types

export type ConvertedPrimitiveTypes =
  | ConvertedAnyType
  | ConvertedBigIntType
  | ConvertedBooleanType
  | ConvertedNeverType
  | ConvertedNullType
  | ConvertedNumberType
  | ConvertedStringType
  | ConvertedSymbolType
  | ConvertedUndefinedType
  | ConvertedUnknownType
  | ConvertedVoidType;


export type ConvertedStringType = LinkNode | string;
export type ConvertedNumberType = LinkNode | string;
export type ConvertedBooleanType = LinkNode | string;
export type ConvertedBigIntType = LinkNode | string;
export type ConvertedSymbolType = LinkNode | string;
export type ConvertedVoidType = LinkNode | string;
export type ConvertedUndefinedType = LinkNode | string;
export type ConvertedNullType = LinkNode | string;
export type ConvertedNeverType = LinkNode | string;
export type ConvertedUnknownType = LinkNode | string;
export type ConvertedAnyType = LinkNode | string;


//-- Literal types

export type ConvertedLiteralTypes =
  | ConvertedBigIntLiteralType
  | ConvertedBooleanLiteralType
  | ConvertedNumberLiteralType
  | ConvertedStringLiteralType;

export type ConvertedStringLiteralType = string;
export type ConvertedNumberLiteralType = string;
export type ConvertedBooleanLiteralType = string;
export type ConvertedBigIntLiteralType = string;

export type ConvertedTemplateLiteralType = WrapperNode;


//-- Array type

export type ConvertedArrayType = WrapperNode<["(", ConvertedTypes, ")", "[]"] | [ConvertedTypes, "[]"]>;


//-- Tuple type

export type ConvertedTupleType = WrapperNode<["[", ...ConvertedTupleMember[], "]"]>;
export type ConvertedTupleMember = WrapperNode;


//-- Union type

export type ConvertedUnionType = WrapperNode;


//-- Intersection type

export type ConvertedIntersectionType = WrapperNode;


//-- Entities

export type ConvertedEntitiesForTableOfContents =
  | ConvertedFunctionEntityForTableOfContents;


//-- Function

export interface ConvertedFunctionEntityForTableOfContents extends ContainerNode {
  children: ConvertedSignatureEntityForTableOfContents[];
}

export interface ConvertedFunctionEntityForDocumentation extends ContainerNode {
  children: ConvertedSignatureEntityForDocumentation[];
}


//-- Signature

export interface ConvertedSignatureEntityForTableOfContents extends LinkNode {

}

export interface ConvertedSignatureEntityForDocumentation extends TitleNode {
  children: [
    position: SmallNode,
    tags: SmallNode,
    parametersAndReturnType: ListNode,
    description: ParagraphNode,
    remarks: ParagraphNode,
    example: ParagraphNode
  ];
}


//-- Variable

export interface ConvertedVariableEntityForTableOfContents extends LinkNode {

}

export interface ConvertedVariableEntityForDocumentation extends TitleNode {
  children: [
    position: SmallNode,
    tags: SmallNode,
    type: ParagraphNode,
    description: ParagraphNode,
    remarks: ParagraphNode,
    example: ParagraphNode
  ];
}


//-- Interface

export interface ConvertedInterfaceEntityForTableOfContents extends LinkNode {

}

export interface ConvertedInterfaceEntityForDocumentation extends TitleNode {
  children: [
    position: SmallNode,
    tags: SmallNode,
    properties: ListNode,
    description: ParagraphNode,
    remarks: ParagraphNode,
    example: ParagraphNode
  ];
}


//-- Parameter

export type ConvertedParameterEntityForSignature = WrapperNode;
export type ConvertedParameterEntitiesForSignature = WrapperNode;
export type ConvertedParameterEntityForDocumentation = WrapperNode;
