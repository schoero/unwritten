import { PseudoBigInt } from "typescript";
import { Description, Example, ID, Name, Position } from "./compositions.js";


export enum EntityKind {
  BigInt = "BigInt",
  BigIntLiteral = "BigIntLiteral",
  Boolean = "Boolean",
  BooleanLiteral = "BooleanLiteral",
  Function = "Function",
  Null = "Null",
  Number = "Number",
  NumberLiteral = "NumberLiteral",
  Object = "Object",
  Parameter = "Parameter",
  Property = "Property",
  Signature = "Signature",
  String = "String",
  StringLiteral = "StringLiteral",
  Symbol = "Symbol",
  Undefined = "Undefined",
  Variable = "Variable",
  Void = "Void"
}

export interface Entity<Kind extends EntityKind>{
  id: ID;
  kind: Kind;
}

export type Entities = |
  Function |
  PrimitiveTypes |
  LiteralTypes |
  Variable |
  ObjectLiteral
;


//-- Wrapper

export type FromSymbol<Child extends Entities> = Child & {
  name: Name;
};

export type FromDeclaration<Child extends Entities> = Child & {
  position: Position;
};

export type FromType<Child extends Entities> = Child & {

};

export type ChainedSymbol<Child extends Entities> = FromSymbol<FromDeclaration<FromType<Child>>>;
export type ChainedDeclaration<Child extends Entities> = FromDeclaration<FromType<Child>>;
export type ChainedType<Child extends Entities> = FromType<Child>;


//-- Primitive types

export type PrimitiveTypeKinds =
  EntityKind.String |
  EntityKind.StringLiteral |
  EntityKind.Number |
  EntityKind.NumberLiteral |
  EntityKind.Boolean |
  EntityKind.BooleanLiteral |
  EntityKind.Symbol |
  EntityKind.BigInt |
  EntityKind.BigIntLiteral |
  EntityKind.Null |
  EntityKind.Undefined |
  EntityKind.Void;


export interface PrimitiveType<Kind extends PrimitiveTypeKinds> extends Entity<Kind> {
}

export type PrimitiveTypes = PrimitiveType<PrimitiveTypeKinds>;


//-- Literal types

export type LiteralTypeKinds =
  EntityKind.NumberLiteral |
  EntityKind.StringLiteral |
  EntityKind.BooleanLiteral |
  EntityKind.BigIntLiteral
;

export interface LiteralType<Kind extends LiteralTypeKinds> extends PrimitiveType<Kind> {
  value: string | number | boolean | PseudoBigInt;
}

export type LiteralTypes = LiteralType<LiteralTypeKinds>;


//-- Object literal

export interface ObjectLiteral extends Entity<EntityKind.Object> {
  properties: Property[];
}

export interface Property extends Entity<EntityKind.Property> {
  name: Name;
  type: Entities;
}


//-- Function

export interface Function extends Entity<EntityKind.Function> {
  signatures: FunctionSignature[];
}

export interface FunctionSignature extends Entity<EntityKind.Signature> {
  parameters: Parameter[];
  position: Position;
  returnType: Entities & { description?: Description; } ;
  description?: Description;
  example?: Example;
}

export interface Parameter extends Entity<EntityKind.Parameter> {
  name: Name;
  optional: boolean;
  position: Position;
  rest: boolean;
  type: Entities;
  description?: Description;
}


//-- Variable

export interface Variable extends Entity<EntityKind.Variable> {
  type: Entities;
  description?: Description;
  example?: Example;
}