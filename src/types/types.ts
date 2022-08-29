import { PseudoBigInt } from "typescript";
import { Description, Example, ID, Name, Position } from "./compositions.js";


export enum EntityKind {
  String = "String",
  StringLiteral = "StringLiteral",
  Number = "Number",
  NumberLiteral = "NumberLiteral",
  Boolean = "Boolean",
  BooleanLiteral = "BooleanLiteral",
  BigInt = "BigInt",
  BigIntLiteral = "BigIntLiteral",
  Symbol = "Symbol",
  Void = "Void",
  Undefined = "Undefined",
  Null = "Null",
  Function = "Function",
  Parameter = "Parameter",
}

export interface Entity<Kind extends EntityKind>{
  id: ID;
  kind: Kind;
  name?: Name;
  description?: string;
}

export type Types = Function | PrimitiveTypes | LiteralTypes;


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


//-- Function

export interface Function extends Entity<EntityKind.Function> {
  signatures: FunctionSignature[];
}

export interface FunctionSignature {
  id: ID;
  position: Position;
  parameters: Parameter[];
  returnType: Types;
  example?: Example;
  description?: Description;
}

export interface Parameter extends Entity<EntityKind.Parameter> {
  position: Position;
  optional: boolean;
  rest: boolean;
  type: Types;
  description?: Description;
}
