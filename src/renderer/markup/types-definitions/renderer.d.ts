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

export type ConvertedCategoryForTableOfContents = ContainerNode<[
  children: [TitleNode, ListNode]
]>;

export type ConvertedCategoryForDocumentation = ContainerNode<[
  children: [TitleNode, ContainerNode]
]>;


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

export type ConvertedFunctionType = ContainerNode<[
  description: ASTNodes,
  parametersAndReturnType: ListNode
]>;


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

export type ConvertedInterfaceType = ConvertedObjectType;


//-- Object type

export type ConvertedObjectType = ListNode<[
  constructSignatures: ConvertedSignatureEntityForDocumentation[],
  callSignatures: ConvertedSignatureEntityForDocumentation[],
  properties: ConvertedPropertyEntityForDocumentation[],
  methods: ConvertedFunctionLikeEntityForDocumentation[],
  setters: ConvertedFunctionLikeEntityForDocumentation[],
  getters: ConvertedFunctionLikeEntityForDocumentation[]
]>;


//-- Object literal type

export type ConvertedObjectLiteralType = [
  properties: TitleNode<ConvertedPropertyEntityForDocumentation[]>,
  methods: TitleNode<ConvertedFunctionLikeEntityForDocumentation[]>,
  setters: TitleNode<ConvertedFunctionLikeEntityForDocumentation[]>,
  getters: TitleNode<ConvertedFunctionLikeEntityForDocumentation[]>
];


//-- Type literal type

export type ConvertedTypeLiteralType = ConvertedObjectType;


//-- Mapped type

export type ConvertedMappedType = TitleNode<[
  ListNode
]>;


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
  | ConvertedClassEntityForDocumentation
  | ConvertedEnumEntityForDocumentation
  | ConvertedFunctionEntityForDocumentation
  | ConvertedInterfaceEntityForDocumentation
  | ConvertedModuleEntityForDocumentation
  | ConvertedNamespaceEntityForDocumentation
  | ConvertedTypeAliasEntityForDocumentation
  | ConvertedVariableEntityForDocumentation;


//-- Namespace

export type ConvertedNamespaceEntityForTableOfContents = TitleNode<[
  children: ConvertedEntitiesForTableOfContents[]
]>;

export type ConvertedNamespaceEntityForDocumentation = TitleNode<[
  position: SmallNode,
  tags: ParagraphNode,
  description: ParagraphNode,
  remarks: ParagraphNode,
  example: ParagraphNode,
  exports: ContainerNode
]>;


//-- Module

export type ConvertedModuleEntityForTableOfContents = TitleNode<[
  children: ConvertedEntitiesForTableOfContents[]
]>;

export type ConvertedModuleEntityForDocumentation = TitleNode<[
  position: SmallNode,
  tags: ParagraphNode,
  description: ParagraphNode,
  remarks: ParagraphNode,
  example: ParagraphNode,
  exports: ContainerNode
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

export type ConvertedFunctionLikeEntityForTableOfContents = ContainerNode<[
  signatures: ConvertedSignatureEntityForTableOfContents[]
]>;

export type ConvertedFunctionLikeEntityForDocumentation = ContainerNode<[
  signatures: ConvertedSignatureEntityForDocumentation[]
]>;


//-- Function

export type ConvertedFunctionEntityForTableOfContents = ConvertedFunctionLikeEntityForTableOfContents;
export type ConvertedFunctionEntityForDocumentation = ConvertedFunctionLikeEntityForDocumentation;


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

export type ConvertedSignatureEntityForType = ContainerNode<[
  signature: ASTNodes,
  parameters: ListNode,
  returnType: ASTNodes
]>;


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
  position: SmallNode,
  tags: ParagraphNode,
  type: ParagraphNode,
  description: ParagraphNode,
  remarks: ParagraphNode,
  example: ParagraphNode
]>;


//-- Method

export type ConvertedMethodEntityForTableOfContents = ConvertedFunctionLikeEntityForTableOfContents;
export type ConvertedMethodEntityForDocumentation = ConvertedFunctionLikeEntityForDocumentation;


//-- Setter

export type ConvertedSetterEntityForTableOfContents = ConvertedFunctionLikeEntityForTableOfContents;
export type ConvertedSetterEntityForDocumentation = ConvertedFunctionLikeEntityForDocumentation;


//-- Getter

export type ConvertedGetterEntityForTableOfContents = ConvertedFunctionLikeEntityForTableOfContents;
export type ConvertedGetterEntityForDocumentation = ConvertedFunctionLikeEntityForDocumentation;
