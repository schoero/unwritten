import { Description, Example, ID, Name, Position } from "./compositions.js";


export enum EntityKind {
  Any = "Any",
  Array = "Array",
  BigInt = "BigInt",
  BigIntLiteral = "BigIntLiteral",
  Boolean = "Boolean",
  BooleanLiteral = "BooleanLiteral",
  Class = "Class",
  ClassInstance = "ClassInstance",
  Constructor = "Constructor",
  Function = "Function",
  Getter = "Getter",
  Interface = "Interface",
  Intersection = "Intersection",
  Member = "Member",
  Method = "Method",
  Never = "Never",
  Null = "Null",
  Number = "Number",
  NumberLiteral = "NumberLiteral",
  ObjectLiteral = "ObjectLiteral",
  Parameter = "Parameter",
  Property = "Property",
  Reference = "Reference",
  Setter = "Setter",
  Signature = "Signature",
  String = "String",
  StringLiteral = "StringLiteral",
  Symbol = "Symbol",
  TypeAlias = "TypeAlias",
  TypeLiteral = "TypeLiteral",
  Undefined = "Undefined",
  Union = "Union",
  Variable = "Variable",
  Void = "Void"
}

export type FunctionLikeEntityKinds =
  | EntityKind.Constructor
  | EntityKind.Function
  | EntityKind.Getter
  | EntityKind.Method
  | EntityKind.Setter
;


export interface Entity<Kind extends EntityKind>{
  id: ID;
  kind: Kind;
  description?: Description;
  example?: Example;
  name?: Name;
  position?: Position;
}

export type Entities =
  // eslint-disable-next-line @typescript-eslint/array-type
  | Array
  | Class
  | ClassInstance
  | Constructor
  | Function
  | Getter
  | Interface
  | IntersectionType
  | LiteralTypes
  | Member
  | Method
  | ObjectLiteral
  | PrimitiveTypes
  | Property
  | Property
  | Reference
  | Setter
  | Setter
  | TypeAlias
  | TypeLiteral
  | UnionType
  | Variable
;


//-- Wrapper

export type FromSymbol<Child extends Entities> = Child & {
  name: Name;
  description?: Description;
};

export type FromDeclaration<Child extends Entities> = Child & {
  position: Position;
  example?: Example;
};

export type FromType<Child extends Entities> = Child & {

};


//-- Primitive types

export type PrimitiveTypeKinds =
  EntityKind.Any | EntityKind.BigInt | EntityKind.BigIntLiteral | EntityKind.Boolean | EntityKind.BooleanLiteral | EntityKind.Never | EntityKind.Null | EntityKind.Number | EntityKind.NumberLiteral | EntityKind.String | EntityKind.StringLiteral | EntityKind.Symbol | EntityKind.Undefined | EntityKind.Void;


export interface PrimitiveType<Kind extends PrimitiveTypeKinds> extends Entity<Kind> {
}

export type PrimitiveTypes = PrimitiveType<PrimitiveTypeKinds>;


//-- Literal types

export type LiteralTypeKinds =
  EntityKind.BigIntLiteral | EntityKind.BooleanLiteral | EntityKind.NumberLiteral | EntityKind.StringLiteral
;

export interface LiteralType<Kind extends LiteralTypeKinds> extends PrimitiveType<Kind> {
  value: BigInt | boolean | number | string;
}

export type LiteralTypes = LiteralType<LiteralTypeKinds>;


//-- Object literal

export interface ObjectLiteral extends Entity<EntityKind.ObjectLiteral> {
  properties: Property[];
}

export interface Property extends Entity<EntityKind.Property> {
  type: Entities;
}


//-- Array

export interface Array extends Entity<EntityKind.Array> {
  type: Entities;
}


//-- Type reference

export interface Reference extends Entity<EntityKind.Reference> {
  id: ID;
  name: Name;
  position: Position;
  resolvedType?: Entities;
}


//-- Function

export interface FunctionLike<Kind extends EntityKind.Constructor | EntityKind.Function | EntityKind.Getter | EntityKind.Method | EntityKind.Setter> extends Entity<Kind> {
  signatures: Signature[];
}

export interface Function extends FunctionLike<EntityKind.Function> {
}

export interface Signature extends Entity<EntityKind.Signature> {
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


//-- Class

export interface Class extends Entity<EntityKind.Class> {
  getters: Getter[];
  methods: Method[];
  properties: Property[];
  setters: Setter[];
  ctor?: Constructor;
}

export interface ClassInstance extends Entity<EntityKind.ClassInstance> {
  getters: Getter[];
  methods: Method[];
  properties: Property[];
  setters: Setter[];
}

export interface Constructor extends FunctionLike<EntityKind.Constructor> {
}

export interface Method extends FunctionLike<EntityKind.Method> {
}

export interface Setter extends FunctionLike<EntityKind.Setter> {
}

export interface Getter extends FunctionLike<EntityKind.Getter> {
}


//-- Variable

export interface Variable extends Entity<EntityKind.Variable> {
  type: Entities;
}


//-- Union type

export interface UnionType extends Entity<EntityKind.Union> {
  types: Entities[];
}


//-- Intersection type

export interface IntersectionType extends Entity<EntityKind.Intersection> {
  types: Entities[];
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
  name: Name;
  optional: boolean;
  type: Entities;
}


export type FunctionLikeEntityMap = {
  [EntityKind.Class]: Class;
  [EntityKind.Constructor]: Constructor;
  [EntityKind.Function]: Function;
  [EntityKind.Getter]: Getter;
  [EntityKind.Method]: Method;
  [EntityKind.Setter]: Setter;
};