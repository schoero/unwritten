/* eslint-disable @typescript-eslint/array-type */
import { Description, Example, ID, Name, Position } from "./compositions.js";


export enum Kind {
  Any = "Any",
  Array = "Array",
  BigInt = "BigInt",
  BigIntLiteral = "BigIntLiteral",
  Boolean = "Boolean",
  BooleanLiteral = "BooleanLiteral",
  Circular = "Circular",
  Class = "Class",
  ConditionalType = "ConditionalType",
  Enum = "Enum",
  EnumMember = "EnumMember",
  Expression = "Expression",
  Function = "Function",
  Getter = "Getter",
  Interface = "Interface",
  IntersectionType = "Intersection",
  MappedType = "MappedType",
  MappedTypeMember = "MappedTypeMember",
  Member = "Member",
  Method = "Method",
  Module = "Module",
  Namespace = "Namespace",
  Never = "Never",
  Null = "Null",
  Number = "number",
  NumberLiteral = "NumberLiteral",
  ObjectLiteral = "ObjectLiteral",
  ObjectType = "ObjectType",
  Parameter = "Parameter",
  Promise = "Promise",
  Property = "Property",
  Setter = "Setter",
  Signature = "Signature",
  SourceFile = "SourceFile",
  String = "String",
  StringLiteral = "StringLiteral",
  Symbol = "Symbol",
  TemplateLiteral = "TemplateLiteral",
  ThisType = "This",
  Tuple = "Tuple",
  TypeAlias = "TypeAlias",
  TypeArgument = "TypeArgument",
  TypeLiteral = "TypeLiteral",
  TypeParameter = "TypeParameter",
  TypeQuery = "TypeQuery",
  TypeReference = "Reference",
  Undefined = "Undefined",
  UnionType = "Union",
  Unknown = "Unknown",
  Unresolved = "Unresolved",
  Variable = "Variable",
  Void = "Void",
  type = "type"
}

export enum Modifiers {
  Abstract = "abstract",
  Async = "async",
  NativePrivate = "nativePrivate",
  Override = "override",
  Private = "private",
  Protected = "protected",
  Public = "public",
  Readonly = "readonly",
  Static = "static"
}

type Type<Kind> = {
  id: ID;
  kind: Kind;
};


export type ExportableTypeKinds =
  | Kind.Class
  | Kind.Enum
  | Kind.Function
  | Kind.Module
  | Kind.Namespace
  | Kind.type
  | Kind.TypeAlias
  | Kind.Variable;


export type ExportableTypes =
  | Class
  | Enum
  | Function
  | Module
  | Namespace
  | TypeAlias
  | Variable;


export type Types =
  | ArrayType
  | Circular
  | ConditionalType
  | ExportableTypes
  | Expression
  | Getter
  | Interface
  | IntersectionType
  | LiteralTypes
  | MappedType
  | MappedTypeMember
  | Member
  | Method
  | ObjectTypes
  | PrimitiveTypes
  | Property
  | Setter
  | SourceFile
  | TemplateLiteralType
  | ThisType
  | TupleType
  | TypeArgument
  | TypeParameter
  | TypeQuery
  | TypeReference
  | UnionType
  | Unresolved;


export type PrimitiveTypeKinds =
  | Kind.Any
  | Kind.BigInt
  | Kind.BigIntLiteral
  | Kind.Boolean
  | Kind.BooleanLiteral
  | Kind.Never
  | Kind.Null
  | Kind.Number
  | Kind.NumberLiteral
  | Kind.String
  | Kind.StringLiteral
  | Kind.Symbol
  | Kind.Undefined
  | Kind.Unknown
  | Kind.Void;

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
  | Kind.BigIntLiteral
  | Kind.BooleanLiteral
  | Kind.NumberLiteral
  | Kind.StringLiteral;

export type LiteralTypes =
  | BigIntLiteralType
  | BooleanLiteralType
  | NumberLiteralType
  | StringLiteralType;


export type FunctionLikeTypeKinds =
  | Kind.Function
  | Kind.Getter
  | Kind.Method
  | Kind.Setter;

export type FunctionLikeTypes =
  | Function
  | Getter
  | Method
  | Setter;

export type ObjectTypeKinds =
  | Kind.Class
  | Kind.Interface
  | Kind.ObjectLiteral
  | Kind.ObjectType
  | Kind.TypeLiteral;

export type ObjectTypes =
  | Class
  | Interface
  | ObjectLiteral
  | ObjectType
  | TypeLiteral;

export type InferObjectType<Kind extends ObjectTypeKinds> =
  Kind extends Kind.Class
    ? Class
    : Kind extends Kind.Interface
      ? Interface
      : Kind extends Kind.ObjectLiteral
        ? ObjectLiteral
        : Kind extends Kind.ObjectType
          ? ObjectType
          : Kind extends Kind.TypeLiteral
            ? TypeLiteral
            : never;


//-- Primitive types

export type PrimitiveType<Kind extends PrimitiveTypeKinds> = Type<Kind> & {
  name?: Name;
};

export type NumberType = PrimitiveType<Kind.Number>;
export type StringType = PrimitiveType<Kind.String>;
export type BooleanType = PrimitiveType<Kind.Boolean>;
export type BigIntType = PrimitiveType<Kind.BigInt>;
export type SymbolType = PrimitiveType<Kind.Symbol>;
export type VoidType = PrimitiveType<Kind.Void>;
export type UndefinedType = PrimitiveType<Kind.Undefined>;
export type NullType = PrimitiveType<Kind.Null>;
export type NeverType = PrimitiveType<Kind.Never>;
export type UnknownType = PrimitiveType<Kind.Unknown>;
export type AnyType = PrimitiveType<Kind.Any>;


//-- Literal types

export type LiteralType<Kind extends LiteralTypeKinds> = PrimitiveType<Kind> & {
  value: BigInt | boolean | number | string;
};

export type StringLiteralType = LiteralType<Kind.StringLiteral> & {
  value: string;
};

export type NumberLiteralType = LiteralType<Kind.NumberLiteral> & {
  value: number;
};

export type BooleanLiteralType = LiteralType<Kind.BooleanLiteral> & {
  value: boolean;
};

export type BigIntLiteralType = LiteralType<Kind.BigIntLiteral> & {
  value: BigInt;
};


//-- Object type

export type ObjectType<Kind extends ObjectTypeKinds = Kind.ObjectType> = Type<Kind> & {
  callSignatures: Signature[];
  constructSignatures: Signature[];
  getters: Getter[];
  methods: Method[];
  properties: Property[];
  setters: Setter[];
  name?: Name;
};


//-- Object literal

export type ObjectLiteral = ObjectType<Kind.ObjectLiteral> & {
};

export type Property = Type<Kind.Property> & {
  modifiers: Modifiers[];
  name: Name;
  optional: boolean;
  position: Position;
  type: Types;
  description?: Description;
  example?: Example;
};


//-- Array

export type ArrayType = Type<Kind.Array> & {
  type: Types;
  position?: Position;
};


//-- Tuple

export type TupleType = Type<Kind.Tuple> & {
  members: TupleMember[];
  position?: Position;
};

export type TupleMember = Type<Kind.Member> & {
  optional: boolean;
  position: Position;
  rest: boolean;
  type: Types;
  name?: Name;
};


//-- Type reference

export type TypeReference = Type<Kind.TypeReference> & {
  name?: Name;
  position?: Position;
  type?: Types;
  typeArguments?: TypeArgument[];
};


//-- Expression

export type Expression = Type<Kind.Expression> & {
  type: Types;
  name?: Name;
  position?: Position;
  typeArguments?: TypeArgument[];
};


//-- This

export type ThisType = Type<Kind.ThisType> & {
  type?: Types;
};


//-- Circular

/** Circular types are used as links to previous symbols for circular references. */
export type Circular = Type<Kind.Circular> & {
  name?: Name;
  position?: Position;
};


//-- Unresolved

/** The unresolved type will be used if a type cannot be parsed, or it is excluded from parsing */
export type Unresolved = Type<Kind.Unresolved> & {
  name?: Name;
  position?: Position;
};


//-- Function

export type FunctionLike<Kind extends FunctionLikeTypeKinds> = Type<Kind> & {
  signatures: Signature[];
  name?: Name;
};

export type Function = FunctionLike<Kind.Function> & {
};

export type Signature = Type<Kind.Signature> & {
  returnType: Types & { description?: Description; } ;
  description?: Description;
  example?: Example;
  modifiers?: Modifiers[];
  name?: Name;
  parameters?: Parameter[];
  position?: Position;
  typeParameters?: TypeParameter[];
};

export type Parameter = Type<Kind.Parameter> & {
  name: Name;
  optional: boolean;
  position: Position;
  rest: boolean;
  type: Types;
  description?: Description;
  example?: Example;
  initializer?: Types;
};


//-- Class

export type Class = ObjectType<Kind.Class> & {
  modifiers: Modifiers[];
  name: Name;
  position: Position;
  description?: Description;
  example?: Example;
  heritage?: Expression;
  typeParameters?: TypeParameter[];
};

export type Method = FunctionLike<Kind.Method> & {
};

export type Setter = FunctionLike<Kind.Setter> & {
};

export type Getter = FunctionLike<Kind.Getter> & {
};


//-- Variable

export type Variable = Type<Kind.Variable> & {
  modifiers: Modifiers[];
  name: Name;
  position: Position;
  type: Types;
  description?: Description;
  example?: Example;
};


//-- Union type

export type UnionType = Type<Kind.UnionType> & {
  types: Types[];
};


//-- Intersection type

export type IntersectionType = Type<Kind.IntersectionType> & {
  types: Types[];
};


//-- Type alias

export type TypeAlias = Type<Kind.TypeAlias> & {
  name: Name;
  position: Position;
  type: Types;
  description?: Description;
  example?: Example;
  typeParameters?: TypeParameter[];
};


//-- Template literal

export type TemplateLiteralType = Type<Kind.TemplateLiteral> & {
  spans: string[];
  types: Types[];
  head?: string;
};


//-- Type literal

export type TypeLiteral = ObjectType<Kind.TypeLiteral> & {
};


//-- Mapped type

export type MappedType = Type<Kind.MappedType> & {
  members: MappedTypeMember[];
  optional: boolean;
  readonly: boolean;
  typeParameter: TypeParameter;
  position?: Position;
};


//-- Mapped Type member

export type MappedTypeMember = Type<Kind.MappedTypeMember> & {
  keyType: LiteralTypes;
  valueType: Types;
};


//-- Conditional type

export type ConditionalType = Type<Kind.ConditionalType> & {
  checkType: Types;
  extendsType: Types;
  falseType: Types;
  trueType: Types;
};


//-- Type query

export type TypeQuery = Type<Kind.TypeQuery> & {
  type: Types;
  name?: Name;
  position?: Position;
};


//-- Interface

export interface Interface extends ObjectType<Kind.Interface> {
  name: Name;
  properties: Property[];
  description?: Description;
  example?: Example;
  heritage?: Expression[];
  position?: Position;
  typeArguments?: TypeArgument[];
  typeParameters?: TypeParameter[];
}


//-- Enum

export type Enum = Type<Kind.Enum> & {
  members: EnumMember[];
  name: Name;
  description?: Description;
  example?: Example;
  position?: Position;
};

export type MergedEnum = Enum & {
  declarations: Omit<Enum, "id" | "name">[];
};

export type EnumMember = Type<Kind.EnumMember> & {
  name: Name;
  position: Position;
  type: Types;
  description?: Description;
  example?: Example;
  parent?: Types;
};


//-- Member

export type Member = Type<Kind.Member> & {
  modifiers: Modifiers[];
  optional: boolean;
  position: Position;
  type: Types;
  description?: Description;
  example?: Example;
  parent?: Types;
};


//-- Module

export type Module = Type<Kind.Module> & {
  exports: ExportableTypes[];
  name: Name;
};


//-- Source file (module)

export type SourceFile = Type<Kind.SourceFile> & {
  exports: ExportableTypes[];
  name: Name;
};


//-- Namespace

export type Namespace = Type<Kind.Namespace> & {
  exports: ExportableTypes[];
  name: Name;
};


//-- TypeParameter

export type TypeParameter = Type<Kind.TypeParameter> & {
  name: Name;
  position: Position;
  constraint?: Types;
  description?: Description;
  initializer?: Types;
};


//-- TypeArgument

export type TypeArgument = Type<Kind.TypeArgument> & {
  position: Position;
  type: Types;
};
