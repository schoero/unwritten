import type { JSDocTags as JSDocTagNames } from "unwritten:interpreter:enums/jsdoc.ts";
import type { JSDocTags } from "unwritten:interpreter:type-definitions/shared.ts";

import type {
  ASTNodes,
  ContainerNode,
  LinkNode,
  ListNode,
  ParagraphNode,
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


export type ConvertedStringType = ASTNodes;
export type ConvertedNumberType = ASTNodes;
export type ConvertedBooleanType = ASTNodes;
export type ConvertedBigIntType = ASTNodes;
export type ConvertedSymbolType = ASTNodes;
export type ConvertedVoidType = ASTNodes;
export type ConvertedUndefinedType = ASTNodes;
export type ConvertedNullType = ASTNodes;
export type ConvertedNeverType = ASTNodes;
export type ConvertedUnknownType = ASTNodes;
export type ConvertedAnyType = ASTNodes;


//-- Literal types

export type ConvertedLiteralTypes =
  | ConvertedBigIntLiteralType
  | ConvertedBooleanLiteralType
  | ConvertedNumberLiteralType
  | ConvertedStringLiteralType;


export type ConvertedStringLiteralType = ASTNodes;
export type ConvertedNumberLiteralType = ASTNodes;
export type ConvertedBooleanLiteralType = ASTNodes;
export type ConvertedBigIntLiteralType = ASTNodes;

export type ConvertedTemplateLiteralType = ASTNodes[];


//-- Function type

export type ConvertedFunctionType = ASTNodes[];


//-- Type reference

export type ConvertedTypeReferenceType = ASTNodes;


//-- Array type

export type ConvertedArrayType = ["(", ConvertedTypes, ")", "[]"] | [ConvertedTypes, "[]"];


//-- Tuple type

export type ConvertedTupleType = ["[", ...ConvertedTupleMember[], "]"];
export type ConvertedTupleMember = ASTNodes[];


//-- Union type

export type ConvertedUnionType = ASTNodes[];


//-- Intersection type

export type ConvertedIntersectionType = ASTNodes[];


//-- Interface type

export type ConvertedInterfaceType = ASTNodes;


//-- Class type

export type ConvertedClassType = ASTNodes;


//-- Entities

export type ConvertedEntitiesForTableOfContents =
  | ConvertedFunctionEntityForTableOfContents
  | ConvertedInterfaceEntityForTableOfContents
  | ConvertedModuleEntityForTableOfContents
  | ConvertedNamespaceEntityForTableOfContents
  | ConvertedTypeAliasEntityForTableOfContents
  | ConvertedVariableEntityForTableOfContents;


export type ConvertedEntitiesForDocumentation =
  | ConvertedFunctionEntityForDocumentation
  | ConvertedInterfaceEntityForDocumentation
  | ConvertedModuleEntityForDocumentation
  | ConvertedNamespaceEntityForDocumentation
  | ConvertedTypeAliasEntityForDocumentation
  | ConvertedVariableEntityForDocumentation;


//-- Namespace

export interface ConvertedNamespaceEntityForTableOfContents extends TitleNode {
  children: ConvertedEntitiesForTableOfContents[];
}

export interface ConvertedNamespaceEntityForDocumentation extends TitleNode {
  children: [
    position: SmallNode,
    tags: ParagraphNode,
    description: ParagraphNode,
    remarks: ParagraphNode,
    example: ParagraphNode,
    exports: ContainerNode
  ];
}


//-- Module

export interface ConvertedModuleEntityForTableOfContents extends TitleNode {
  children: ConvertedEntitiesForTableOfContents[];
}

export interface ConvertedModuleEntityForDocumentation extends TitleNode {
  children: [
    position: SmallNode,
    tags: ParagraphNode,
    description: ParagraphNode,
    remarks: ParagraphNode,
    example: ParagraphNode,
    exports: ContainerNode
  ];
}


//-- Type alias

export interface ConvertedTypeAliasEntityForTableOfContents extends LinkNode {

}

export interface ConvertedTypeAliasEntityForDocumentation extends TitleNode {
  children: [
    position: SmallNode,
    tags: ParagraphNode,
    typeParametersAndType: ListNode,
    description: ParagraphNode,
    remarks: ParagraphNode,
    example: ParagraphNode
  ];
}


//-- Function like

export interface ConvertedFunctionLikeEntityForTableOfContents extends ContainerNode {
  children: ConvertedSignatureEntityForTableOfContents[];
}

export interface ConvertedFunctionLikeEntityForDocumentation extends ContainerNode {
  children: ConvertedSignatureEntityForDocumentation[];
}


//-- Function

export interface ConvertedFunctionEntityForTableOfContents extends ConvertedFunctionLikeEntityForTableOfContents {
}

export interface ConvertedFunctionEntityForDocumentation extends ConvertedFunctionLikeEntityForDocumentation {
}


//-- Signature

export interface ConvertedSignatureEntityForTableOfContents extends LinkNode {

}

export interface ConvertedSignatureEntityForDocumentation extends TitleNode {
  children: [
    position: SmallNode,
    tags: ParagraphNode,
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
    tags: ParagraphNode,
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
    tags: ParagraphNode,
    description: ParagraphNode,
    remarks: ParagraphNode,
    example: ParagraphNode,
    constructSignatures: TitleNode<ConvertedSignatureEntityForDocumentation[]>,
    callSignatures: TitleNode<ConvertedSignatureEntityForDocumentation[]>,
    properties: TitleNode<ConvertedPropertyEntityForDocumentation[]>,
    methods: TitleNode<ConvertedSignatureEntityForDocumentation[]>,
    setters: TitleNode<ConvertedSignatureEntityForDocumentation[]>,
    getters: TitleNode<ConvertedSignatureEntityForDocumentation[]>
  ];
}


//-- Class

export interface ConvertedClassEntityForTableOfContents extends LinkNode {

}

export interface ConvertedClassEntityForDocumentation extends TitleNode {
  children: [
    position: SmallNode,
    tags: ParagraphNode,
    description: ParagraphNode,
    remarks: ParagraphNode,
    example: ParagraphNode,
    constructor: TitleNode<ConvertedSignatureEntityForDocumentation[]>,
    properties: TitleNode<ConvertedPropertyEntityForDocumentation[]>,
    methods: TitleNode<ConvertedMethodEntityForDocumentation[]>,
    setters: TitleNode<ConvertedSetterEntityForDocumentation[]>,
    getters: TitleNode<ConvertedGetterEntityForDocumentation[]>
  ];
}


//-- Enum

export interface ConvertedEnumEntityForTableOfContents extends LinkNode {

}

export interface ConvertedEnumEntityForDocumentation extends TitleNode {
  children: [
    position: SmallNode,
    tags: ParagraphNode,
    description: ParagraphNode,
    remarks: ParagraphNode,
    example: ParagraphNode,
    members: ListNode
  ];
}


//-- Parameter

export type ConvertedParameterEntityForSignature = ASTNodes[];
export type ConvertedParameterEntitiesForSignature = ASTNodes[];
export type ConvertedParameterEntityForDocumentation = ASTNodes[];


//-- Type Parameter

export type ConvertedTypeParameterEntityForSignature = ASTNodes;
export type ConvertedTypeParameterEntitiesForSignature = ASTNodes[];
export type ConvertedTypeParameterEntityForDocumentation = ASTNodes[];


//-- Type Argument

export type ConvertedTypeArgumentEntityForSignature = ASTNodes;
export type ConvertedTypeArgumentEntitiesForSignature = ASTNodes[];
export type ConvertedTypeArgumentEntityForDocumentation = ASTNodes[];


//-- Property

export interface ConvertedPropertyEntityForTableOfContents extends LinkNode {

}

export interface ConvertedPropertyEntityForDocumentation extends TitleNode {
  children: [
    position: SmallNode,
    tags: ParagraphNode,
    type: ParagraphNode,
    description: ParagraphNode,
    remarks: ParagraphNode,
    example: ParagraphNode
  ];
}


//-- Method

export interface ConvertedMethodEntityForTableOfContents extends ConvertedFunctionLikeEntityForTableOfContents {

}

export interface ConvertedMethodEntityForDocumentation extends ConvertedFunctionLikeEntityForDocumentation {

}


//-- Setter

export interface ConvertedSetterEntityForTableOfContents extends ConvertedFunctionLikeEntityForTableOfContents {

}

export interface ConvertedSetterEntityForDocumentation extends ConvertedFunctionLikeEntityForDocumentation {

}


//-- Getter

export interface ConvertedGetterEntityForTableOfContents extends ConvertedFunctionLikeEntityForTableOfContents {

}

export interface ConvertedGetterEntityForDocumentation extends ConvertedFunctionLikeEntityForDocumentation {

}
