import type { TypeKind } from "quickdoks:compiler:enums/types.js";
import type {
  GetterEntity,
  MappedTypeMemberEntity,
  MethodEntity,
  PropertyEntity,
  SetterEntity,
  SignatureEntity,
  TupleMemberEntity,
  TypeParameterEntity
} from "quickdoks:compiler:type-definitions/entities.d.js";
import type {
  Description,
  Example,
  ID,
  Modifiers,
  Name,
  Position
} from "quickdoks:compiler:type-definitions/mixins.d.js";


type Type<Kind extends TypeKind> = {
  id: ID;
  kind: Kind;
};

export type Types =
  | ArrayType
  | CircularType
  | ConditionalType
  | ExpressionType
  | FunctionType
  | InterfaceType
  | IntersectionType
  | LiteralTypes
  | MappedType
  | ObjectLikeTypes
  | PrimitiveTypes
  | TemplateLiteralType
  | TupleType
  | TypeParameterType
  | TypeQueryType
  | TypeReferenceType
  | UnionType
  | UnresolvedType;


export type PrimitiveTypeKinds =
  | TypeKind.Any
  | TypeKind.BigInt
  | TypeKind.BigIntLiteral
  | TypeKind.Boolean
  | TypeKind.BooleanLiteral
  | TypeKind.Never
  | TypeKind.Null
  | TypeKind.Number
  | TypeKind.NumberLiteral
  | TypeKind.String
  | TypeKind.StringLiteral
  | TypeKind.Symbol
  | TypeKind.Undefined
  | TypeKind.Unknown
  | TypeKind.Void;

export type PrimitiveTypes =
  | AnyType
  | BigIntLiteralType
  | BigIntType
  | BooleanLiteralType
  | BooleanType
  | NeverType
  | NullType
  | NumberLiteralType
  | NumberType
  | StringLiteralType
  | StringType
  | SymbolType
  | UndefinedType
  | UnknownType
  | VoidType;


export type LiteralTypeKinds =
  | TypeKind.BigIntLiteral
  | TypeKind.BooleanLiteral
  | TypeKind.NumberLiteral
  | TypeKind.StringLiteral;

export type LiteralTypes =
  | BigIntLiteralType
  | BooleanLiteralType
  | NumberLiteralType
  | StringLiteralType;


export type ObjectLikeTypeKinds =
  | TypeKind.ClassType
  | TypeKind.InterfaceType
  | TypeKind.ObjectLiteral
  | TypeKind.ObjectType
  | TypeKind.TypeLiteral;

export type ObjectLikeTypes =
  ClassType | InterfaceType | ObjectLiteralType | ObjectType | TypeLiteralType;

export type InferObjectLikeType<Kind extends ObjectLikeTypeKinds> =
  Kind extends TypeKind.ClassType
    ? ClassType
    : Kind extends TypeKind.InterfaceType
      ? InterfaceType
      : Kind extends TypeKind.ObjectLiteral
        ? ObjectLiteralType
        : Kind extends TypeKind.ObjectType
          ? ObjectType
          : Kind extends TypeKind.TypeLiteral
            ? TypeLiteralType
            : never;


//-- Primitive types

export type PrimitiveType<Kind extends PrimitiveTypeKinds> = Type<Kind> & {
  name?: Name;
};

export type NumberType = PrimitiveType<TypeKind.Number>;
export type StringType = PrimitiveType<TypeKind.String>;
export type BooleanType = PrimitiveType<TypeKind.Boolean>;
export type BigIntType = PrimitiveType<TypeKind.BigInt>;
export type SymbolType = PrimitiveType<TypeKind.Symbol>;
export type VoidType = PrimitiveType<TypeKind.Void>;
export type UndefinedType = PrimitiveType<TypeKind.Undefined>;
export type NullType = PrimitiveType<TypeKind.Null>;
export type NeverType = PrimitiveType<TypeKind.Never>;
export type UnknownType = PrimitiveType<TypeKind.Unknown>;
export type AnyType = PrimitiveType<TypeKind.Any>;


//-- Literal types

export type LiteralType<Kind extends LiteralTypeKinds> = PrimitiveType<Kind> & {
  value: BigInt | boolean | number | string;
};

export type StringLiteralType = LiteralType<TypeKind.StringLiteral> & {
  value: string;
};

export type NumberLiteralType = LiteralType<TypeKind.NumberLiteral> & {
  value: number;
};

export type BooleanLiteralType = LiteralType<TypeKind.BooleanLiteral> & {
  value: boolean;
};

export type BigIntLiteralType = LiteralType<TypeKind.BigIntLiteral> & {
  value: BigInt;
};


//-- Object type

export type ObjectLikeType<Kind extends ObjectLikeTypeKinds> = Type<Kind> & {
  callSignatures: SignatureEntity[];
  constructSignatures: SignatureEntity[];
  getters: GetterEntity[];
  isThis: boolean;
  methods: MethodEntity[];
  properties: PropertyEntity[];
  setters: SetterEntity[];
  name?: Name;
};


//-- Object type

export type ObjectType = ObjectLikeType<TypeKind.ObjectType> & {
};


//-- Object literal

export type ObjectLiteralType = ObjectLikeType<TypeKind.ObjectLiteral> & {
};


//-- Type reference

export type TypeReferenceType = Type<TypeKind.TypeReference> & {
  name?: Name;
  position?: Position;
  type?: Types;
  typeArguments?: Types[];
};


//-- Expression

export type ExpressionType = Type<TypeKind.Expression> & {
  instanceType: Types;
  staticType: Types;
  name?: Name;
  position?: Position;
  typeArguments?: Types[];
};


//-- Type query

export type TypeQueryType = Type<TypeKind.TypeQuery> & {
  type: Types;
  name?: Name;
  position?: Position;
};


//-- Template literal

export type TemplateLiteralEntity = Type<TypeKind.TemplateLiteral> & {
  spans: string[];
  types: Types[];
  head?: string;
};


//-- Array

export type ArrayType = Type<TypeKind.Array> & {
  type: Types;
  position?: Position;
};


//-- Tuple

export type TupleType = Type<TypeKind.Tuple> & {
  members: TupleMemberEntity[];
  position?: Position;
};


//-- Circular

/** Circular types are used as links to previous symbols for circular references. */
export type CircularType = Type<TypeKind.Circular> & {
  name?: Name;
  position?: Position;
};


//-- Unresolved

/** The unresolved type will be used if a type cannot be parsed, or it is excluded from parsing */
export type UnresolvedType = Type<TypeKind.Unresolved> & {
  name?: Name;
  position?: Position;
};


//-- Function

export type FunctionType = Type<TypeKind.FunctionType> & {
  signatures: SignatureEntity[];
};


//-- Class

export type ClassType = ObjectLikeType<TypeKind.ClassType> & {
  modifiers: Modifiers[];
  name: Name;
  position: Position;
  description?: Description;
  example?: Example;
};


//-- Union type

export type UnionType = Type<TypeKind.UnionType> & {
  types: Types[];
};


//-- Intersection type

export type IntersectionType = Type<TypeKind.IntersectionType> & {
  types: Types[];
};


//-- Template literal type

export type TemplateLiteralType = Type<TypeKind.TemplateLiteral> & {
  spans: string[];
  types: Types[];
  head?: string;
};


//-- Type literal

export type TypeLiteralType = ObjectLikeType<TypeKind.TypeLiteral> & {
};


//-- Type parameter

export type TypeParameterType = Type<TypeKind.TypeParameter> & {
  constraint?: Types;
};


//-- Mapped type

export type MappedType = Type<TypeKind.MappedType> & {
  members: MappedTypeMemberEntity[];
  optional: boolean;
  readonly: boolean;
  typeParameter: TypeParameterEntity;
  position?: Position;
};


//-- Conditional type

export type ConditionalType = Type<TypeKind.ConditionalType> & {
  checkType: Types;
  extendsType: Types;
  falseType: Types;
  trueType: Types;
};


//-- Interface

export interface InterfaceType extends ObjectLikeType<TypeKind.InterfaceType> {
  name: Name;
  properties: PropertyEntity[];
  description?: Description;
  example?: Example;
  heritage?: ExpressionType[];
  position?: Position;
  typeArguments?: Types[];
  typeParameters?: TypeParameterEntity[];
}
