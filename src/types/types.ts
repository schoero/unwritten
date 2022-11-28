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
  Constructor = "Constructor",
  Enum = "Enum",
  EnumMember = "EnumMember",
  Expression = "Expression",
  Function = "Function",
  Getter = "Getter",
  Instance = "Instance",
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
  Parameter = "Parameter",
  Promise = "Promise",
  Property = "Property",
  Setter = "Setter",
  Signature = "Signature",
  SourceFile = "SourceFile",
  String = "String",
  StringLiteral = "StringLiteral",
  Symbol = "Symbol",
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
  Void = "Void"
}

export enum Modifiers {
  Abstract = "abstract",
  Async = "async",
  Override = "override",
  Private = "private",
  Protected = "protected",
  Public = "public",
  Readonly = "readonly",
  Static = "static"
}

export type FunctionLikeTypeKinds =
  | Kind.Constructor
  | Kind.Function
  | Kind.Getter
  | Kind.Method
  | Kind.Setter;

export interface Type<Kind>{
  id: ID;
  kind: Kind;
}

export type ExportableTypeKinds =
  | Kind.Class
  | Kind.Enum
  | Kind.Function
  | Kind.Interface
  | Kind.Module
  | Kind.Namespace
  | Kind.TypeAlias
  | Kind.Variable;

export type ExportableTypes =
  | Class
  | Enum
  | Function
  | Interface
  | Module
  | Namespace
  | TypeAlias
  | Variable;

export type Types =
  | ArrayType
  | Circular
  | ConditionalType
  | Constructor
  | ExportableTypes
  | Expression
  | Getter
  | Instance
  | IntersectionType
  | LiteralTypes
  | MappedType
  | MappedTypeMember
  | Member
  | Method
  | ObjectLiteral
  | PrimitiveTypes
  | Property
  | Setter
  | SourceFile
  | ThisType
  | TupleType
  | TypeArgument
  | TypeLiteral
  | TypeParameter
  | TypeQuery
  | TypeReference
  | UnionType
  | Unresolved;


//-- Primitive types

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


export interface PrimitiveType<Kind extends PrimitiveTypeKinds> extends Type<Kind> {
  name?: Name;
}

export type PrimitiveTypes = PrimitiveType<PrimitiveTypeKinds>;


//-- Literal types

export type LiteralTypeKinds =
  Kind.BigIntLiteral | Kind.BooleanLiteral | Kind.NumberLiteral | Kind.StringLiteral;

export interface LiteralType<Kind extends LiteralTypeKinds> extends PrimitiveType<Kind> {
  value: BigInt | boolean | number | string;
}

export interface StringLiteralType extends LiteralType<Kind.StringLiteral> {
  value: string;
}

export interface NumberLiteralType extends LiteralType<Kind.NumberLiteral> {
  value: number;
}

export interface BooleanLiteralType extends LiteralType<Kind.BooleanLiteral> {
  value: boolean;
}

export interface BigIntLiteralType extends LiteralType<Kind.BigIntLiteral> {
  value: BigInt;
}

export type LiteralTypes = BigIntLiteralType | BooleanLiteralType | NumberLiteralType | StringLiteralType;


//-- Object type

export interface ObjectType<Kind> extends Type<Kind> {
  callSignatures: Signature[];
  constructSignatures: Signature[];
  getters: Getter[];
  methods: Method[];
  properties: Property[];
  setters: Setter[];
  name?: Name;
}


//-- Object literal

export interface ObjectLiteral extends ObjectType<Kind.ObjectLiteral> {
}

export interface Property extends Type<Kind.Property> {
  modifiers: Modifiers[];
  name: Name;
  optional: boolean;
  position: Position;
  type: Types;
  description?: Description;
  example?: Example;
}


//-- Array

export interface ArrayType extends Type<Kind.Array> {
  type: Types;
  position?: Position;
}


//-- Tuple

export interface TupleType extends Type<Kind.Tuple> {
  members: TupleMember[];
  position?: Position;
}

export interface TupleMember extends Type<Kind.Member> {
  optional: boolean;
  position: Position;
  rest: boolean;
  type: Types;
  name?: Name;
}


//-- Type reference

export interface TypeReference extends Type<Kind.TypeReference> {
  name?: Name;
  position?: Position;
  type?: Types;
  typeArguments?: TypeArgument[];
}


//-- Expression

export interface Expression extends Type<Kind.Expression> {
  name?: Name;
  position?: Position;
  type?: Types;
  typeArguments?: TypeArgument[];
}


//-- Instance

export interface Instance extends Type<Kind.Instance> {
  name?: Name;
  position?: Position;
  resolvedType?: Types;
  typeArguments?: TypeArgument[];
}


//-- This

export interface ThisType extends Type<Kind.ThisType> {
  type?: Types;
}


//-- Circular

/** Circular types are used as links to previous symbols for circular references. */
export interface Circular extends Type<Kind.Circular> {
  name?: Name;
  position?: Position;
}


//-- Unresolved

/** The unresolved type will be used if a type cannot be parsed, or it is excluded from parsing */
export interface Unresolved extends Type<Kind.Unresolved> {
  name?: Name;
  position?: Position;
}


//-- Function

export interface FunctionLike<Kind extends Kind.Constructor | Kind.Function | Kind.Getter | Kind.Method | Kind.Setter> extends Type<Kind> {
  signatures: Signature[];
  name?: Name;
}

export interface Function extends FunctionLike<Kind.Function> {
}

export interface Signature extends Type<Kind.Signature> {
  modifiers: Modifiers[];
  parameters: Parameter[];
  position: Position;
  returnType: Types & { description?: Description; } ;
  description?: Description;
  example?: Example;
  name?: Name;
}

export interface Parameter extends Type<Kind.Parameter> {
  name: Name;
  optional: boolean;
  position: Position;
  rest: boolean;
  type: Types;
  description?: Description;
  example?: Example;
  initializer?: Types;
}


//-- Class

export interface Class extends Type<Kind.Class> {
  modifiers: Modifiers[];
  name: Name;
  position: Position;
  ctor?: Constructor;
  description?: Description;
  example?: Example;
  getters?: Getter[];
  heritage?: Class;
  methods?: Method[];
  properties?: Property[];
  setters?: Setter[];
  typeParameters?: TypeParameter[];
}

export interface Constructor extends FunctionLike<Kind.Constructor> {
}

export interface Method extends FunctionLike<Kind.Method> {
}

export interface Setter extends FunctionLike<Kind.Setter> {
}

export interface Getter extends FunctionLike<Kind.Getter> {
}


//-- Variable

export interface Variable extends Type<Kind.Variable> {
  modifiers: Modifiers[];
  name: Name;
  position: Position;
  type: Types;
  description?: Description;
  example?: Example;
}


//-- Union type

export interface UnionType extends Type<Kind.UnionType> {
  types: Types[];
}


//-- Intersection type

export interface IntersectionType extends Type<Kind.IntersectionType> {
  types: Types[];
}


//-- Type alias

export interface TypeAlias extends Type<Kind.TypeAlias> {
  name: Name;
  position: Position;
  type: Types;
  description?: Description;
  example?: Example;
  typeParameters?: TypeParameter[];
}


//-- Type Literal

export interface TypeLiteral extends ObjectType<Kind.TypeLiteral> {
  callSignatures: Signature[];
  constructSignatures: Signature[];
  getters: Getter[];
  methods: Method[];
  properties: Property[];
  setters: Setter[];
  name?: Name;
}


//-- Mapped type

export interface MappedType extends Type<Kind.MappedType> {
  members: MappedTypeMember[];
  optional: boolean;
  readonly: boolean;
  typeParameter: TypeParameter;
  position?: Position;
}


//-- Mapped Type member

export interface MappedTypeMember extends Type<Kind.MappedTypeMember> {
  keyType: LiteralTypes;
  valueType: Types;
}


//-- Conditional type

export interface ConditionalType extends Type<Kind.ConditionalType> {
  checkType: Types;
  extendsType: Types;
  falseType: Types;
  trueType: Types;
}


//-- Type query

export interface TypeQuery extends Type<Kind.TypeQuery> {
  type: Types;
  name?: Name;
  position?: Position;
}


//-- Interface

export interface Interface extends Type<Kind.Interface> {
  callSignatures: Signature[];
  constructSignatures: Signature[];
  getterSignatures: Signature[];
  methodSignatures: Signature[];
  name: Name;
  properties: Property[];
  setterSignatures: Signature[];
  description?: Description;
  example?: Example;
  heritage?: Interface[];
  position?: Position;
  typeArguments?: TypeArgument[];
  typeParameters?: TypeParameter[];
}

export interface MergedInterface extends Interface {
  declarations: Omit<Interface, "id" | "name">[];
}


//-- Enum

export interface Enum extends Type<Kind.Enum> {
  members: EnumMember[];
  name: Name;
  description?: Description;
  example?: Example;
  position?: Position;
}

export interface MergedEnum extends Enum {
  declarations: Omit<Enum, "id" | "name">[];
}

export interface EnumMember extends Type<Kind.EnumMember> {
  name: Name;
  position: Position;
  type: Types;
  description?: Description;
  example?: Example;
  parent?: Types;
}


//-- Member

export interface Member extends Type<Kind.Member> {
  modifiers: Modifiers[];
  optional: boolean;
  position: Position;
  type: Types;
  description?: Description;
  example?: Example;
  parent?: Types;
}


//-- Module

export interface Module extends Type<Kind.Module> {
  exports: ExportableTypes[];
  name: Name;
}


//-- Source file (module)

export interface SourceFile extends Type<Kind.SourceFile> {
  exports: ExportableTypes[];
  name: Name;
}


//-- Namespace

export interface Namespace extends Type<Kind.Namespace> {
  exports: ExportableTypes[];
  name: Name;
}


//-- TypeParameter

export interface TypeParameter extends Type<Kind.TypeParameter> {
  name: Name;
  position: Position;
  constraint?: Types;
  description?: Description;
  initializer?: Types;
}


//-- TypeArgument

export interface TypeArgument extends Type<Kind.TypeArgument> {
  position: Position;
  type?: Types;
}

export type FunctionLikeTypeMap = {
  [Kind.Class]: Class;
  [Kind.Constructor]: Constructor;
  [Kind.Function]: Function;
  [Kind.Getter]: Getter;
  [Kind.Method]: Method;
  [Kind.Setter]: Setter;
};
