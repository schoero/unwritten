import ts, { Declaration, FunctionLikeDeclaration, Type, TypeNode } from "typescript";

import { isTypeNode } from "./type-nodes.js";


export function isArrowFunctionDeclaration(declaration: Declaration): declaration is ts.ArrowFunction {
  return ts.isArrowFunction(declaration);
}

export function isCallSignatureDeclaration(declaration: Declaration): declaration is ts.CallSignatureDeclaration {
  return ts.isCallSignatureDeclaration(declaration);
}

export function isClassDeclaration(declaration: Declaration): declaration is ts.ClassDeclaration {
  return ts.isClassDeclaration(declaration);
}

export function isConstructSignatureDeclaration(declaration: Declaration): declaration is ts.ConstructSignatureDeclaration {
  return ts.isConstructSignatureDeclaration(declaration);
}

export function isConstructorDeclaration(declaration: Declaration): declaration is ts.ConstructorDeclaration {
  return ts.isConstructorDeclaration(declaration);
}

export function isDeclaration(typeNodeOrSymbolOrDeclarationOrType: Declaration | Symbol | Type | TypeNode): typeNodeOrSymbolOrDeclarationOrType is Declaration {
  return "getText" in typeNodeOrSymbolOrDeclarationOrType && !isTypeNode(typeNodeOrSymbolOrDeclarationOrType);
}

export function isEnumDeclaration(declaration: Declaration): declaration is ts.EnumDeclaration {
  return ts.isEnumDeclaration(declaration);
}

export function isEnumMemberDeclaration(declaration: Declaration): declaration is ts.EnumMember {
  return ts.isEnumMember(declaration);
}

export function isFunctionDeclaration(declaration: Declaration): declaration is ts.FunctionDeclaration {
  return ts.isFunctionDeclaration(declaration);
}

export function isFunctionLikeDeclaration(declaration: Declaration): declaration is FunctionLikeDeclaration {
  return isFunctionDeclaration(declaration) ||
    isMethodDeclaration(declaration) ||
    isConstructorDeclaration(declaration) ||
    isGetterDeclaration(declaration) ||
    isSetterDeclaration(declaration) ||
    isArrowFunctionDeclaration(declaration) ||
    ts.isFunctionExpression(declaration);
}

export function isGetterDeclaration(declaration: Declaration): declaration is ts.GetAccessorDeclaration {
  return ts.isGetAccessorDeclaration(declaration);
}

export function isGetterSignatureDeclaration(declaration: Declaration): declaration is ts.GetAccessorDeclaration {
  return ts.isGetAccessorDeclaration(declaration);
}

export function isInterfaceDeclaration(declaration: Declaration): declaration is ts.InterfaceDeclaration {
  return ts.isInterfaceDeclaration(declaration);
}

export function isMethodDeclaration(declaration: Declaration): declaration is ts.MethodDeclaration {
  return ts.isMethodDeclaration(declaration);
}

export function isMethodSignatureDeclaration(declaration: Declaration): declaration is ts.MethodSignature {
  return ts.isMethodSignature(declaration);
}

export function isModuleDeclaration(declaration: ts.Declaration): declaration is ts.ModuleDeclaration {
  return ts.isModuleDeclaration(declaration);
}

export function isNamespaceDeclaration(declaration: ts.Declaration): declaration is ts.NamespaceDeclaration {
  return ts.isNamespaceExport(declaration);
}

export function isObjectLiteralExpression(declaration: ts.Declaration): declaration is ts.ObjectLiteralExpression {
  return ts.isObjectLiteralExpression(declaration);
}

export function isObjectTypeDeclaration(declaration: ts.Declaration): declaration is ts.ObjectTypeDeclaration {
  return ts.isClassDeclaration(declaration) ||
    isInterfaceDeclaration(declaration) ||
    ts.isTypeLiteralNode(declaration);
}

export function isParameterDeclaration(declaration: ts.Declaration): declaration is ts.ParameterDeclaration {
  return ts.isParameter(declaration);
}

export function isPropertyAssignment(declaration: Declaration): declaration is ts.PropertyAssignment {
  return ts.isPropertyAssignment(declaration);
}

export function isPropertyDeclaration(declaration: Declaration): declaration is ts.PropertyDeclaration {
  return ts.isPropertyDeclaration(declaration);
}

export function isPropertySignatureDeclaration(declaration: Declaration): declaration is ts.PropertySignature {
  return ts.isPropertySignature(declaration);
}

export function isSetterDeclaration(declaration: Declaration): declaration is ts.SetAccessorDeclaration {
  return ts.isSetAccessorDeclaration(declaration);
}

export function isSetterSignatureDeclaration(declaration: Declaration): declaration is ts.SetAccessorDeclaration {
  return ts.isSetAccessorDeclaration(declaration);
}

export function isSourceFileDeclaration(declaration: ts.Declaration): declaration is ts.SourceFile {
  return ts.isSourceFile(declaration);
}

export function isTypeAliasDeclaration(declaration: Declaration): declaration is ts.TypeAliasDeclaration {
  return ts.isTypeAliasDeclaration(declaration);
}

export function isTypeElement(declaration: Declaration): declaration is ts.TypeElement {
  return ts.isTypeElement(declaration);
}

export function isTypeLiteralDeclaration(declaration: Declaration): declaration is ts.TypeLiteralNode {
  return ts.isTypeLiteralNode(declaration);
}

export function isTypeParameterDeclaration(declaration: Declaration): declaration is ts.TypeParameterDeclaration {
  return ts.isTypeParameterDeclaration(declaration);
}

export function isVariableDeclaration(declaration: Declaration): declaration is ts.VariableDeclaration {
  return ts.isVariableDeclaration(declaration);
}
