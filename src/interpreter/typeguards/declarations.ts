import { isTypeNode } from "unwritten:interpreter:typeguards/type-nodes.js";

import type {
  ArrowFunction,
  CallSignatureDeclaration,
  ClassDeclaration,
  ConstructorDeclaration,
  ConstructSignatureDeclaration,
  Declaration,
  EnumDeclaration,
  EnumMember,
  ExportAssignment,
  ExportDeclaration,
  FunctionDeclaration,
  FunctionLikeDeclaration,
  GetAccessorDeclaration,
  InterfaceDeclaration,
  MethodDeclaration,
  MethodSignature,
  ModuleDeclaration,
  NamespaceDeclaration,
  NamespaceExport,
  ObjectLiteralExpression,
  ObjectTypeDeclaration,
  ParameterDeclaration,
  PropertyAssignment,
  PropertyDeclaration,
  PropertySignature,
  SetAccessorDeclaration,
  ShorthandPropertyAssignment,
  SourceFile,
  Symbol,
  Type,
  TypeAliasDeclaration,
  TypeElement,
  TypeLiteralNode,
  TypeNode,
  TypeParameterDeclaration,
  VariableDeclaration
} from "typescript";

import type { InterpreterContext } from "unwritten:type-definitions/context.js";


export function isArrowFunctionDeclaration(ctx: InterpreterContext, declaration: Declaration): declaration is ArrowFunction {
  const { ts } = ctx.dependencies;
  return ts.isArrowFunction(declaration);
}

export function isCallSignatureDeclaration(ctx: InterpreterContext, declaration: Declaration): declaration is CallSignatureDeclaration {
  const { ts } = ctx.dependencies;
  return ts.isCallSignatureDeclaration(declaration);
}

export function isClassDeclaration(ctx: InterpreterContext, declaration: Declaration): declaration is ClassDeclaration {
  const { ts } = ctx.dependencies;
  return ts.isClassDeclaration(declaration);
}

export function isConstructSignatureDeclaration(ctx: InterpreterContext, declaration: Declaration): declaration is ConstructSignatureDeclaration {
  const { ts } = ctx.dependencies;
  return ts.isConstructSignatureDeclaration(declaration);
}

export function isConstructorDeclaration(ctx: InterpreterContext, declaration: Declaration): declaration is ConstructorDeclaration {
  const { ts } = ctx.dependencies;
  return ts.isConstructorDeclaration(declaration);
}

export function isDeclaration(ctx: InterpreterContext, typeNodeOrSymbolOrDeclarationOrType: Declaration | Symbol | Type | TypeNode): typeNodeOrSymbolOrDeclarationOrType is Declaration {
  return "getText" in typeNodeOrSymbolOrDeclarationOrType && !isTypeNode(ctx, typeNodeOrSymbolOrDeclarationOrType);
}

export function isEnumDeclaration(ctx: InterpreterContext, declaration: Declaration): declaration is EnumDeclaration {
  const { ts } = ctx.dependencies;
  return ts.isEnumDeclaration(declaration);
}

export function isEnumMemberDeclaration(ctx: InterpreterContext, declaration: Declaration): declaration is EnumMember {
  const { ts } = ctx.dependencies;
  return ts.isEnumMember(declaration);
}

export function isExportAssignment(ctx: InterpreterContext, declaration: Declaration): declaration is ExportAssignment {
  const { ts } = ctx.dependencies;
  return ts.isExportAssignment(declaration);
}

export function isExportDeclaration(ctx: InterpreterContext, declaration: Declaration): declaration is ExportDeclaration {
  const { ts } = ctx.dependencies;
  return ts.isExportDeclaration(declaration);
}

export function isFunctionDeclaration(ctx: InterpreterContext, declaration: Declaration): declaration is FunctionDeclaration {
  const { ts } = ctx.dependencies;
  return ts.isFunctionDeclaration(declaration);
}

export function isFunctionLikeDeclaration(ctx: InterpreterContext, declaration: Declaration): declaration is FunctionLikeDeclaration {
  const { ts } = ctx.dependencies;
  return isFunctionDeclaration(ctx, declaration) ||
    isMethodDeclaration(ctx, declaration) ||
    isConstructorDeclaration(ctx, declaration) ||
    isGetterDeclaration(ctx, declaration) ||
    isSetterDeclaration(ctx, declaration) ||
    isArrowFunctionDeclaration(ctx, declaration) ||
    ts.isFunctionExpression(declaration);
}

export function isGetterDeclaration(ctx: InterpreterContext, declaration: Declaration): declaration is GetAccessorDeclaration {
  const { ts } = ctx.dependencies;
  return ts.isGetAccessorDeclaration(declaration);
}

export function isInterfaceDeclaration(ctx: InterpreterContext, declaration: Declaration): declaration is InterfaceDeclaration {
  const { ts } = ctx.dependencies;
  return ts.isInterfaceDeclaration(declaration);
}

export function isMethodDeclaration(ctx: InterpreterContext, declaration: Declaration): declaration is MethodDeclaration {
  const { ts } = ctx.dependencies;
  return ts.isMethodDeclaration(declaration);
}

export function isMethodSignatureDeclaration(ctx: InterpreterContext, declaration: Declaration): declaration is MethodSignature {
  const { ts } = ctx.dependencies;
  return ts.isMethodSignature(declaration);
}

export function isModuleDeclaration(ctx: InterpreterContext, declaration: Declaration): declaration is ModuleDeclaration {
  const { ts } = ctx.dependencies;
  return ts.isModuleDeclaration(declaration);
}

export function isNamespaceDeclaration(ctx: InterpreterContext, declaration: Declaration): declaration is NamespaceDeclaration {
  const { ts } = ctx.dependencies;
  return ts.isNamespaceExport(declaration);
}

export function isNamespaceExport(ctx: InterpreterContext, declaration: Declaration): declaration is NamespaceExport {
  const { ts } = ctx.dependencies;
  return ts.isNamespaceExport(declaration);
}

export function isObjectLiteralExpression(ctx: InterpreterContext, declaration: Declaration): declaration is ObjectLiteralExpression {
  const { ts } = ctx.dependencies;
  return ts.isObjectLiteralExpression(declaration);
}

export function isObjectTypeDeclaration(ctx: InterpreterContext, declaration: Declaration): declaration is ObjectTypeDeclaration {
  const { ts } = ctx.dependencies;
  return ts.isClassDeclaration(declaration) ||
    isInterfaceDeclaration(ctx, declaration) ||
    ts.isTypeLiteralNode(declaration);
}

export function isParameterDeclaration(ctx: InterpreterContext, declaration: Declaration): declaration is ParameterDeclaration {
  const { ts } = ctx.dependencies;
  return ts.isParameter(declaration);
}

export function isPropertyAssignment(ctx: InterpreterContext, declaration: Declaration): declaration is PropertyAssignment {
  const { ts } = ctx.dependencies;
  return ts.isPropertyAssignment(declaration);
}

export function isPropertyDeclaration(ctx: InterpreterContext, declaration: Declaration): declaration is PropertyDeclaration {
  const { ts } = ctx.dependencies;
  return ts.isPropertyDeclaration(declaration);
}

export function isPropertySignatureDeclaration(ctx: InterpreterContext, declaration: Declaration): declaration is PropertySignature {
  const { ts } = ctx.dependencies;
  return ts.isPropertySignature(declaration);
}

export function isSetterDeclaration(ctx: InterpreterContext, declaration: Declaration): declaration is SetAccessorDeclaration {
  const { ts } = ctx.dependencies;
  return ts.isSetAccessorDeclaration(declaration);
}

export function isShorthandPropertyAssignment(ctx: InterpreterContext, declaration: Declaration): declaration is ShorthandPropertyAssignment {
  const { ts } = ctx.dependencies;
  return ts.isShorthandPropertyAssignment(declaration);
}

export function isSourceFileDeclaration(ctx: InterpreterContext, declaration: Declaration): declaration is SourceFile {
  const { ts } = ctx.dependencies;
  return ts.isSourceFile(declaration);
}

export function isTypeAliasDeclaration(ctx: InterpreterContext, declaration: Declaration): declaration is TypeAliasDeclaration {
  const { ts } = ctx.dependencies;
  return ts.isTypeAliasDeclaration(declaration);
}

export function isTypeElement(ctx: InterpreterContext, declaration: Declaration): declaration is TypeElement {
  const { ts } = ctx.dependencies;
  return ts.isTypeElement(declaration);
}

export function isTypeLiteralDeclaration(ctx: InterpreterContext, declaration: Declaration): declaration is TypeLiteralNode {
  const { ts } = ctx.dependencies;
  return ts.isTypeLiteralNode(declaration);
}

export function isTypeParameterDeclaration(ctx: InterpreterContext, declaration: Declaration): declaration is TypeParameterDeclaration {
  const { ts } = ctx.dependencies;
  return ts.isTypeParameterDeclaration(declaration);
}

export function isVariableDeclaration(ctx: InterpreterContext, declaration: Declaration): declaration is VariableDeclaration {
  const { ts } = ctx.dependencies;
  return ts.isVariableDeclaration(declaration);
}
