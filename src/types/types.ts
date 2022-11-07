import { Description, Example, ID, Name, Position } from "./compositions.js";


export enum TypeKind {
  Any = "Any",
  BigInt = "BigInt",
  BigIntLiteral = "BigIntLiteral",
  Boolean = "Boolean",
  BooleanLiteral = "BooleanLiteral",
  Class = "Class",
  Constructor = "Constructor",
  Enum = "Enum",
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
  Number = "number",
  NumberLiteral = "NumberLiteral",
  Object = "Object",
  ObjectLiteral = "ObjectLiteral",
  Parameter = "Parameter",
  Promise = "Promise",
  Property = "Property",
  Reference = "Reference",
  Setter = "Setter",
  Signature = "Signature",
  SourceFile = "SourceFile",
  String = "String",
  StringLiteral = "StringLiteral",
  Symbol = "Symbol",
  This = "This",
  Tuple = "Tuple",
  TypeAlias = "TypeAlias",
  TypeLiteral = "TypeLiteral",
  TypeParameter = "TypeParameter",
  Undefined = "Undefined",
  Union = "Union",
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
  | TypeKind.Constructor
  | TypeKind.Function
  | TypeKind.Getter
  | TypeKind.Method
  | TypeKind.Setter;

export interface Type<Kind extends TypeKind>{
  id: ID;
  kind: Kind;
}

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
  | Constructor
  | ExportableTypes
  | Getter
  | Instance
  | Intersection
  | LiteralTypes
  | Member
  | Method
  | ObjectLiteral
  | PrimitiveTypes
  | Property
  | Reference
  | Setter
  | SourceFile
  | This
  | Tuple
  | TypeLiteral
  | TypeParameter
  | Union
  | Unresolved;


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
  | TypeKind.Unknown
  | TypeKind.Void;


export interface PrimitiveType<Kind extends PrimitiveTypeKinds> extends Type<Kind> {
  name?: Name;
}

export type PrimitiveTypes = PrimitiveType<PrimitiveTypeKinds>;


//-- Literal types

export type LiteralTypeKinds =
  TypeKind.BigIntLiteral | TypeKind.BooleanLiteral | TypeKind.NumberLiteral | TypeKind.StringLiteral;

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


//-- Tuple

export interface Tuple extends Type<TypeKind.Tuple> {
  members: TupleMember[];
  description?: Description;
  example?: Example;
  name?: Name;
  position?: Position;
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
  name?: Name;
  position?: Position;
  resolvedType?: Types;
  typeArguments?: Types[];
}


//-- Instance

export interface Instance extends Type<TypeKind.Instance> {
  id: ID;
  name?: Name;
  position?: Position;
  resolvedType?: Types;
  typeArguments?: Types[];
}


//-- This

export interface This extends Type<TypeKind.This> {
  id: ID;
  name: Name;
  position: Position;
  resolvedType?: Types;
}


//-- Unresolved

export interface Unresolved extends Type<TypeKind.Unresolved> {
  id: ID;
  name?: Name;
  position?: Position;
}


//-- Function

export interface FunctionLike<Kind extends TypeKind.Constructor | TypeKind.Function | TypeKind.Getter | TypeKind.Method | TypeKind.Setter> extends Type<Kind> {
  signatures: Signature[];
  name?: Name;
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
  initializer?: Types;
}


//-- Class

export interface Class extends Type<TypeKind.Class> {
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
  description?: Description;
  example?: Example;
}


//-- Interface

export interface Interface extends Type<TypeKind.Interface> {
  members: Member[];
  name: Name;
  description?: Description;
  example?: Example;
  heritage?: Interface;
  position?: Position;
}

export interface MergedInterface extends Interface {
  declarations: Omit<Interface, "id" | "name">[];
}


//-- Enum

export interface Enum extends Type<TypeKind.Enum> {
  members: EnumMember[];
  name: Name;
  description?: Description;
  example?: Example;
  position?: Position;
}

export interface MergedEnum extends Enum {
  declarations: Omit<Enum, "id" | "name">[];
}

export interface EnumMember extends Type<TypeKind.Member> {
  name: Name;
  position: Position;
  type: Types;
  description?: Description;
  example?: Example;
}


//-- Member

export interface Member extends Type<TypeKind.Member> {
  modifiers: Modifiers[];
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


//-- Source file (module)

export interface SourceFile extends Type<TypeKind.SourceFile> {
  exports: ExportableTypes[];
  name: Name;
}


//-- Namespace

export interface Namespace extends Type<TypeKind.Namespace> {
  exports: ExportableTypes[];
  name: Name;
}


//-- TypeParameter

export interface TypeParameter extends Type<TypeKind.TypeParameter> {
  name: Name;
  position: Position;
  constraints?: Types;
}

export type FunctionLikeTypeMap = {
  [TypeKind.Class]: Class;
  [TypeKind.Constructor]: Constructor;
  [TypeKind.Function]: Function;
  [TypeKind.Getter]: Getter;
  [TypeKind.Method]: Method;
  [TypeKind.Setter]: Setter;
};
