import type { JSDocTags as JSDocTagNames } from "unwritten:interpreter:enums/jsdoc.js";
import type { JSDocTags } from "unwritten:interpreter:type-definitions/shared.js";

import type {
  AnchorNode,
  ASTNodes,
  ListNode,
  ParagraphNode,
  SectionNode,
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

export type ConvertedCategoryForTableOfContents = TitleNode<[ListNode]>;
export type ConvertedCategoryForDocumentation = TitleNode<ConvertedEntitiesForDocumentation[]>;


export type RenderableJSDocTags = Pick<
JSDocTags,
| JSDocTagNames.Alpha
| JSDocTagNames.Beta
| JSDocTagNames.Deprecated
| JSDocTagNames.Internal
>;


//-- Position

export type ConvertedPosition = SmallNode | "";


//-- Tags

export type ConvertedTagsForDocumentation = ParagraphNode | "";
export type ConvertedTagsForType = ASTNodes;


//-- Description

export type ConvertedDescriptionForDocumentation = TitleNode<[
  ParagraphNode
]> | "";
export type ConvertedDescriptionForType = ASTNodes;


//-- Remarks

export type ConvertedRemarks = TitleNode<[
  ParagraphNode
]> | "";


//-- Example

export type ConvertedExample = TitleNode<[
  ParagraphNode
]> | "";


//-- Types

export type ConvertedTypes =
  | ConvertedArrayType
  | ConvertedIntersectionType
  | ConvertedLiteralTypes
  | ConvertedPrimitiveTypes
  | ConvertedTupleType
  | ConvertedUnionType;


//-- Multiline types

export type ConvertedTypesMultiline =
  | ConvertedClassTypeMultiline
  | ConvertedFunctionTypeMultiline
  | ConvertedInterfaceTypeMultiline
  | ConvertedObjectLiteralTypeMultiline
  | ConvertedTypeLiteralTypeMultiline;


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

export type ConvertedFunctionTypeMultiline = ConvertedSignatureEntityForType | ListNode<ConvertedSignatureEntityForType[]>;
export type ConvertedFunctionType = ASTNodes;


//-- Return type

export type ConvertedReturnTypeForDocumentation = TitleNode<[
  ASTNodes
]>;
export type ConvertedReturnTypeForType = ListNode | "";


//-- Type reference

export type ConvertedTypeReferenceType = ASTNodes;


//-- Type reference

export type ConvertedUnresolvedType = ASTNodes;


//-- Indexed access type

export type ConvertedIndexedAccessType = ASTNodes;


//-- Type parameter

export type ConvertedTypeParameterType = ASTNodes;


//-- Array type

export type ConvertedArrayType = ["(", ConvertedTypes, ")", "[]"] | [ConvertedTypes, "[]"];


//-- Tuple type

export type ConvertedTupleType = ["[", ...ConvertedTupleMember[], "]"];
export type ConvertedTupleMember = ASTNodes[];


//-- Union type

export type ConvertedUnionType = ASTNodes[];


//-- Intersection type

export type ConvertedIntersectionType = ASTNodes[];


//-- Object type

export type ConvertedObjectTypeMultiline = ListNode<([
  constructSignatures: ListNode<ConvertedSignatureEntityForType[]>,
  callSignatures: ListNode<ConvertedSignatureEntityForType[]>,
  properties: ListNode<ConvertedPropertyEntityForType[]>,
  methods: ListNode<ConvertedSignatureEntityForType[]>,
  setters: ListNode<ConvertedSignatureEntityForType[]>,
  getters: ListNode<ConvertedSignatureEntityForType[]>
])>;
export type ConvertedObjectType = ASTNodes;


//-- Object literal type

export type ConvertedObjectLiteralType = ConvertedObjectType;
export type ConvertedObjectLiteralTypeMultiline = ConvertedObjectTypeMultiline;


//-- Type literal type

export type ConvertedTypeLiteralType = ConvertedObjectType;
export type ConvertedTypeLiteralTypeMultiline = ConvertedObjectTypeMultiline;


//-- Interface type

export type ConvertedInterfaceType = ConvertedObjectType;
export type ConvertedInterfaceTypeMultiline = ConvertedObjectTypeMultiline;


//-- Class type

export type ConvertedClassType = ConvertedObjectType;
export type ConvertedClassTypeMultiline = ConvertedObjectTypeMultiline;


//-- Mapped type

export type ConvertedMappedType = TitleNode<[
  ListNode
]>;


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
export type ConvertedNamespaceEntityForDocumentation = SectionNode<[
  children: TitleNode<[
    position: ConvertedPosition,
    tags: ConvertedTagsForDocumentation,
    description: ConvertedDescriptionForDocumentation,
    remarks: ConvertedRemarks,
    example: ConvertedExample,
    ...exports: ConvertedEntitiesForDocumentation[]
  ]>
]>;


//-- Module

export type ConvertedModuleEntityForTableOfContents = TitleNode<ConvertedEntitiesForTableOfContents[]>;
export type ConvertedModuleEntityForDocumentation = SectionNode<[
  children: TitleNode<[
    position: ConvertedPosition,
    tags: ConvertedTagsForDocumentation,
    description: ConvertedDescriptionForDocumentation,
    remarks: ConvertedRemarks,
    example: ConvertedExample,
    ...exports: ConvertedEntitiesForDocumentation[]
  ]>
]>;


//-- Type alias

export type ConvertedTypeAliasEntityForTableOfContents = AnchorNode;
export type ConvertedTypeAliasEntityForDocumentation = SectionNode<[
  children: TitleNode<[
    position: ConvertedPosition,
    tags: ConvertedTagsForDocumentation,
    typeParameters: ConvertedTypeParameterEntitiesForDocumentation,
    type: ConvertedTypes,
    description: ConvertedDescriptionForDocumentation,
    remarks: ConvertedRemarks,
    example: ConvertedExample
  ]>
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

export type ConvertedSignatureEntityForTableOfContents = AnchorNode;
export type ConvertedSignatureEntityForDocumentation = SectionNode<[
  children: TitleNode<[
    position: ConvertedPosition,
    tags: ConvertedTagsForDocumentation,
    typeParameters: ConvertedTypeParameterEntitiesForDocumentation,
    parameters: ConvertedParameterEntitiesForDocumentation,
    returnType: ASTNodes,
    description: ConvertedDescriptionForDocumentation,
    remarks: ConvertedRemarks,
    example: ConvertedExample
  ]>
]>;

export type ConvertedSignatureEntityForType = [
  renderedSignature: ASTNodes,
  typeParameters: ConvertedTypeParameterEntitiesForType,
  parameters: ConvertedParameterEntitiesForType,
  returnType: ASTNodes
];


//-- Variable

export type ConvertedVariableEntityForTableOfContents = AnchorNode;
export type ConvertedVariableEntityForDocumentation = SectionNode<[
  children: TitleNode<[
    position: ConvertedPosition,
    tags: ConvertedTagsForDocumentation,
    type: ConvertedTypes,
    description: ConvertedDescriptionForDocumentation,
    remarks: ConvertedRemarks,
    example: ConvertedExample
  ]>
]>;


//-- Interface

export type ConvertedInterfaceEntityForTableOfContents = AnchorNode;
export type ConvertedInterfaceEntityForDocumentation = SectionNode<[
  children: TitleNode<[
    position: ConvertedPosition,
    tags: ConvertedTagsForDocumentation,
    description: ConvertedDescriptionForDocumentation,
    remarks: ConvertedRemarks,
    example: ConvertedExample,
    constructSignatures: TitleNode<ConvertedSignatureEntityForDocumentation[]>,
    callSignatures: TitleNode<ConvertedSignatureEntityForDocumentation[]>,
    properties: TitleNode<ConvertedPropertyEntityForDocumentation[]>,
    methods: TitleNode<ConvertedSignatureEntityForDocumentation[]>,
    setters: TitleNode<ConvertedSignatureEntityForDocumentation[]>,
    getters: TitleNode<ConvertedSignatureEntityForDocumentation[]>
  ]>
]>;


//-- Class

export type ConvertedClassEntityForTableOfContents = AnchorNode;
export type ConvertedClassEntityForDocumentation = SectionNode<[
  children: TitleNode<[
    position: ConvertedPosition,
    tags: ConvertedTagsForDocumentation,
    description: ConvertedDescriptionForDocumentation,
    remarks: ConvertedRemarks,
    example: ConvertedExample,
    constructor: TitleNode<ConvertedSignatureEntityForDocumentation[]>,
    properties: TitleNode<ConvertedPropertyEntityForDocumentation[]>,
    methods: TitleNode<ConvertedMethodEntityForDocumentation[]>,
    setters: TitleNode<ConvertedSetterEntityForDocumentation[]>,
    getters: TitleNode<ConvertedGetterEntityForDocumentation[]>
  ]>
]>;


//-- Enum

export type ConvertedEnumEntityForTableOfContents = AnchorNode;
export type ConvertedEnumEntityForDocumentation = SectionNode<[
  children: TitleNode<[
    position: ConvertedPosition,
    tags: ConvertedTagsForDocumentation,
    description: ConvertedDescriptionForDocumentation,
    remarks: ConvertedRemarks,
    example: ConvertedExample,
    members: ListNode
  ]>
]>;


//-- Parameter

export type ConvertedParameterEntitiesForSignature = ASTNodes[] | "";
export type ConvertedParameterEntitiesForDocumentation = TitleNode<[ListNode]> | "";
export type ConvertedParameterEntitiesForType = ListNode | "";


//-- Type Parameter

export type ConvertedTypeParameterEntitiesForSignature = ASTNodes[];
export type ConvertedTypeParameterEntitiesForDocumentation = TitleNode<[
  ListNode<ConvertedTypeParameterEntityForDocumentation[]>
]> | "";
export type ConvertedTypeParameterEntitiesForType = ListNode | "";
export type ConvertedTypeParameterEntityForDocumentation = ASTNodes[];


//-- Type Argument

export type ConvertedTypeArgumentEntityForSignature = ASTNodes;
export type ConvertedTypeArgumentEntitiesForSignature = ASTNodes[];
export type ConvertedTypeArgumentEntityForDocumentation = ASTNodes[];


//-- Property

export type ConvertedPropertyEntityForTableOfContents = AnchorNode;
export type ConvertedPropertyEntityForDocumentation = TitleNode<[
  tags: ConvertedTagsForDocumentation,
  position: ConvertedPosition,
  type: ConvertedTypes,
  description: ConvertedDescriptionForDocumentation,
  remarks: ConvertedRemarks,
  example: ConvertedExample
]>;
export type ConvertedPropertyEntityForType = [
  propertySignature: ASTNodes[],
  propertyType: ListNode
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
