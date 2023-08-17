import type { RenderCategories } from "../enums/renderer.js";

import type { JSDocTags as JSDocTagNames } from "unwritten:interpreter/enums/jsdoc.js";
import type { JSDocTags } from "unwritten:interpreter:type-definitions/shared.js";

import type {
  AnchorNode,
  ASTNode,
  ConditionalNode,
  LinkNode,
  ListNode,
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


export type RenderableJSDocTags = Pick<
JSDocTags,
| JSDocTagNames.Alpha
| JSDocTagNames.Beta
| JSDocTagNames.Deprecated
| JSDocTagNames.Internal
>;

// Position
export type ConvertedPosition = SmallNode<[LinkNode] | [string, LinkNode]> | "";

// Tags
export type ConvertedTagsForDocumentation = ParagraphNode | "";
export type ConvertedTagsForType = ASTNode;

// Description
export type ConvertedDescriptionForDocumentation = TitleNode<[
  ParagraphNode
]> | "";
export type ConvertedDescriptionForType = ASTNode;

// Remarks
export type ConvertedRemarks = TitleNode<[
  ParagraphNode
]> | "";

// Example
export type ConvertedExample = TitleNode<[
  ParagraphNode
]> | "";

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
export type ConvertedReturnTypeInline = ListNode | "";

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
export type ConvertedArrayTypeInline = ["(", ConvertedTypeInline, ")", "[]"] | [ConvertedTypeInline, "[]"];

// Tuple type
export type ConvertedTupleTypeInline = ASTNode;
export type ConvertedTupleTypeMultiline = ListNode<ConvertedTypeInline[][]>;

// Union type
export type ConvertedUnionTypeInline = ASTNode;
export type ConvertedUnionTypeMultiline = ListNode;

// Intersection type
export type ConvertedIntersectionTypeInline = ASTNode;
export type ConvertedIntersectionTypeMultiline = ListNode;

// Object type
export type ConvertedObjectTypeMultiline = [
  constructSignatures: ListNode<ConvertedSignatureEntityForType[]>,
  callSignatures: ListNode<ConvertedSignatureEntityForType[]>,
  properties: ListNode<ConvertedPropertyEntityForType[]>,
  methods: ListNode<ConvertedSignatureEntityForType[]>,
  setters: ListNode<ConvertedSignatureEntityForType[]>,
  getters: ListNode<ConvertedSignatureEntityForType[]>
];
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
  keyType: [
    ASTNode[],
    ConvertedTypeMultiline | ""
  ],
  valueType: [
    ASTNode[],
    ConvertedTypeMultiline | ""
  ]
]>;

// Conditional type
export type ConvertedConditionalTypeInline = ASTNode;
export type ConvertedConditionalTypeMultiline = ListNode<[
  checkType: [
    ASTNode[],
    ConvertedTypeMultiline | ConvertedTypeReferenceTypeMultiline | ""
  ],
  extendsType: [
    ASTNode[],
    ConvertedTypeMultiline | ConvertedTypeReferenceTypeMultiline | ""
  ],
  trueType: [
    ASTNode[],
    ConvertedTypeMultiline | ConvertedTypeReferenceTypeMultiline | ""
  ],
  falseType: [
    ASTNode[],
    ConvertedTypeMultiline | ConvertedTypeReferenceTypeMultiline | ""
  ]
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
    position: ConvertedPosition,
    tags: ConvertedTagsForDocumentation,
    description: ConvertedDescriptionForDocumentation,
    remarks: ConvertedRemarks,
    example: ConvertedExample,
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
    position: ConvertedPosition,
    tags: ConvertedTagsForDocumentation,
    description: ConvertedDescriptionForDocumentation,
    remarks: ConvertedRemarks,
    example: ConvertedExample,
    ...exports: ConvertedEntitiesForDocumentation[]
  ]>
]>;

// Type alias
export type ConvertedTypeAliasEntityForTableOfContents = AnchorNode;
export type ConvertedTypeAliasEntityForDocumentation = SectionNode<[
  children: TitleNode<[
    position: ConvertedPosition,
    tags: ConvertedTagsForDocumentation,
    typeParameters: ConvertedTypeParameterEntitiesForDocumentation,
    type: ConvertedTypeInline,
    description: ConvertedDescriptionForDocumentation,
    remarks: ConvertedRemarks,
    example: ConvertedExample
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
    position: ConvertedPosition,
    tags: ConvertedTagsForDocumentation,
    typeParameters: ConvertedTypeParameterEntitiesForDocumentation,
    parameters: ConvertedParameterEntitiesForDocumentation,
    returnType: ASTNode,
    description: ConvertedDescriptionForDocumentation,
    remarks: ConvertedRemarks,
    example: ConvertedExample
  ]>
]>;

export type ConvertedSignatureEntityForType = [
  renderedSignature: ASTNode,
  typeParameters: ConvertedTypeParameterEntitiesForType,
  parameters: ConvertedParameterEntitiesForType,
  returnType: ASTNode
];

// Variable
export type ConvertedVariableEntityForTableOfContents = AnchorNode;
export type ConvertedVariableEntityForDocumentation = SectionNode<[
  children: TitleNode<[
    position: ConvertedPosition,
    tags: ConvertedTagsForDocumentation,
    type: ConvertedTypeInline,
    description: ConvertedDescriptionForDocumentation,
    remarks: ConvertedRemarks,
    example: ConvertedExample
  ]>
]>;

// Export assignment
export type ConvertedExportAssignmentEntityForTableOfContents = AnchorNode;
export type ConvertedExportAssignmentEntityForDocumentation = SectionNode<[
  children: TitleNode<[
    position: ConvertedPosition,
    tags: ConvertedTagsForDocumentation,
    description: ConvertedDescriptionForDocumentation,
    remarks: ConvertedRemarks,
    example: ConvertedExample,
    type: ConvertedTypeInline
  ]>
]>;

// Interface
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

// Class
export type ConvertedClassEntityForTableOfContents = [
  title: ASTNode,
  constructor: ListNode<ConvertedSignatureEntityForTableOfContents[]>,
  properties: ListNode<ConvertedPropertyEntityForTableOfContents[]>,
  methods: ListNode<ConvertedSignatureEntityForTableOfContents[]>,
  setters: ListNode<ConvertedSignatureEntityForTableOfContents[]>,
  getters: ListNode<ConvertedSignatureEntityForTableOfContents[]>
];
export type ConvertedClassEntityForDocumentation = SectionNode<[
  children: TitleNode<[
    position: ConvertedPosition,
    tags: ConvertedTagsForDocumentation,
    description: ConvertedDescriptionForDocumentation,
    remarks: ConvertedRemarks,
    example: ConvertedExample,
    constructor: TitleNode<ConvertedSignatureEntityForDocumentation[]>,
    properties: TitleNode<ConvertedPropertyEntityForDocumentation[]>,
    methods: TitleNode<ConvertedSignatureEntityForDocumentation[]>,
    setters: TitleNode<ConvertedSignatureEntityForDocumentation[]>,
    getters: TitleNode<ConvertedSignatureEntityForDocumentation[]>
  ]>
]>;

// Enum
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

// Parameter
export type ConvertedParameterEntitiesForSignature = ASTNode[] | "";
export type ConvertedParameterEntitiesForDocumentation = TitleNode<[ListNode]> | "";
export type ConvertedParameterEntitiesForType = ListNode | "";

// Type Parameter
export type ConvertedTypeParameterEntitiesForSignature = ASTNode[];
export type ConvertedTypeParameterEntitiesForDocumentation = TitleNode<[
  ListNode<ConvertedTypeParameterEntityForDocumentation[]>
]> | "";
export type ConvertedTypeParameterEntitiesForType = ListNode | "";
export type ConvertedTypeParameterEntityForDocumentation = ASTNode[];

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
  remarks: ConvertedRemarks,
  example: ConvertedExample
]>;
export type ConvertedPropertyEntityForType = [
  propertySignature: ASTNode[],
  propertyType: ConvertedTypeMultiline | ""
];
