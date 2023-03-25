import type { TypeKind } from "unwritten:interpreter:enums/types.ts";
import type {
  GetterEntity,
  MethodEntity,
  PropertyEntity,
  SetterEntity,
  SignatureEntity,
  TupleMemberEntity,
  TypeParameterEntity
} from "unwritten:interpreter:type-definitions/entities.js";
import type { ID, Modifiers, Name, Position } from "unwritten:interpreter:type-definitions/shared.ts";


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
  | TypeKind.Class
  | TypeKind.Interface
  | TypeKind.Object
  | TypeKind.ObjectLiteral
  | TypeKind.TypeLiteral;

export type ObjectLikeTypes =
  | ClassType
  | InterfaceType
  | ObjectLiteralType
  | ObjectType
  | TypeLiteralType;

export type InferObjectLikeType<Kind extends ObjectLikeTypeKinds> =
  Kind extends TypeKind.Class
    ? ClassType
    : Kind extends TypeKind.Interface
      ? InterfaceType
      : Kind extends TypeKind.ObjectLiteral
        ? ObjectLiteralType
        : Kind extends TypeKind.Object
          ? ObjectType
          : Kind extends TypeKind.TypeLiteral
            ? TypeLiteralType
            : never;


//-- Primitive types

export type PrimitiveType<Kind extends PrimitiveTypeKinds> = Type<Kind> & {
  name: Name;
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

export interface LiteralType<Kind extends LiteralTypeKinds> extends PrimitiveType<Kind> {
  value: BigInt | boolean | number | string;
}

export interface StringLiteralType extends LiteralType<TypeKind.StringLiteral> {
  value: string;
}

export interface NumberLiteralType extends LiteralType<TypeKind.NumberLiteral> {
  value: number;
}

export interface BooleanLiteralType extends LiteralType<TypeKind.BooleanLiteral> {
  value: boolean;
}

export interface BigIntLiteralType extends LiteralType<TypeKind.BigIntLiteral> {
  value: BigInt;
}


//-- Object type

export interface ObjectLikeType<Kind extends ObjectLikeTypeKinds> extends Type<Kind> {
  callSignatures: SignatureEntity[];
  constructSignatures: SignatureEntity[];
  getters: GetterEntity[];
  isThis: boolean;
  methods: MethodEntity[];
  properties: PropertyEntity[];
  setters: SetterEntity[];
  name?: Name;
  position?: Position;
}


//-- Object type

export interface ObjectType extends ObjectLikeType<TypeKind.Object> {
}


//-- Object literal

export interface ObjectLiteralType extends ObjectLikeType<TypeKind.ObjectLiteral> {
}


//-- Type reference

export interface TypeReferenceType extends Type<TypeKind.TypeReference> {
  name?: Name;
  position?: Position;
  symbolId?: ID;
  type?: Types;
  typeArguments?: Types[];
}


//-- Expression

export interface ExpressionType extends Type<TypeKind.Expression> {
  instanceType: Types;
  staticType: Types;
  /** @deprecated Expressions should render the type instead of rendering the name */
  name?: Name;
  position?: Position;
  typeArguments?: Types[];
}


//-- Type query

export interface TypeQueryType extends Type<TypeKind.TypeQuery> {
  type: Types;
  name?: Name;
  position?: Position;
}


//-- Template literal

export interface TemplateLiteralEntity extends Type<TypeKind.TemplateLiteral> {
  spans: string[];
  types: Types[];
  head?: string;
}


//-- Array

export interface ArrayType extends Type<TypeKind.Array> {
  type: Types;
  position?: Position;
}


//-- Tuple

export interface TupleType extends Type<TypeKind.Tuple> {
  members: TupleMemberEntity[];
  position?: Position;
}


//-- Circular

/** Circular types are used as links to previous symbols for circular references. */
export interface CircularType extends Type<TypeKind.Circular> {
  name?: Name;
  position?: Position;
}


//-- Unresolved

/** The unresolved type will be used if a type cannot be parsed, or it is excluded from parsing */
export interface UnresolvedType extends Type<TypeKind.Unresolved> {
  name?: Name;
  position?: Position;
}


//-- Function

export interface FunctionType extends Type<TypeKind.Function> {
  signatures: SignatureEntity[];
}


//-- Class

export interface ClassType extends ObjectLikeType<TypeKind.Class> {
  modifiers: Modifiers[];
  name: Name;
  position: Position;
}


//-- Union type

export interface UnionType extends Type<TypeKind.Union> {
  types: Types[];
}


//-- Intersection type

export interface IntersectionType extends Type<TypeKind.Intersection> {
  types: Types[];
}


//-- Template literal type

export interface TemplateLiteralType extends Type<TypeKind.TemplateLiteral> {
  spans: string[];
  types: Types[];
  head?: string;
}


//-- Type literal

export interface TypeLiteralType extends ObjectLikeType<TypeKind.TypeLiteral> {
}


//-- Type parameter

export interface TypeParameterType extends Type<TypeKind.TypeParameter> {
  name: Name;
  constraint?: Types;
}


//-- Mapped type

export interface MappedType extends Type<TypeKind.Mapped> {
  optional: boolean;
  properties: PropertyEntity[];
  readonly: boolean;
  typeParameter: TypeParameterEntity;
  position?: Position;
  valueType?: Types;
}


//-- Conditional type

export interface ConditionalType extends Type<TypeKind.Conditional> {
  checkType: Types;
  extendsType: Types;
  falseType: Types;
  trueType: Types;
}


//-- Interface

export interface InterfaceType extends ObjectLikeType<TypeKind.Interface> {
  name: Name;
  properties: PropertyEntity[];
  typeParameters?: TypeParameterEntity[];
}
