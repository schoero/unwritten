import type { RenderCategories } from "../enums/renderer.js";

import type { Alpha, Beta, Deprecated, Examples, Internal } from "unwritten:interpreter/type-definitions/shared.js";

import type {
  AnchorNode,
  ASTNode,
  ConditionalNode,
  InlineTitleNode,
  LinkNode,
  ListNode,
  MultilineNode,
  PaddedNode,
  ParagraphNode,
  SectionNode,
  SmallNode,
  TitleNode
} from "./nodes.js";


export type CategoryNames = {
  [Key in RenderCategories]: string;
};

export type ConvertedCategoryForTableOfContents = [
  title: string,
  content: ListNode
];
export type ConvertedCategoryForDocumentation = TitleNode<ConvertedEntitiesForDocumentation[]>;


export type RenderableJSDocTags =
  | Alpha
  | Beta
  | Deprecated
  | Examples
  | Internal;


// Position
export type ConvertedPosition = PaddedNode<[
  SmallNode<[LinkNode] | [string, LinkNode]>
]> | "";

// Tags
export type ConvertedTagsForDocumentation = ParagraphNode | "";
export type ConvertedTagsForType = ASTNode;

// Description
export type ConvertedDescriptionForDocumentation = TitleNode<ParagraphNode[]> | "";
export type ConvertedDescriptionForType = ASTNode;

// Remarks
export type ConvertedRemarksForDocumentation = TitleNode<ParagraphNode[]> | "";
export type ConvertedRemarksForType = InlineTitleNode | "";

// Throws
export type ConvertedThrowsForDocumentation = TitleNode<[
  ListNode
]> | "";
export type ConvertedThrowsForType = InlineTitleNode<[
  throws: ListNode
]> | "";

// Example
export type ConvertedExamples = TitleNode<ParagraphNode[]> | "";
export type ConvertedExamplesForType = InlineTitleNode | "";

// Types
export interface ConvertedType {
  inline: ConvertedTypeInline;
  multiline?: ConvertedTypeMultiline;
}

export type ConvertedTypeInline =
  | ConvertedArrayTypeInline
  | ConvertedClassTypeInline
  | ConvertedConditionalTypeInline
  | ConvertedIntersectionTypeInline
  | ConvertedLiteralTypesInline
  | ConvertedMappedTypeInline
  | ConvertedPrimitiveTypeInline
  | ConvertedTupleTypeInline
  | ConvertedUnionTypeInline;


export type ConvertedTypeMultiline =
  | ConvertedArrayTypeMultiline
  | ConvertedClassTypeMultiline
  | ConvertedConditionalTypeMultiline
  | ConvertedFunctionTypeMultiline
  | ConvertedInterfaceTypeMultiline
  | ConvertedMappedTypeMultiline
  | ConvertedObjectLiteralTypeMultiline
  | ConvertedTupleTypeMultiline
  | ConvertedTypeLiteralTypeMultiline
  | ConvertedUnionTypeMultiline;


// Primitive types
export type ConvertedPrimitiveTypeInline =
  | ConvertedAnyTypeInline
  | ConvertedBigIntTypeInline
  | ConvertedBooleanTypeInline
  | ConvertedNeverTypeInline
  | ConvertedNullTypeInline
  | ConvertedNumberTypeInline
  | ConvertedStringTypeInline
  | ConvertedSymbolTypeInline
  | ConvertedUndefinedTypeInline
  | ConvertedUnknownTypeInline
  | ConvertedVoidTypeInline;


export type ConvertedStringTypeInline = ASTNode;
export type ConvertedNumberTypeInline = ASTNode;
export type ConvertedBooleanTypeInline = ASTNode;
export type ConvertedBigIntTypeInline = ASTNode;
export type ConvertedSymbolTypeInline = ASTNode;
export type ConvertedVoidTypeInline = ASTNode;
export type ConvertedUndefinedTypeInline = ASTNode;
export type ConvertedNullTypeInline = ASTNode;
export type ConvertedNeverTypeInline = ASTNode;
export type ConvertedUnknownTypeInline = ASTNode;
export type ConvertedAnyTypeInline = ASTNode;
export type ConvertedCircularTypeInline = ASTNode;

// Literal types
export type ConvertedLiteralTypesInline =
  | ConvertedBigIntLiteralTypeInline
  | ConvertedBooleanLiteralTypeInline
  | ConvertedNumberLiteralTypeInline
  | ConvertedStringLiteralTypeInline;


export type ConvertedStringLiteralTypeInline = ASTNode;
export type ConvertedNumberLiteralTypeInline = ASTNode;
export type ConvertedBooleanLiteralTypeInline = ASTNode;
export type ConvertedBigIntLiteralTypeInline = ASTNode;

export type ConvertedTemplateLiteralTypeInline = ASTNode[];

// Function type
export type ConvertedFunctionTypeMultiline = ConvertedSignatureEntityForType | ListNode<ConvertedSignatureEntityForType[]>;
export type ConvertedFunctionTypeInline = ASTNode;

// Return type
export type ConvertedReturnTypeForDocumentation = TitleNode<[
  ASTNode
]>;
export type ConvertedReturnTypeForType = InlineTitleNode<[
  inlineTypeAndDescription: ASTNode,
  multilineType: ASTNode
]> | "";

// Type reference
export type ConvertedTypeReferenceTypeMultiline = ConditionalNode | ConvertedTypeMultiline;
export type ConvertedTypeReferenceTypeInline = ConditionalNode | ConvertedTypeInline;

// Type reference
export type ConvertedUnresolvedTypeInline = ASTNode;

// Indexed access type
export type ConvertedIndexedAccessTypeInline = ASTNode;

// Type parameter
export type ConvertedTypeParameterTypeInline = ASTNode;

// Array type
export type ConvertedArrayTypeInline = ASTNode;
export type ConvertedArrayTypeMultiline = ListNode<[
  MultilineNode<[
    ConvertedTypeInline,
    ConditionalNode | ConvertedTypeMultiline | ""
  ]>
]>;

// Tuple type
export type ConvertedTupleTypeInline = ASTNode;
export type ConvertedTupleTypeMultiline = ListNode<MultilineNode<[
  ASTNode,
  ConditionalNode | ConvertedTypeMultiline | ""
]>[]>;

// Union type
export type ConvertedUnionTypeInline = ASTNode;
export type ConvertedUnionTypeMultiline = ListNode<MultilineNode[]>;

// Intersection type
export type ConvertedIntersectionTypeInline = ASTNode;
export type ConvertedIntersectionTypeMultiline = ListNode<MultilineNode[]>;

// Object type
export type ConvertedObjectTypeMultiline = MultilineNode<[
  constructSignatures: ListNode<ConvertedSignatureEntityForType[]>,
  callSignatures: ListNode<ConvertedSignatureEntityForType[]>,
  properties: ListNode<ConvertedPropertyEntityForType[]>,
  methods: ListNode<ConvertedSignatureEntityForType[]>,
  setters: ListNode<ConvertedSignatureEntityForType[]>,
  getters: ListNode<ConvertedSignatureEntityForType[]>,
  events: ListNode<ConvertedEventPropertyEntityForType[]>
]>;
export type ConvertedObjectType = ASTNode;

// Object literal type
export type ConvertedObjectLiteralTypeInline = ConvertedObjectType;
export type ConvertedObjectLiteralTypeMultiline = ConvertedObjectTypeMultiline;

// Type literal type
export type ConvertedTypeLiteralTypeInline = ConvertedObjectType;
export type ConvertedTypeLiteralTypeMultiline = ConvertedObjectTypeMultiline;

// Interface type
export type ConvertedInterfaceTypeInline = ConvertedObjectType;
export type ConvertedInterfaceTypeMultiline = ConvertedObjectTypeMultiline;

// Class type
export type ConvertedClassTypeInline = ConvertedObjectType;
export type ConvertedClassTypeMultiline = ConvertedObjectTypeMultiline;

// Mapped type
export type ConvertedMappedTypeInline = ASTNode;
export type ConvertedMappedTypeMultiline = ListNode<[
  keyType: MultilineNode<[
    ASTNode[],
    ConditionalNode | ConvertedTypeMultiline | ""
  ]>,
  valueType: MultilineNode<[
    ASTNode[],
    ConditionalNode | ConvertedTypeMultiline | ""
  ]>
]>;

// Conditional type
export type ConvertedConditionalTypeInline = ASTNode;
export type ConvertedConditionalTypeMultiline = ListNode<[
  checkType: MultilineNode<[
    ASTNode[],
    ConvertedTypeMultiline | ConvertedTypeReferenceTypeMultiline | ""
  ]>,
  extendsType: MultilineNode<[
    ASTNode[],
    ConvertedTypeMultiline | ConvertedTypeReferenceTypeMultiline | ""
  ]>,
  trueType: MultilineNode<[
    ASTNode[],
    ConvertedTypeMultiline | ConvertedTypeReferenceTypeMultiline | ""
  ]>,
  falseType: MultilineNode<[
    ASTNode[],
    ConvertedTypeMultiline | ConvertedTypeReferenceTypeMultiline | ""
  ]>
]>;

// Entities
export type ConvertedEntitiesForTableOfContents =
  | ConvertedClassEntityForTableOfContents
  | ConvertedEnumEntityForTableOfContents
  | ConvertedExportAssignmentEntityForTableOfContents
  | ConvertedFunctionEntityForTableOfContents
  | ConvertedInterfaceEntityForTableOfContents
  | ConvertedModuleEntityForTableOfContents
  | ConvertedNamespaceEntityForTableOfContents
  | ConvertedTypeAliasEntityForTableOfContents
  | ConvertedVariableEntityForTableOfContents;


export type ConvertedEntitiesForDocumentation =
  | ConvertedClassEntityForDocumentation
  | ConvertedEnumEntityForDocumentation
  | ConvertedExportAssignmentEntityForDocumentation
  | ConvertedFunctionEntityForDocumentation
  | ConvertedInterfaceEntityForDocumentation
  | ConvertedModuleEntityForDocumentation
  | ConvertedNamespaceEntityForDocumentation
  | ConvertedTypeAliasEntityForDocumentation
  | ConvertedVariableEntityForDocumentation;

// Namespace
export type ConvertedNamespaceEntityForTableOfContents = [
  name: ASTNode,
  exports: ListNode<ConvertedCategoryForTableOfContents[]>
];
export type ConvertedNamespaceEntityForDocumentation = SectionNode<[
  children: TitleNode<[
    tags: ConvertedTagsForDocumentation,
    position: ConvertedPosition,
    description: ConvertedDescriptionForDocumentation,
    remarks: ConvertedRemarksForDocumentation,
    example: ConvertedExamples,
    ...exports: ConvertedEntitiesForDocumentation[]
  ]>
]>;

// Module
export type ConvertedModuleEntityForTableOfContents = [
  name: ASTNode,
  exports: ListNode<ConvertedCategoryForTableOfContents[]>
];
export type ConvertedModuleEntityForDocumentation = SectionNode<[
  children: TitleNode<[
    tags: ConvertedTagsForDocumentation,
    position: ConvertedPosition,
    description: ConvertedDescriptionForDocumentation,
    remarks: ConvertedRemarksForDocumentation,
    example: ConvertedExamples,
    ...exports: ConvertedEntitiesForDocumentation[]
  ]>
]>;

// Type alias
export type ConvertedTypeAliasEntityForTableOfContents = AnchorNode;
export type ConvertedTypeAliasEntityForDocumentation = SectionNode<[
  children: TitleNode<[
    tags: ConvertedTagsForDocumentation,
    position: ConvertedPosition,
    typeParameters: ConvertedTypeParameterEntitiesForDocumentation,
    type: ConvertedTypeInline,
    description: ConvertedDescriptionForDocumentation,
    remarks: ConvertedRemarksForDocumentation,
    example: ConvertedExamples
  ]>
]>;

// Function like
export type ConvertedFunctionLikeEntityForTableOfContents = ConvertedSignatureEntityForTableOfContents[];
export type ConvertedFunctionLikeEntityForDocumentation = ConvertedSignatureEntityForDocumentation[];
export type ConvertedFunctionLikeEntityForType = ConvertedSignatureEntityForType[];

// Function
export type ConvertedFunctionEntityForTableOfContents = ConvertedFunctionLikeEntityForTableOfContents;
export type ConvertedFunctionEntityForDocumentation = ConvertedFunctionLikeEntityForDocumentation;
export type ConvertedFunctionEntityForType = ConvertedFunctionLikeEntityForType;

// Signature
export type ConvertedSignatureEntityForTableOfContents = AnchorNode;
export type ConvertedSignatureEntityForDocumentation = SectionNode<[
  children: TitleNode<[
    tags: ConvertedTagsForDocumentation,
    position: ConvertedPosition,
    typeParameters: ConvertedTypeParameterEntitiesForDocumentation,
    parameters: ConvertedParameterEntitiesForDocumentation,
    returnType: ConvertedReturnTypeForDocumentation,
    throws: ConvertedThrowsForDocumentation,
    description: ConvertedDescriptionForDocumentation,
    remarks: ConvertedRemarksForDocumentation,
    example: ConvertedExamples
  ]>
]>;
export type ConvertedSignatureEntityForType = MultilineNode<[
  renderedSignature: ASTNode,
  typeParameters: ConvertedTypeParameterEntitiesForType,
  parameters: ConvertedParameterEntitiesForType,
  returnType: ConvertedReturnTypeForType,
  throws: ConvertedThrowsForType,
  remarks: ConvertedRemarksForType,
  example: ConvertedExamplesForType
]>;

// Variable
export type ConvertedVariableEntityForTableOfContents = AnchorNode;
export type ConvertedVariableEntityForDocumentation = SectionNode<[
  children: TitleNode<[
    tags: ConvertedTagsForDocumentation,
    position: ConvertedPosition,
    type: ConvertedTypeInline,
    description: ConvertedDescriptionForDocumentation,
    remarks: ConvertedRemarksForDocumentation,
    example: ConvertedExamples
  ]>
]>;

// Export assignment
export type ConvertedExportAssignmentEntityForTableOfContents = AnchorNode;
export type ConvertedExportAssignmentEntityForDocumentation = SectionNode<[
  children: TitleNode<[
    tags: ConvertedTagsForDocumentation,
    position: ConvertedPosition,
    description: ConvertedDescriptionForDocumentation,
    remarks: ConvertedRemarksForDocumentation,
    example: ConvertedExamples,
    type: ConvertedTypeInline
  ]>
]>;

// Interface
export type ConvertedInterfaceEntityForTableOfContents = AnchorNode;
export type ConvertedInterfaceEntityForDocumentation = SectionNode<[
  children: TitleNode<[
    tags: ConvertedTagsForDocumentation,
    position: ConvertedPosition,
    typeParameters: ConvertedTypeParameterEntitiesForDocumentation,
    description: ConvertedDescriptionForDocumentation,
    remarks: ConvertedRemarksForDocumentation,
    example: ConvertedExamples,
    constructSignatures: ListNode<ConvertedSignatureEntityForType[]>,
    callSignatures: ListNode<ConvertedSignatureEntityForType[]>,
    properties: ListNode<ConvertedPropertyEntityForType[]>,
    methods: ListNode<ConvertedSignatureEntityForType[]>,
    setters: ListNode<ConvertedSignatureEntityForType[]>,
    getters: ListNode<ConvertedSignatureEntityForType[]>,
    events: ListNode<ConvertedEventPropertyEntityForType[]>
  ]>
]>;

// Class
export type ConvertedClassEntityForTableOfContents = [
  title: ASTNode,
  members: ListNode<
  (
    | ListNode<ConvertedEventPropertyEntityForTableOfContents[]>
    | ListNode<ConvertedPropertyEntityForTableOfContents[]>
    | ListNode<ConvertedSignatureEntityForTableOfContents[]>
    | string
  )[]
  >
];
export type ConvertedClassEntityForDocumentation = SectionNode<[
  children: TitleNode<[
    tags: ConvertedTagsForDocumentation,
    position: ConvertedPosition,
    description: ConvertedDescriptionForDocumentation,
    remarks: ConvertedRemarksForDocumentation,
    example: ConvertedExamples,
    constructor: TitleNode<ConvertedSignatureEntityForDocumentation[]>,
    properties: TitleNode<ConvertedPropertyEntityForDocumentation[]>,
    methods: TitleNode<ConvertedSignatureEntityForDocumentation[]>,
    setters: TitleNode<ConvertedSignatureEntityForDocumentation[]>,
    getters: TitleNode<ConvertedSignatureEntityForDocumentation[]>,
    events: TitleNode<ConvertedEventPropertyEntityForDocumentation[]>
  ]>
]>;

// Enum
export type ConvertedEnumEntityForTableOfContents = AnchorNode;
export type ConvertedEnumEntityForDocumentation = SectionNode<[
  children: TitleNode<[
    tags: ConvertedTagsForDocumentation,
    position: ConvertedPosition,
    description: ConvertedDescriptionForDocumentation,
    remarks: ConvertedRemarksForDocumentation,
    example: ConvertedExamples,
    members: ListNode
  ]>
]>;

// Parameter
export type ConvertedParameterEntitiesForSignature = ASTNode[] | "";
export type ConvertedParameterEntitiesForDocumentation = TitleNode<[ListNode]> | "";
export type ConvertedParameterEntitiesForType = InlineTitleNode<[ListNode]> | "";

// Type Parameter
export type ConvertedTypeParameterEntitiesForSignature = ASTNode[];
export type ConvertedTypeParameterEntitiesForDocumentation = TitleNode<[
  ListNode<ConvertedTypeParameterEntityForDocumentation[]>
]> | "";
export type ConvertedTypeParameterEntitiesForType = InlineTitleNode<[
  ListNode
]> | "";
export type ConvertedTypeParameterEntityForDocumentation = MultilineNode<[
  typeParameterSignatureWithDescription: ASTNode,
  constraint: InlineTitleNode | "",
  initializer: InlineTitleNode | ""
]> | "";

// Type Argument
export type ConvertedTypeArgumentEntityForSignature = ASTNode;
export type ConvertedTypeArgumentEntitiesForSignature = ASTNode[];
export type ConvertedTypeArgumentEntityForDocumentation = ASTNode[];

// Property
export type ConvertedPropertyEntityForTableOfContents = AnchorNode;
export type ConvertedPropertyEntityForDocumentation = TitleNode<[
  tags: ConvertedTagsForDocumentation,
  position: ConvertedPosition,
  type: ConvertedTypeInline,
  description: ConvertedDescriptionForDocumentation,
  remarks: ConvertedRemarksForDocumentation,
  example: ConvertedExamples
]>;
export type ConvertedPropertyEntityForType = MultilineNode<[
  propertySignature: ASTNode,
  remarks: ConvertedRemarksForType,
  example: ConvertedExamplesForType,
  propertyType: ConditionalNode | ConvertedTypeMultiline | ""
]>;

// Event
export type ConvertedEventPropertyEntityForTableOfContents = AnchorNode;
export type ConvertedEventPropertyEntityForDocumentation = TitleNode<[
  position: ConvertedPosition,
  description: ConvertedDescriptionForDocumentation,
  remarks: ConvertedRemarksForDocumentation,
  example: ConvertedExamples
]>;
export type ConvertedEventPropertyEntityForType = MultilineNode<[
  propertySignature: ASTNode,
  remarks: ConvertedRemarksForType,
  example: ConvertedExamplesForType
]>;
