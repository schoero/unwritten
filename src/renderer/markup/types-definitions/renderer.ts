import type { RenderCategories } from "../enums/renderer";

import type { Alpha, Beta, Deprecated, Example, Internal } from "unwritten:interpreter/type-definitions/jsdoc";

import type {
  AnchorNode,
  ASTNode,
  ConditionalNode,
  Empty,
  InlineTitleNode,
  LinkNode,
  ListNode,
  MultilineNode,
  PaddedNode,
  ParagraphNode,
  SectionNode,
  SmallNode,
  TitleNode
} from "./nodes";


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
  | Example
  | Internal;

// Position
export type ConvertedPosition = Empty | PaddedNode<[
  ParagraphNode<[
    SmallNode<[LinkNode] | [string, LinkNode]>
  ]>
]>;

// Tags
export type ConvertedJSDocTags = ASTNode;

export type ConvertedTagsForDocumentation = Empty | ParagraphNode;
export type ConvertedTagsForType = ASTNode;

export type ConvertedJSDocReference = ASTNode | ConditionalNode;

export type ConvertedJSDocType = ASTNode | ConditionalNode;

export type ConvertedJSDocSeeTag = ConvertedJSDocTags | [
  reference: ConvertedJSDocReference,
  content: ConvertedJSDocTags
];

export type ConvertedJSDocThrowsTag = ConvertedJSDocTags | [
  reference: ConvertedJSDocReference,
  content: ConvertedJSDocTags
];

// Description
export type ConvertedDescriptionForDocumentation = Empty | TitleNode<ParagraphNode[]>;
export type ConvertedDescriptionForType = ASTNode;

// Remarks
export type ConvertedRemarksForDocumentation = Empty | TitleNode<ParagraphNode[]>;
export type ConvertedRemarksForType = Empty | InlineTitleNode;

// Throws
export type ConvertedThrowsForDocumentation = Empty | TitleNode<[
  ListNode
]>;
export type ConvertedThrowsForType = Empty | InlineTitleNode<[
  throws: ListNode
]>;

// Example
export type ConvertedExamples = Empty | TitleNode<ParagraphNode[]>;
export type ConvertedExamplesForType = Empty | InlineTitleNode;

// See
export type ConvertedSeeTags = Empty | TitleNode<ListNode[]>;
export type ConvertedSeeTagsForType = Empty | InlineTitleNode;

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
  ParagraphNode,
  ConditionalNode | ConvertedTypeMultiline | Empty
]>;
export type ConvertedReturnTypeForType = Empty | InlineTitleNode<[
  inlineTypeAndDescription: ASTNode,
  multilineType: ASTNode
]>;

// Type reference
export type ConvertedTypeReferenceTypeMultiline = ConditionalNode | ConvertedTypeMultiline;
export type ConvertedTypeReferenceTypeInline = ConditionalNode | ConvertedTypeInline;

// Type reference
export type ConvertedUnresolvedTypeInline = ASTNode;

// Indexed access type
export type ConvertedIndexedAccessTypeInline = ConditionalNode | ConvertedTypeInline;
export type ConvertedIndexedAccessTypeMultiline = ConditionalNode | ConvertedTypeMultiline;

// Type parameter
export type ConvertedTypeParameterTypeInline = ASTNode;

// Array type
export type ConvertedArrayTypeInline = ASTNode;
export type ConvertedArrayTypeMultiline = ListNode<[
  MultilineNode<[
    ConvertedTypeInline,
    ConditionalNode | ConvertedTypeMultiline | Empty
  ]>
]>;

// Tuple type
export type ConvertedTupleTypeInline = ASTNode;
export type ConvertedTupleTypeMultiline = ListNode<MultilineNode<[
  ASTNode,
  ConditionalNode | ConvertedTypeMultiline | Empty
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
    ConditionalNode | ConvertedTypeMultiline | Empty
  ]>,
  valueType: MultilineNode<[
    ASTNode[],
    ConditionalNode | ConvertedTypeMultiline | Empty
  ]>
]>;

// Conditional type
export type ConvertedConditionalTypeInline = ASTNode;
export type ConvertedConditionalTypeMultiline = ListNode<[
  checkType: MultilineNode<[
    ASTNode[],
    ConvertedTypeMultiline | ConvertedTypeReferenceTypeMultiline | Empty
  ]>,
  extendsType: MultilineNode<[
    ASTNode[],
    ConvertedTypeMultiline | ConvertedTypeReferenceTypeMultiline | Empty
  ]>,
  trueType: MultilineNode<[
    ASTNode[],
    ConvertedTypeMultiline | ConvertedTypeReferenceTypeMultiline | Empty
  ]>,
  falseType: MultilineNode<[
    ASTNode[],
    ConvertedTypeMultiline | ConvertedTypeReferenceTypeMultiline | Empty
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
  name: AnchorNode,
  exports: ListNode<ConvertedCategoryForTableOfContents[]>
];
export type ConvertedNamespaceEntityForDocumentation = SectionNode<[
  children: TitleNode<[
    tags: ConvertedTagsForDocumentation,
    position: ConvertedPosition,
    description: ConvertedDescriptionForDocumentation,
    remarks: ConvertedRemarksForDocumentation,
    example: ConvertedExamples,
    see: ConvertedSeeTags,
    ...exports: ConvertedEntitiesForDocumentation[]
  ]>
]>;

// Module
export type ConvertedModuleEntityForTableOfContents = [
  name: AnchorNode,
  exports: ListNode<ConvertedCategoryForTableOfContents[]>
];
export type ConvertedModuleEntityForDocumentation = SectionNode<[
  children: TitleNode<[
    tags: ConvertedTagsForDocumentation,
    position: ConvertedPosition,
    description: ConvertedDescriptionForDocumentation,
    remarks: ConvertedRemarksForDocumentation,
    example: ConvertedExamples,
    see: ConvertedSeeTags,
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
    example: ConvertedExamples,
    see: ConvertedSeeTags
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
    example: ConvertedExamples,
    see: ConvertedSeeTags
  ]>
]>;
export type ConvertedSignatureEntityForType = MultilineNode<[
  renderedSignature: ASTNode,
  typeParameters: ConvertedTypeParameterEntitiesForType,
  parameters: ConvertedParameterEntitiesForType,
  returnType: ConvertedReturnTypeForType,
  throws: ConvertedThrowsForType,
  remarks: ConvertedRemarksForType,
  example: ConvertedExamplesForType,
  see: ConvertedSeeTagsForType
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
    example: ConvertedExamples,
    see: ConvertedSeeTags
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
    see: ConvertedSeeTags,
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
    see: ConvertedSeeTags,
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
    see: ConvertedSeeTags,
    constructor: Empty | TitleNode<ConvertedSignatureEntityForDocumentation[]>,
    properties: Empty | TitleNode<ConvertedPropertyEntityForDocumentation[]>,
    methods: Empty | TitleNode<ConvertedSignatureEntityForDocumentation[]>,
    setters: Empty | TitleNode<ConvertedSignatureEntityForDocumentation[]>,
    getters: Empty | TitleNode<ConvertedSignatureEntityForDocumentation[]>,
    events: Empty | TitleNode<ConvertedEventPropertyEntityForDocumentation[]>
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
    see: ConvertedSeeTags,
    members: ListNode
  ]>
]>;

// Parameter
export type ConvertedParameterEntitiesForSignature = ASTNode[] | Empty;
export type ConvertedParameterEntitiesForDocumentation = Empty | TitleNode<[ListNode]>;
export type ConvertedParameterEntitiesForType = Empty | InlineTitleNode<[ListNode]>;

// Type Parameter
export type ConvertedTypeParameterEntitiesForSignature = ASTNode[];
export type ConvertedTypeParameterEntitiesForDocumentation = Empty | TitleNode<[
  ListNode<ConvertedTypeParameterEntityForDocumentation[]>
]>;
export type ConvertedTypeParameterEntitiesForType = Empty | InlineTitleNode<[
  ListNode
]>;
export type ConvertedTypeParameterEntityForDocumentation = Empty | MultilineNode<[
  typeParameterSignatureWithDescription: ASTNode,
  constraint: Empty | InlineTitleNode,
  initializer: Empty | InlineTitleNode
]>;

// Type Argument
export type ConvertedTypeArgumentEntityForSignature = ASTNode;
export type ConvertedTypeArgumentEntitiesForSignature = ASTNode[];
export type ConvertedTypeArgumentEntityForDocumentation = ASTNode[];

// Property
export type ConvertedPropertyEntityForTableOfContents = AnchorNode;
export type ConvertedPropertyEntityForDocumentation = SectionNode<[
  children: TitleNode<[
    tags: ConvertedTagsForDocumentation,
    position: ConvertedPosition,
    type: ConvertedTypeInline,
    description: ConvertedDescriptionForDocumentation,
    remarks: ConvertedRemarksForDocumentation,
    example: ConvertedExamples,
    see: ConvertedSeeTags
  ]>
]>;
export type ConvertedPropertyEntityForType = MultilineNode<[
  propertySignature: ASTNode,
  remarks: ConvertedRemarksForType,
  example: ConvertedExamplesForType,
  see: ConvertedSeeTagsForType,
  propertyType: ConditionalNode | ConvertedTypeMultiline | Empty
]>;

// Event
export type ConvertedEventPropertyEntityForTableOfContents = AnchorNode;
export type ConvertedEventPropertyEntityForDocumentation = TitleNode<[
  position: ConvertedPosition,
  description: ConvertedDescriptionForDocumentation,
  remarks: ConvertedRemarksForDocumentation,
  example: ConvertedExamples,
  see: ConvertedSeeTags
]>;
export type ConvertedEventPropertyEntityForType = MultilineNode<[
  propertySignature: ASTNode,
  remarks: ConvertedRemarksForType,
  example: ConvertedExamplesForType,
  see: ConvertedSeeTagsForType
]>;
