import { Description, Example, ID, Name, Position } from "./compositions.js";


export enum EntityKind {
  Any = "Any",
  BigInt = "BigInt",
  BigIntLiteral = "BigIntLiteral",
  Boolean = "Boolean",
  BooleanLiteral = "BooleanLiteral",
  Function = "Function",
  Interface = "Interface",
  Member = "Member",
  Never = "Never",
  Null = "Null",
  Number = "Number",
  NumberLiteral = "NumberLiteral",
  ObjectLiteral = "ObjectLiteral",
  Parameter = "Parameter",
  Property = "Property",
  Signature = "Signature",
  String = "String",
  StringLiteral = "StringLiteral",
  Symbol = "Symbol",
  TypeAlias = "TypeAlias",
  TypeLiteral = "TypeLiteral",
  Undefined = "Undefined",
  Variable = "Variable",
  Void = "Void"
}

export interface Entity<Kind extends EntityKind>{
  id: ID;
  kind: Kind;
  description?: Description;
  example?: Example;
  name?: Name;
  position?: Position;
}

export type Entities = |
  Function |
  PrimitiveTypes |
  LiteralTypes |
  Variable |
  ObjectLiteral |
  TypeAlias |
  Interface |
  TypeLiteral |
  Property |
  Member
;


//-- Wrapper

export type FromSymbol<Child extends Entities> = Child & {
  name: Name;
};

export type FromDeclaration<Child extends Entities> = Child & {
  position: Position;
  description?: Description;
  example?: Example;
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
  EntityKind.Void |
  EntityKind.Any |
  EntityKind.Never;


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
  value: string | number | boolean | BigInt;
}

export type LiteralTypes = LiteralType<LiteralTypeKinds>;


//-- Object literal

export interface ObjectLiteral extends Entity<EntityKind.ObjectLiteral> {
  properties: Property[];
}

export interface Property extends Entity<EntityKind.Property> {
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
}

export interface Parameter extends Entity<EntityKind.Parameter> {
  name: Name;
  optional: boolean;
  position: Position;
  rest: boolean;
  type: Entities;
}


//-- Variable

export interface Variable extends Entity<EntityKind.Variable> {
  type: Entities;
}


//-- Type alias

export interface TypeAlias extends Entity<EntityKind.TypeAlias> {
  type: Entities;
}


//-- Type Literal

export interface TypeLiteral extends Entity<EntityKind.TypeLiteral> {
  members: Member[];
}


//-- Interface

export interface Interface extends Entity<EntityKind.Interface> {
  members: Member[];
}

export interface MergedInterface extends Interface {
  examples: Example[];
  positions: Position[];
}

export interface Member extends Entity<EntityKind.Member> {
  type: Entities;
}