import {
  BigIntLiteralType,
  BooleanLiteralType,
  Class,
  Enum,
  ExportableTypes,
  Expression,
  Function,
  Getter,
  Instance,
  Interface,
  IntersectionType,
  Kind,
  LiteralTypes,
  Method,
  Namespace,
  NumberLiteralType,
  ObjectLiteral,
  PrimitiveTypes,
  Property,
  Setter,
  StringLiteralType,
  TypeAlias,
  Types,
  UnionType,
  Unresolved,
  Variable
} from "quickdoks:types:types.js";


export function isBigIntLiteralType(type: Types): type is BigIntLiteralType {
  return type.kind === Kind.BigIntLiteral;
}

export function isBooleanLiteralType(type: Types): type is BooleanLiteralType {
  return type.kind === Kind.BooleanLiteral;
}

export function isClassType(type: Types): type is Class {
  return type.kind === Kind.Class;
}

export function isEnumType(type: Types): type is Enum {
  return type.kind === Kind.Enum;
}

export function isExportableType(type: Types): type is ExportableTypes {
  return isClassType(type) ||
    isEnumType(type) ||
    isFunctionType(type) ||
    isInterfaceType(type) ||
    isNamespaceType(type) ||
    isTypeAliasType(type) ||
    isVariableType(type) ||
    isUnresolvedType(type);
}

export function isExpression(type: Types): type is Expression {
  return type.kind === Kind.Expression;
}

export function isFunctionType(type: Types): type is Function {
  return type.kind === Kind.Function;
}

export function isGetterType(type: Types): type is Getter {
  return type.kind === Kind.Getter;
}

export function isInstanceType(type: Types): type is Instance {
  return type.kind === Kind.Instance;
}

export function isInterfaceType(type: Types): type is Interface {
  return type.kind === Kind.Interface;
}

export function isIntersectionType(type: Types): type is IntersectionType {
  return type.kind === Kind.IntersectionType;
}

export function isLiteralType(type: Types): type is LiteralTypes {
  return type.kind === Kind.StringLiteral ||
    type.kind === Kind.NumberLiteral ||
    type.kind === Kind.BooleanLiteral ||
    type.kind === Kind.BigIntLiteral;
}

export function isMethodType(type: Types): type is Method {
  return type.kind === Kind.Method;
}

export function isNamespaceType(type: Types): type is Namespace {
  return type.kind === Kind.Namespace;
}

export function isNumberLiteralType(type: Types): type is NumberLiteralType {
  return type.kind === Kind.NumberLiteral;
}

export function isObjectLiteralType(type: Types): type is ObjectLiteral {
  return type.kind === Kind.ObjectLiteral;
}

export function isPrimitiveType(type: Types): type is PrimitiveTypes {
  return type.kind === Kind.Any ||
    type.kind === Kind.BigInt ||
    type.kind === Kind.BigIntLiteral ||
    type.kind === Kind.Boolean ||
    type.kind === Kind.BooleanLiteral ||
    type.kind === Kind.Never ||
    type.kind === Kind.Null ||
    type.kind === Kind.Number ||
    type.kind === Kind.NumberLiteral ||
    type.kind === Kind.String ||
    type.kind === Kind.StringLiteral ||
    type.kind === Kind.Symbol ||
    type.kind === Kind.Undefined ||
    type.kind === Kind.Void;
}

export function isPropertyType(type: Types): type is Property {
  return type.kind === Kind.Property;
}

export function isSetterType(type: Types): type is Setter {
  return type.kind === Kind.Setter;
}

export function isStringLiteralType(type: Types): type is StringLiteralType {
  return type.kind === Kind.StringLiteral;
}

export function isTypeAliasType(type: Types): type is TypeAlias {
  return type.kind === Kind.TypeAlias;
}

export function isUnionType(type: Types): type is UnionType {
  return type.kind === Kind.UnionType;
}

export function isUnresolvedType(type: Types): type is Unresolved {
  return type.kind === Kind.Unresolved;
}

export function isVariableType(type: Types): type is Variable {
  return type.kind === Kind.Variable;
}
