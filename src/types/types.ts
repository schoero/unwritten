import { Description, Example, ID, Name, Position } from "./compositions.js";


export enum TypeKind {
  Any = "Any",
  Array = "Array",
  BigInt = "BigInt",
  BigIntLiteral = "BigIntLiteral",
  Boolean = "Boolean",
  BooleanLiteral = "BooleanLiteral",
  Class = "Class",
  Constructor = "Constructor",
  Function = "Function",
  Getter = "Getter",
  Instance = "Instance",
  Interface = "Interface",
  Intersection = "Intersection",
  Member = "Member",
  Method = "Method",
  Module = "Module",
  Namespace = "Namespace",
  Never = "Never",
  Null = "Null",
  Number = "Number",
  NumberLiteral = "NumberLiteral",
  Object = "Object",
  ObjectLiteral = "ObjectLiteral",
  Parameter = "Parameter",
  Promise = "Promise",
  Property = "Property",
  Reference = "Reference",
  Setter = "Setter",
  Signature = "Signature",
  String = "String",
  StringLiteral = "StringLiteral",
  Symbol = "Symbol",
  This = "This",
  Tuple = "Tuple",
  TypeAlias = "TypeAlias",
  TypeLiteral = "TypeLiteral",
  Undefined = "Undefined",
  Union = "Union",
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
  | TypeKind.Constructor
  | TypeKind.Function
  | TypeKind.Getter
  | TypeKind.Method
  | TypeKind.Setter
;


export interface Type<Kind extends TypeKind>{
  id: ID;
  kind: Kind;
}

export type Types =
  // eslint-disable-next-line @typescript-eslint/array-type
  | Array
  | Class
  | Constructor
  | Function
  | Getter
  | Instance
  | Interface
  | Intersection
  | LiteralTypes
  | Member
  | Method
  | Module
  | Namespace
  | ObjectLiteral
  | PrimitiveTypes
  | Property
  | Reference
  | Setter
  | This
  | Tuple
  | TypeAlias
  | TypeLiteral
  | Union
  | Variable
;


export type ExportableTypes =
  | Class
  | Function
  | Interface
  | Module
  | Namespace
  | TypeAlias
  | Variable
;


//-- Primitive types

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
  | TypeKind.Void;


export interface PrimitiveType<Kind extends PrimitiveTypeKinds> extends Type<Kind> {
  name: Name;
  position: Position;
  description?: Description;
  example?: Example;
}

export type PrimitiveTypes = PrimitiveType<PrimitiveTypeKinds>;


//-- Literal types

export type LiteralTypeKinds =
  TypeKind.BigIntLiteral | TypeKind.BooleanLiteral | TypeKind.NumberLiteral | TypeKind.StringLiteral
;

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

export type LiteralTypes = BigIntLiteralType | BooleanLiteralType | NumberLiteralType | StringLiteralType;


//-- Object literal

export interface ObjectLiteral extends Type<TypeKind.ObjectLiteral> {
  name: Name;
  position: Position;
  properties: Property[];
  description?: Description;
  example?: Example;
}

export interface Property extends Type<TypeKind.Property> {
  modifiers: Modifiers[];
  name: Name;
  optional: boolean;
  position: Position;
  type: Types;
  description?: Description;
  example?: Example;
}


//-- Array

export interface Array extends Type<TypeKind.Array> {
  name: Name;
  position: Position;
  type: Types;
  description?: Description;
  example?: Example;
}


//-- Tuple

export interface Tuple extends Type<TypeKind.Tuple> {
  members: TupleMember[];
  name: Name;
  position: Position;
  description?: Description;
  example?: Example;
}

export interface TupleMember extends Type<TypeKind.Member> {
  optional: boolean;
  position: Position;
  rest: boolean;
  type: Types;
  name?: Name;
}


//-- Type reference

export interface Reference extends Type<TypeKind.Reference> {
  id: ID;
  position: Position;
  resolvedType?: Types;
  typeArguments?: Types[];
}


//-- Instance

export interface Instance extends Type<TypeKind.Instance> {
  id: ID;
  name: Name;
  position: Position;
  resolvedType?: Types;
}


//-- This

export interface This extends Type<TypeKind.This> {
  id: ID;
  name: Name;
  position: Position;
  resolvedType?: Types;
}


//-- Function

export interface FunctionLike<Kind extends TypeKind.Constructor | TypeKind.Function | TypeKind.Getter | TypeKind.Method | TypeKind.Setter> extends Type<Kind> {
  name: Name;
  position: Position;
  signatures: Signature[];
}

export interface Function extends FunctionLike<TypeKind.Function> {
}

export interface Signature extends Type<TypeKind.Signature> {
  modifiers: Modifiers[];
  parameters: Parameter[];
  position: Position;
  returnType: Types & { description?: Description; } ;
  description?: Description;
  example?: Example;
}

export interface Parameter extends Type<TypeKind.Parameter> {
  name: Name;
  optional: boolean;
  position: Position;
  rest: boolean;
  type: Types;
  description?: Description;
  example?: Example;
}


//-- Class

export interface Class extends Type<TypeKind.Class> {
  getters: Getter[];
  methods: Method[];
  modifiers: Modifiers[];
  name: Name;
  position: Position;
  properties: Property[];
  setters: Setter[];
  ctor?: Constructor;
  description?: Description;
  example?: Example;
  heritage?: Class;
}

export interface Constructor extends FunctionLike<TypeKind.Constructor> {
}

export interface Method extends FunctionLike<TypeKind.Method> {
}

export interface Setter extends FunctionLike<TypeKind.Setter> {
}

export interface Getter extends FunctionLike<TypeKind.Getter> {
}


//-- Variable

export interface Variable extends Type<TypeKind.Variable> {
  modifiers: Modifiers[];
  name: Name;
  position: Position;
  type: Types;
  description?: Description;
  example?: Example;
}


//-- Union type

export interface Union extends Type<TypeKind.Union> {
  types: Types[];
}


//-- Intersection type

export interface Intersection extends Type<TypeKind.Intersection> {
  types: Types[];
}


//-- Type alias

export interface TypeAlias extends Type<TypeKind.TypeAlias> {
  name: Name;
  position: Position;
  type: Types;
  description?: Description;
  example?: Example;
}


//-- Type Literal

export interface TypeLiteral extends Type<TypeKind.TypeLiteral> {
  members: Member[];
  name: Name;
  position: Position;
  description?: Description;
  example?: Example;
}


//-- Interface

export interface Interface extends Type<TypeKind.Interface> {
  members: Member[];
  name: Name;
  position: Position;
  description?: Description;
  example?: Example;
  heritage?: Interface;
}

export interface MergedInterface extends Interface {
  declarations: Interface[];
}


//-- Member

export interface Member extends Type<TypeKind.Member> {
  name: Name;
  optional: boolean;
  position: Position;
  type: Types;
  description?: Description;
  example?: Example;
}


//-- Module

export interface Module extends Type<TypeKind.Module> {
  exports: ExportableTypes[];
  name: Name;
}


//-- Namespace

export interface Namespace extends Type<TypeKind.Namespace> {
  exports: ExportableTypes[];
  name: Name;
}

export type FunctionLikeTypeMap = {
  [TypeKind.Class]: Class;
  [TypeKind.Constructor]: Constructor;
  [TypeKind.Function]: Function;
  [TypeKind.Getter]: Getter;
  [TypeKind.Method]: Method;
  [TypeKind.Setter]: Setter;
};