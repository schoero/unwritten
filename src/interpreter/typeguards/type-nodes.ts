import ts from "typescript";

import type {
  ArrayTypeNode,
  ConditionalTypeNode,
  Declaration,
  ExpressionWithTypeArguments,
  IndexedAccessTypeNode,
  MappedTypeNode,
  OptionalTypeNode,
  RestTypeNode,
  Symbol,
  TemplateLiteralTypeNode,
  TupleTypeNode,
  Type,
  TypeNode,
  TypeReferenceNode
} from "typescript";


export function isArrayTypeNode(typeNode: TypeNode): typeNode is ArrayTypeNode {
  return ts.isArrayTypeNode(typeNode);
}

export function isArrayTypeReferenceTypeNode(typeNode: TypeNode): typeNode is TypeReferenceNode {
  return isTypeReferenceNode(typeNode) && typeNode.typeName.getText() === "Array" && typeNode.typeArguments?.length === 1;
}

export function isConditionalTypeNode(typeNode: TypeNode): typeNode is ConditionalTypeNode {
  return ts.isConditionalTypeNode(typeNode);
}

export function isExpressionWithTypeArguments(node: TypeNode): node is ExpressionWithTypeArguments {
  return ts.isExpressionWithTypeArguments(node);
}

export function isIndexedAccessTypeNode(node: TypeNode): node is IndexedAccessTypeNode {
  return ts.isIndexedAccessTypeNode(node);
}

export function isMappedTypeNode(typeNode: TypeNode): typeNode is MappedTypeNode {
  return ts.isMappedTypeNode(typeNode);
}

export function isOptionalTypeNode(node: TypeNode): node is OptionalTypeNode {
  return ts.isOptionalTypeNode(node);
}

export function isRestTypeNode(typeNode: TypeNode): typeNode is RestTypeNode {
  return ts.isRestTypeNode(typeNode);
}

export function isTemplateLiteralTypeNode(typeNode: TypeNode): typeNode is TemplateLiteralTypeNode {
  return ts.isTemplateLiteralTypeNode(typeNode);
}

export function isThisTypeNode(typeNode: TypeNode): boolean {
  return ts.isThisTypeNode(typeNode);
}

export function isTupleTypeNode(typeNode: TypeNode): typeNode is TupleTypeNode {
  return ts.isTupleTypeNode(typeNode);
}

export function isTypeNode(typeNodeOrSymbolOrDeclarationOrType: Declaration | Symbol | Type | TypeNode): typeNodeOrSymbolOrDeclarationOrType is TypeNode {
  return "kind" in typeNodeOrSymbolOrDeclarationOrType && ts.isTypeNode(typeNodeOrSymbolOrDeclarationOrType);
}

export function isTypeQueryNode(node: ts.Node): node is ts.TypeQueryNode {
  return ts.isTypeQueryNode(node);
}

export function isTypeReferenceNode(typeNode: TypeNode): typeNode is TypeReferenceNode {
  return ts.isTypeReferenceNode(typeNode);
}

export function isUnionTypeNode(node: ts.Node): node is ts.UnionTypeNode {
  return ts.isUnionTypeNode(node);
}
