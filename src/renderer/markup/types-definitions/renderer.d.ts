import type { JSDocTags as JSDocTagNames } from "unwritten:interpreter:enums/jsdoc.ts";
import type { JSDocTags } from "unwritten:interpreter:type-definitions/shared.ts";

import type { ASTNodes, LinkNode, ListNode, ParagraphNode, SmallNode, TitleNode } from "./nodes.js";


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

export type ConvertedCategoryForTableOfContents = TitleNode<[ListNode]>;
export type ConvertedCategoryForDocumentation = TitleNode<ConvertedEntitiesForDocumentation[]>;


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

export type ConvertedFunctionType =
  | ConvertedSignatureEntityForDocumentation
  | ListNode<ConvertedSignatureEntityForDocumentation[]>;


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

export type ConvertedInterfaceType = [
  typeName: ASTNodes,
  members: ListNode<(
    | ConvertedPropertyEntityForType
    | ConvertedSignatureEntityForType
  )[]>
];


//-- Object type

export type ConvertedObjectType = ListNode<(
  | ConvertedPropertyEntityForType
  | ConvertedSignatureEntityForType
)[]>;


//-- Object literal type

export type ConvertedObjectLiteralType = [
  typeName: ASTNodes,
  members: ListNode<(
    | ConvertedPropertyEntityForType
    | ConvertedSignatureEntityForType
  )[]>
];


//-- Type literal type

export type ConvertedTypeLiteralType = [
  typeName: ASTNodes,
  members: ListNode<(
    | ConvertedPropertyEntityForType
    | ConvertedSignatureEntityForType
  )[]>
];


//-- Mapped type

export type ConvertedMappedType = TitleNode<[
  ListNode
]>;


//-- Class type

export type ConvertedClassType = [
  typeName: ASTNodes,
  object: ConvertedObjectType
];


//-- Entities

export type ConvertedEntitiesForTableOfContents =
  | ConvertedClassEntityForTableOfContents
  | ConvertedEnumEntityForTableOfContents
  | ConvertedFunctionEntityForTableOfContents
  | ConvertedInterfaceEntityForTableOfContents
  | ConvertedModuleEntityForTableOfContents
  | ConvertedNamespaceEntityForTableOfContents
  | ConvertedTypeAliasEntityForTableOfContents
  | ConvertedVariableEntityForTableOfContents;


export type ConvertedEntitiesForDocumentation =
  | ConvertedClassEntityForDocumentation
  | ConvertedEnumEntityForDocumentation
  | ConvertedFunctionEntityForDocumentation
  | ConvertedInterfaceEntityForDocumentation
  | ConvertedModuleEntityForDocumentation
  | ConvertedNamespaceEntityForDocumentation
  | ConvertedTypeAliasEntityForDocumentation
  | ConvertedVariableEntityForDocumentation;


//-- Namespace

export type ConvertedNamespaceEntityForTableOfContents = TitleNode<ConvertedEntitiesForTableOfContents[]>;
export type ConvertedNamespaceEntityForDocumentation = TitleNode<[
  position: SmallNode,
  tags: ParagraphNode,
  description: ParagraphNode,
  remarks: ParagraphNode,
  example: ParagraphNode,
  ...exports: ConvertedEntitiesForDocumentation[]
]>;


//-- Module

export type ConvertedModuleEntityForTableOfContents = TitleNode<ConvertedEntitiesForTableOfContents[]>;
export type ConvertedModuleEntityForDocumentation = TitleNode<[
  position: SmallNode,
  tags: ParagraphNode,
  description: ParagraphNode,
  remarks: ParagraphNode,
  example: ParagraphNode,
  ...exports: ConvertedEntitiesForDocumentation[]
]>;


//-- Type alias

export type ConvertedTypeAliasEntityForTableOfContents = LinkNode;
export type ConvertedTypeAliasEntityForDocumentation = TitleNode<[
  position: SmallNode,
  tags: ParagraphNode,
  typeParametersAndType: ListNode,
  description: ParagraphNode,
  remarks: ParagraphNode,
  example: ParagraphNode
]>;


//-- Function like

export type ConvertedFunctionLikeEntityForTableOfContents = ConvertedSignatureEntityForTableOfContents[];
export type ConvertedFunctionLikeEntityForDocumentation = ConvertedSignatureEntityForDocumentation[];
export type ConvertedFunctionLikeEntityForType = ConvertedSignatureEntityForType[];


//-- Function

export type ConvertedFunctionEntityForTableOfContents = ConvertedFunctionLikeEntityForTableOfContents;
export type ConvertedFunctionEntityForDocumentation = ConvertedFunctionLikeEntityForDocumentation;
export type ConvertedFunctionEntityForType = ConvertedFunctionLikeEntityForType;


//-- Signature

export type ConvertedSignatureEntityForTableOfContents = LinkNode;

export type ConvertedSignatureEntityForDocumentation = TitleNode<[
  position: SmallNode,
  tags: ParagraphNode,
  parametersAndReturnType: ListNode,
  description: ParagraphNode,
  remarks: ParagraphNode,
  example: ParagraphNode
]>;

export type ConvertedSignatureEntityForType = [
  renderedSignature: ASTNodes,
  position: SmallNode,
  tags: ParagraphNode,
  parametersAndReturnType: ListNode,
  description: ParagraphNode,
  remarks: ParagraphNode,
  example: ParagraphNode
];


//-- Variable

export type ConvertedVariableEntityForTableOfContents = LinkNode;
export type ConvertedVariableEntityForDocumentation = TitleNode<[
  position: SmallNode,
  tags: ParagraphNode,
  type: ParagraphNode,
  description: ParagraphNode,
  remarks: ParagraphNode,
  example: ParagraphNode
]>;


//-- Interface

export type ConvertedInterfaceEntityForTableOfContents = LinkNode;
export type ConvertedInterfaceEntityForDocumentation = TitleNode<[
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
]>;


//-- Class

export type ConvertedClassEntityForTableOfContents = LinkNode;
export type ConvertedClassEntityForDocumentation = TitleNode<[
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
]>;


//-- Enum

export type ConvertedEnumEntityForTableOfContents = LinkNode;
export type ConvertedEnumEntityForDocumentation = TitleNode<[
  position: SmallNode,
  tags: ParagraphNode,
  description: ParagraphNode,
  remarks: ParagraphNode,
  example: ParagraphNode,
  members: ListNode
]>;


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

export type ConvertedPropertyEntityForTableOfContents = LinkNode;
export type ConvertedPropertyEntityForDocumentation = TitleNode<[
  tags: ParagraphNode,
  type: ParagraphNode,
  description: ParagraphNode,
  remarks: ParagraphNode,
  example: ParagraphNode
]>;
export type ConvertedPropertyEntityForType = [
  name: ASTNodes,
  tags: ParagraphNode,
  type: ParagraphNode,
  description: ParagraphNode,
  remarks: ParagraphNode,
  example: ParagraphNode
];


//-- Method

export type ConvertedMethodEntityForTableOfContents = ConvertedFunctionLikeEntityForTableOfContents;
export type ConvertedMethodEntityForDocumentation = ConvertedFunctionLikeEntityForDocumentation;


//-- Setter

export type ConvertedSetterEntityForTableOfContents = ConvertedFunctionLikeEntityForTableOfContents;
export type ConvertedSetterEntityForDocumentation = ConvertedFunctionLikeEntityForDocumentation;


//-- Getter

export type ConvertedGetterEntityForTableOfContents = ConvertedFunctionLikeEntityForTableOfContents;
export type ConvertedGetterEntityForDocumentation = ConvertedFunctionLikeEntityForDocumentation;
