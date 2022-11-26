import ts, {
  BigIntLiteralType,
  ConditionalType,
  Declaration,
  GenericType,
  InterfaceType,
  IntersectionType,
  LiteralType,
  NamedTupleMember,
  NumberLiteralType,
  ObjectType,
  StringLiteralType,
  TupleType,
  TupleTypeReference,
  Type,
  TypeNode,
  TypeParameter,
  TypeReference,
  UnionType
} from "typescript";

import { isDeclaration } from "./declarations.js";
import { isSymbol } from "./symbols.js";
import { isTypeNode } from "./type-nodes.js";


export function isAnonymousType(type: Type) {
  return isObjectType(type) && (type.objectFlags & ts.ObjectFlags.Anonymous) !== 0;
}

export function isAnyType(type: Type) {
  return (type.flags & ts.TypeFlags.Any) !== 0;
}

export function isArrayTypeReferenceType(type: Type): type is TypeReference {
  return isTypeReferenceType(type) && type.target.symbol.getName() === "Array" && type.target.typeParameters?.length === 1;
}

export function isBigIntLiteralType(type: Type): type is BigIntLiteralType {
  return (type.flags & ts.TypeFlags.BigIntLiteral) !== 0;
}

export function isBigIntType(type: Type): boolean {
  return (type.flags & ts.TypeFlags.BigInt) !== 0;
}

export function isBooleanLiteralType(type: Type): boolean {
  return (type.flags & ts.TypeFlags.BooleanLiteral) !== 0;
}

export function isBooleanType(type: Type): boolean {
  return (type.flags & ts.TypeFlags.Boolean) !== 0;
}

export function isClassOrInterfaceType(type: Type): type is InterfaceType {
  return isObjectType(type) &&
    (type.objectFlags & ts.ObjectFlags.ClassOrInterface) !== 0;
}

export function isClassType(type: Type): type is InterfaceType {
  return type.isClass();
}

export function isConditionalType(type: Type): type is ConditionalType {
  return (type.flags & ts.TypeFlags.Conditional) !== 0;
}

export function isEnumType(type: Type): boolean {
  return (type.flags & ts.TypeFlags.Enum) !== 0;
}

export function isFunctionLikeType(type: Type): boolean {
  return isObjectType(type) &&
    type.getCallSignatures().length > 0 &&
    type.getConstructSignatures().length === 0 &&
    type.getProperties().length === 0;
}

export function isGenericType(type: Type): type is GenericType {
  return isObjectType(type) &&
    (type.objectFlags & ts.ObjectFlags.ClassOrInterface) !== 0 &&
    (type.objectFlags & ts.ObjectFlags.Reference) !== 0;
}

export function isInstanceType(type: Type): type is TypeReference {
  return isObjectType(type) && (type.objectFlags & ts.ObjectFlags.Reference) !== 0 && (type.objectFlags & ts.ObjectFlags.Class) !== 0;
}

export function isInterfaceType(type: Type): type is InterfaceType {
  return isObjectType(type) &&
    (type.objectFlags & ts.ObjectFlags.Interface) !== 0;
}

export function isIntersectionType(type: Type): type is IntersectionType {
  return (type.flags & ts.TypeFlags.Intersection) !== 0;
}

export function isLiteralType(type: Type): type is LiteralType {
  return (type.flags & (ts.TypeFlags.StringOrNumberLiteral | ts.TypeFlags.BigIntLiteral | ts.TypeFlags.BooleanLiteral)) !== 0;
}

export function isMappedType(type: Type): boolean {
  return isObjectType(type) && (type.objectFlags & ts.ObjectFlags.Mapped) !== 0;
}

export function isNamedTupleMember(member: NamedTupleMember | TypeNode): member is NamedTupleMember {
  return ts.isNamedTupleMember(member);
}

export function isNeverType(type: Type) {
  return (type.flags & ts.TypeFlags.Never) !== 0;
}

export function isNullType(type: Type) {
  return (type.flags & ts.TypeFlags.Null) !== 0;
}

export function isNumberLiteralType(type: Type): type is NumberLiteralType {
  return (type.flags & ts.TypeFlags.NumberLiteral) !== 0;
}

export function isNumberType(type: Type): boolean {
  return (type.flags & ts.TypeFlags.Number) !== 0;
}

export function isObjectLiteralType(type: Type): type is ObjectType {
  return isObjectType(type) && type.symbol.getName() === "__object";
}

export function isObjectType(type: Type): type is ObjectType {
  return (type.flags & ts.TypeFlags.Object) !== 0;
}

export function isPrimitiveType(type: Type): boolean {
  return isNumberType(type) ||
    isStringType(type) ||
    isBooleanType(type) ||
    isBigIntType(type) ||
    isNullType(type) ||
    isUndefinedType(type) ||
    isVoidType(type) ||
    isNeverType(type) ||
    isAnyType(type);
}

export function isStringLiteralType(type: Type): type is StringLiteralType {
  return (type.flags & ts.TypeFlags.StringLiteral) !== 0;
}

export function isStringType(type: Type): boolean {
  return (type.flags & ts.TypeFlags.String) !== 0;
}

export function isThisType(type: Type): boolean {
  // @ts-expect-error - internal API
  return type.isThisType === true;
}

export function isTupleType(type: Type): type is TupleType {
  return isObjectType(type) && (type.objectFlags & ts.ObjectFlags.Tuple) !== 0;
}

export function isTupleTypeReferenceType(type: Type): type is TupleTypeReference {
  return isTypeReferenceType(type) && isTupleType(type.target);
}

export function isType(typeNodeOrSymbolOrDeclarationOrType: Declaration | Symbol | Type | TypeNode): typeNodeOrSymbolOrDeclarationOrType is Type {
  return !isSymbol(typeNodeOrSymbolOrDeclarationOrType) && !isDeclaration(typeNodeOrSymbolOrDeclarationOrType) && !isTypeNode(typeNodeOrSymbolOrDeclarationOrType);
}

export function isTypeLiteralType(type: Type): type is ObjectType {
  return isObjectType(type) && type.symbol.getName() === "__type";
}

export function isTypeParameterType(type: Type): type is TypeParameter {
  return (type.flags & ts.TypeFlags.TypeParameter) !== 0;
}

export function isTypeReferenceType(type: Type): type is TypeReference {
  return isObjectType(type) && (type.objectFlags & ts.ObjectFlags.Reference) !== 0;
}

export function isUndefinedType(type: Type) {
  return (type.flags & ts.TypeFlags.Undefined) !== 0;
}

export function isUnionType(type: Type): type is UnionType {
  return (type.flags & ts.TypeFlags.Union) !== 0;
}

export function isUnknownType(type: Type) {
  return (type.flags & ts.TypeFlags.Unknown) !== 0;
}

export function isVoidType(type: Type) {
  return (type.flags & ts.TypeFlags.Void) !== 0;
}
