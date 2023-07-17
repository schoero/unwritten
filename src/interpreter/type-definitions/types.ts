import type { TypeKind } from "unwritten:interpreter/enums/type.js";
import type {
  Entity,
  GetterEntity,
  MethodEntity,
  PropertyEntity,
  SetterEntity,
  SignatureEntity,
  TupleMemberEntity,
  TypeParameterEntity
} from "unwritten:interpreter/type-definitions/entities.js";
import type { ID, Modifiers, Name, Position } from "unwritten:interpreter:type-definitions/shared.js";


type TypeBase<Kind extends TypeKind> = {
  kind: Kind;
  typeId: ID;
};

export type Type =
  | ArrayType
  | CircularType
  | ConditionalType
  | ExpressionType
  | FunctionType
  | IndexedAccessType
  | InterfaceType
  | IntersectionType
  | LiteralType
  | MappedType
  | ObjectLikeTypes
  | PrimitiveType
  | TemplateLiteralType
  | TupleType
  | TypeParameterType
  | TypeQueryType
  | TypeReferenceType
  | UnionType
  | UnresolvedType;

export type MultilineType =
  | ClassType
  | FunctionType
  | InterfaceType
  | IntersectionType
  | ObjectLiteralType
  | ObjectType
  | TupleType
  | UnionType;

export type PrimitiveTypeKind =
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

export type PrimitiveType =
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

export type LiteralTypeKind =
  | TypeKind.BigIntLiteral
  | TypeKind.BooleanLiteral
  | TypeKind.NumberLiteral
  | TypeKind.StringLiteral;

export type LiteralType =
  | BigIntLiteralType
  | BooleanLiteralType
  | NumberLiteralType
  | StringLiteralType;

export type ObjectLikeTypeKind =
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

export type InferObjectLikeType<Kind extends ObjectLikeTypeKind> =
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

export type PrimitiveTypeBase<Kind extends PrimitiveTypeKind> = TypeBase<Kind> & {
  name: Name;
};

export type NumberType = PrimitiveTypeBase<TypeKind.Number>;
export type StringType = PrimitiveTypeBase<TypeKind.String>;
export type BooleanType = PrimitiveTypeBase<TypeKind.Boolean>;
export type BigIntType = PrimitiveTypeBase<TypeKind.BigInt>;
export type SymbolType = PrimitiveTypeBase<TypeKind.Symbol>;
export type VoidType = PrimitiveTypeBase<TypeKind.Void>;
export type UndefinedType = PrimitiveTypeBase<TypeKind.Undefined>;
export type NullType = PrimitiveTypeBase<TypeKind.Null>;
export type NeverType = PrimitiveTypeBase<TypeKind.Never>;
export type UnknownType = PrimitiveTypeBase<TypeKind.Unknown>;
export type AnyType = PrimitiveTypeBase<TypeKind.Any>;

export interface LiteralTypeBase<Kind extends LiteralTypeKind> extends PrimitiveTypeBase<Kind> {
  value: BigInt | boolean | number | string;
}

export interface StringLiteralType extends LiteralTypeBase<TypeKind.StringLiteral> {
  value: string;
}

export interface NumberLiteralType extends LiteralTypeBase<TypeKind.NumberLiteral> {
  value: number;
}

export interface BooleanLiteralType extends LiteralTypeBase<TypeKind.BooleanLiteral> {
  value: boolean;
}

export interface BigIntLiteralType extends LiteralTypeBase<TypeKind.BigIntLiteral> {
  value: BigInt;
}

export interface ObjectLikeTypeBase<Kind extends ObjectLikeTypeKind> extends TypeBase<Kind> {
  callSignatures: SignatureEntity[];
  constructSignatures: SignatureEntity[];
  getters: GetterEntity[];
  isThis: boolean;
  methods: MethodEntity[];
  properties: PropertyEntity[];
  setters: SetterEntity[];
  name?: Name;
  position?: Position;
  symbolId?: ID;
}

export interface ObjectType extends ObjectLikeTypeBase<TypeKind.Object> {
}

export interface ObjectLiteralType extends ObjectLikeTypeBase<TypeKind.ObjectLiteral> {
}

export interface TypeReferenceType extends TypeBase<TypeKind.TypeReference> {
  name?: Name;
  position?: Position;
  symbolId?: ID;
  target?: Entity;
  type?: Type;
  typeArguments?: Type[];
}

export interface ExpressionType extends TypeBase<TypeKind.Expression> {
  instanceType: Type;
  staticType: Type;
  /** @deprecated Expressions should render the type instead of rendering the name */
  name?: Name;
  position?: Position;
  typeArguments?: Type[];
}

export interface TypeQueryType extends TypeBase<TypeKind.TypeQuery> {
  type: Type;
  name?: Name;
  position?: Position;
}

export interface TemplateLiteralEntity extends TypeBase<TypeKind.TemplateLiteral> {
  spans: string[];
  types: Type[];
  head?: string;
}

export interface ArrayType extends TypeBase<TypeKind.Array> {
  type: Type;
  position?: Position;
}

export interface TupleType extends TypeBase<TypeKind.Tuple> {
  members: TupleMemberEntity[];
  position?: Position;
}

/** Circular types are used as links to previous symbols for circular references. */
export interface CircularType extends TypeBase<TypeKind.Circular> {
  name?: Name;
  position?: Position;
  symbolId?: ID;
}

/** The unresolved type will be used if a type cannot be parsed, or it is excluded from parsing */
export interface UnresolvedType extends TypeBase<TypeKind.Unresolved> {
  name?: Name;
  position?: Position;
  symbolId?: ID;
  typeArguments?: Type[];
}

export interface FunctionType extends TypeBase<TypeKind.Function> {
  signatures: SignatureEntity[];
}

export interface ClassType extends ObjectLikeTypeBase<TypeKind.Class> {
  modifiers: Modifiers[];
  name: Name;
  position: Position;
}

export interface UnionType extends TypeBase<TypeKind.Union> {
  types: Type[];
}

export interface IntersectionType extends TypeBase<TypeKind.Intersection> {
  types: Type[];
}

export interface TemplateLiteralType extends TypeBase<TypeKind.TemplateLiteral> {
  spans: string[];
  types: Type[];
  head?: string;
}

export interface TypeLiteralType extends ObjectLikeTypeBase<TypeKind.TypeLiteral> {
}

export interface TypeParameterType extends TypeBase<TypeKind.TypeParameter> {
  name: Name;
  constraint?: Type;
}

export interface MappedType extends TypeBase<TypeKind.Mapped> {
  optional: boolean;
  readonly: boolean;
  type: Type;
  typeParameter: TypeParameterEntity;
  position?: Position;
  valueType?: Type;
}

export interface ConditionalType extends TypeBase<TypeKind.Conditional> {
  checkType: Type;
  extendsType: Type;
  falseType: Type;
  trueType: Type;
}

export interface InterfaceType extends ObjectLikeTypeBase<TypeKind.Interface> {
  name: Name;
  properties: PropertyEntity[];
  typeParameters?: TypeParameterEntity[];
}

export interface IndexedAccessType extends TypeBase<TypeKind.IndexedAccess> {
  indexType: Type;
  objectType: Type;
  type?: Type;
}
