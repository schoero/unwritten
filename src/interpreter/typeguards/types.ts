import { isDeclaration } from "unwritten:interpreter:typeguards/declarations";
import { isSymbol } from "unwritten:interpreter:typeguards/symbols";
import { isTypeNode } from "unwritten:interpreter:typeguards/type-nodes";

import type {
  BigIntLiteralType,
  ConditionalType,
  Declaration,
  GenericType,
  IndexedAccessType,
  InterfaceType,
  IntersectionType,
  LiteralType,
  NamedTupleMember,
  NumberLiteralType,
  ObjectType,
  StringLiteralType,
  Symbol,
  TupleType,
  TupleTypeReference,
  Type,
  TypeNode,
  TypeParameter,
  TypeReference,
  UnionType
} from "typescript";

import type { InterpreterContext } from "unwritten:type-definitions/context";


export function isAnonymousType(ctx: InterpreterContext, type: Type) {
  const { ts } = ctx.dependencies;
  return isObjectType(ctx, type) && (type.objectFlags & ts.ObjectFlags.Anonymous) !== 0;
}

export function isAnyType(ctx: InterpreterContext, type: Type) {
  const { ts } = ctx.dependencies;
  return (type.flags & ts.TypeFlags.Any) !== 0;
}

export function isArrayTypeReferenceType(ctx: InterpreterContext, type: Type): type is TypeReference {
  const { ts } = ctx.dependencies;
  return isTypeReferenceType(ctx, type) && type.target.symbol.getName() === "Array" && type.target.typeParameters?.length === 1;
}

export function isBigIntLiteralType(ctx: InterpreterContext, type: Type): type is BigIntLiteralType {
  const { ts } = ctx.dependencies;
  return (type.flags & ts.TypeFlags.BigIntLiteral) !== 0;
}

export function isBigIntType(ctx: InterpreterContext, type: Type): boolean {
  const { ts } = ctx.dependencies;
  return (type.flags & ts.TypeFlags.BigInt) !== 0;
}

export function isBooleanLiteralType(ctx: InterpreterContext, type: Type): type is LiteralType {
  const { ts } = ctx.dependencies;
  return (type.flags & ts.TypeFlags.BooleanLiteral) !== 0;
}

export function isBooleanType(ctx: InterpreterContext, type: Type): boolean {
  const { ts } = ctx.dependencies;
  return (type.flags & ts.TypeFlags.Boolean) !== 0;
}

export function isClassOrInterfaceType(ctx: InterpreterContext, type: Type): type is InterfaceType {
  const { ts } = ctx.dependencies;
  return isObjectType(ctx, type) &&
    (type.objectFlags & ts.ObjectFlags.ClassOrInterface) !== 0;
}

export function isClassType(ctx: InterpreterContext, type: Type): type is InterfaceType {
  const { ts } = ctx.dependencies;
  return isObjectType(ctx, type) && (type.objectFlags & ts.ObjectFlags.Class) !== 0;
}

export function isConditionalType(ctx: InterpreterContext, type: Type): type is ConditionalType {
  const { ts } = ctx.dependencies;
  return (type.flags & ts.TypeFlags.Conditional) !== 0;
}

export function isEnumType(ctx: InterpreterContext, type: Type): boolean {
  const { ts } = ctx.dependencies;
  return (type.flags & ts.TypeFlags.Enum) !== 0;
}

export function isErrorType(ctx: InterpreterContext, type: Type): boolean {
  const { ts } = ctx.dependencies;
  return (type.flags & ts.TypeFlags.Any) !== 0 &&
    "intrinsicName" in type && type.intrinsicName === "error";
}

export function isFunctionLikeType(ctx: InterpreterContext, type: Type): boolean {
  const { ts } = ctx.dependencies;
  return isObjectType(ctx, type) &&
    type.getCallSignatures().length > 0 &&
      type.getConstructSignatures().length === 0 &&
        type.getProperties().length === 0;
}

export function isGenericType(ctx: InterpreterContext, type: Type): type is GenericType {
  const { ts } = ctx.dependencies;
  return isObjectType(ctx, type) &&
    (type.objectFlags & ts.ObjectFlags.ClassOrInterface) !== 0 &&
    (type.objectFlags & ts.ObjectFlags.Reference) !== 0;
}

export function isIndexedAccessType(ctx: InterpreterContext, type: Type): type is IndexedAccessType {
  const { ts } = ctx.dependencies;
  return (type.flags & ts.TypeFlags.IndexedAccess) !== 0;
}

export function isInstanceType(ctx: InterpreterContext, type: Type): type is TypeReference {
  const { ts } = ctx.dependencies;
  return isObjectType(ctx, type) && (type.objectFlags & ts.ObjectFlags.Reference) !== 0 &&
    ((type.objectFlags & ts.ObjectFlags.Instantiated) !== 0 ||
    (type.objectFlags & ts.ObjectFlags.InstantiationExpressionType) !== 0);
}

export function isInterfaceType(ctx: InterpreterContext, type: Type): type is InterfaceType {
  const { ts } = ctx.dependencies;
  return isObjectType(ctx, type) &&
    (type.objectFlags & ts.ObjectFlags.Interface) !== 0;
}

export function isIntersectionType(ctx: InterpreterContext, type: Type): type is IntersectionType {
  const { ts } = ctx.dependencies;
  return (type.flags & ts.TypeFlags.Intersection) !== 0;
}

export function isLiteralType(ctx: InterpreterContext, type: Type): type is LiteralType {
  const { ts } = ctx.dependencies;
  return (type.flags & (ts.TypeFlags.StringOrNumberLiteral | ts.TypeFlags.BigIntLiteral | ts.TypeFlags.BooleanLiteral)) !== 0;
}

export function isMappedType(ctx: InterpreterContext, type: Type): boolean {
  const { ts } = ctx.dependencies;
  return isObjectType(ctx, type) && (type.objectFlags & ts.ObjectFlags.Mapped) !== 0;
}

export function isNamedTupleMember(ctx: InterpreterContext, member: NamedTupleMember | TypeNode): member is NamedTupleMember {
  const { ts } = ctx.dependencies;
  return ts.isNamedTupleMember(member);
}

export function isNeverType(ctx: InterpreterContext, type: Type) {
  const { ts } = ctx.dependencies;
  return (type.flags & ts.TypeFlags.Never) !== 0;
}

export function isNullType(ctx: InterpreterContext, type: Type) {
  const { ts } = ctx.dependencies;
  return (type.flags & ts.TypeFlags.Null) !== 0;
}

export function isNumberLiteralType(ctx: InterpreterContext, type: Type): type is NumberLiteralType {
  const { ts } = ctx.dependencies;
  return (type.flags & ts.TypeFlags.NumberLiteral) !== 0;
}

export function isNumberType(ctx: InterpreterContext, type: Type): boolean {
  const { ts } = ctx.dependencies;
  return (type.flags & ts.TypeFlags.Number) !== 0;
}

export function isObjectLiteralType(ctx: InterpreterContext, type: Type): type is ObjectType {
  const { ts } = ctx.dependencies;
  return isObjectType(ctx, type) && type.symbol.getName() === "__object";
}

export function isObjectType(ctx: InterpreterContext, type: Type): type is ObjectType {
  const { ts } = ctx.dependencies;
  return (type.flags & ts.TypeFlags.Object) !== 0;
}

export function isPrimitiveType(ctx: InterpreterContext, type: Type): boolean {
  return isNumberType(ctx, type) ||
    isStringType(ctx, type) ||
    isBooleanType(ctx, type) ||
    isBigIntType(ctx, type) ||
    isNullType(ctx, type) ||
    isUndefinedType(ctx, type) ||
    isVoidType(ctx, type) ||
    isNeverType(ctx, type) ||
    isAnyType(ctx, type);
}

export function isStringLiteralType(ctx: InterpreterContext, type: Type): type is StringLiteralType {
  const { ts } = ctx.dependencies;
  return (type.flags & ts.TypeFlags.StringLiteral) !== 0;
}

export function isStringType(ctx: InterpreterContext, type: Type): boolean {
  const { ts } = ctx.dependencies;
  return (type.flags & ts.TypeFlags.String) !== 0;
}

export function isSymbolType(ctx: InterpreterContext, type: Type) {
  const { ts } = ctx.dependencies;
  return (type.flags & ts.TypeFlags.ESSymbol) !== 0;
}

export function isThisType(ctx: InterpreterContext, type: Type): boolean {
  const { ts } = ctx.dependencies;
  // @ts-expect-error - internal API
  return type.isThisType === true;
}

export function isTupleType(ctx: InterpreterContext, type: Type): type is TupleType {
  const { ts } = ctx.dependencies;
  return isObjectType(ctx, type) && (type.objectFlags & ts.ObjectFlags.Tuple) !== 0;
}

export function isTupleTypeReferenceType(ctx: InterpreterContext, type: Type): type is TupleTypeReference {
  return isTypeReferenceType(ctx, type) && isTupleType(ctx, type.target);
}

export function isType(ctx: InterpreterContext, typeNodeOrSymbolOrDeclarationOrType: Declaration | Symbol | Type | TypeNode): typeNodeOrSymbolOrDeclarationOrType is Type {
  return !isSymbol(ctx, typeNodeOrSymbolOrDeclarationOrType) &&
    !isDeclaration(ctx, typeNodeOrSymbolOrDeclarationOrType) &&
    !isTypeNode(ctx, typeNodeOrSymbolOrDeclarationOrType);
}

export function isTypeLiteralType(ctx: InterpreterContext, type: Type): type is ObjectType {
  return isObjectType(ctx, type) && type.symbol.getName() === "__type";
}

export function isTypeParameterType(ctx: InterpreterContext, type: Type): type is TypeParameter {
  const { ts } = ctx.dependencies;
  return (type.flags & ts.TypeFlags.TypeParameter) !== 0;
}

export function isTypeReferenceType(ctx: InterpreterContext, type: Type): type is TypeReference {
  const { ts } = ctx.dependencies;
  return isObjectType(ctx, type) && (type.objectFlags & ts.ObjectFlags.Reference) !== 0;
}

export function isUndefinedType(ctx: InterpreterContext, type: Type) {
  const { ts } = ctx.dependencies;
  return (type.flags & ts.TypeFlags.Undefined) !== 0;
}

export function isUnionType(ctx: InterpreterContext, type: Type): type is UnionType {
  const { ts } = ctx.dependencies;
  return (type.flags & ts.TypeFlags.Union) !== 0;
}

export function isUnknownType(ctx: InterpreterContext, type: Type) {
  const { ts } = ctx.dependencies;
  return (type.flags & ts.TypeFlags.Unknown) !== 0;
}

export function isVoidType(ctx: InterpreterContext, type: Type) {
  const { ts } = ctx.dependencies;
  return (type.flags & ts.TypeFlags.Void) !== 0;
}
