import type {
  ArrayTypeNode,
  ConditionalTypeNode,
  Declaration,
  ExpressionWithTypeArguments,
  IndexedAccessTypeNode,
  MappedTypeNode,
  Node,
  OptionalTypeNode,
  RestTypeNode,
  Symbol,
  TemplateLiteralTypeNode,
  TupleTypeNode,
  Type,
  TypeNode,
  TypeQueryNode,
  TypeReferenceNode,
  UnionTypeNode
} from "typescript";

import type { InterpreterContext } from "unwritten:type-definitions/context.js";


export function isArrayTypeNode(ctx: InterpreterContext, typeNode: TypeNode): typeNode is ArrayTypeNode {
  const { ts } = ctx.dependencies;
  return ts.isArrayTypeNode(typeNode);
}

export function isArrayTypeReferenceTypeNode(ctx: InterpreterContext, typeNode: TypeNode): typeNode is TypeReferenceNode {
  const { ts } = ctx.dependencies;
  return isTypeReferenceNode(ctx, typeNode) && typeNode.typeName.getText() === "Array" && typeNode.typeArguments?.length === 1;
}

export function isConditionalTypeNode(ctx: InterpreterContext, typeNode: TypeNode): typeNode is ConditionalTypeNode {
  const { ts } = ctx.dependencies;
  return ts.isConditionalTypeNode(typeNode);
}

export function isExpressionWithTypeArguments(ctx: InterpreterContext, node: TypeNode): node is ExpressionWithTypeArguments {
  const { ts } = ctx.dependencies;
  return ts.isExpressionWithTypeArguments(node);
}

export function isIndexedAccessTypeNode(ctx: InterpreterContext, node: TypeNode): node is IndexedAccessTypeNode {
  const { ts } = ctx.dependencies;
  return ts.isIndexedAccessTypeNode(node);
}

export function isMappedTypeNode(ctx: InterpreterContext, typeNode: TypeNode): typeNode is MappedTypeNode {
  const { ts } = ctx.dependencies;
  return ts.isMappedTypeNode(typeNode);
}

export function isOptionalTypeNode(ctx: InterpreterContext, node: TypeNode): node is OptionalTypeNode {
  const { ts } = ctx.dependencies;
  return ts.isOptionalTypeNode(node);
}

export function isRestTypeNode(ctx: InterpreterContext, typeNode: TypeNode): typeNode is RestTypeNode {
  const { ts } = ctx.dependencies;
  return ts.isRestTypeNode(typeNode);
}

export function isTemplateLiteralTypeNode(ctx: InterpreterContext, typeNode: TypeNode): typeNode is TemplateLiteralTypeNode {
  const { ts } = ctx.dependencies;
  return ts.isTemplateLiteralTypeNode(typeNode);
}

export function isThisTypeNode(ctx: InterpreterContext, typeNode: TypeNode): boolean {
  const { ts } = ctx.dependencies;
  return ts.isThisTypeNode(typeNode);
}

export function isTupleTypeNode(ctx: InterpreterContext, typeNode: TypeNode): typeNode is TupleTypeNode {
  const { ts } = ctx.dependencies;
  return ts.isTupleTypeNode(typeNode);
}

export function isTypeNode(ctx: InterpreterContext, typeNodeOrSymbolOrDeclarationOrType: Declaration | Symbol | Type | TypeNode): typeNodeOrSymbolOrDeclarationOrType is TypeNode {
  const { ts } = ctx.dependencies;
  return "kind" in typeNodeOrSymbolOrDeclarationOrType && ts.isTypeNode(typeNodeOrSymbolOrDeclarationOrType);
}

export function isTypeQueryNode(ctx: InterpreterContext, node: Node): node is TypeQueryNode {
  const { ts } = ctx.dependencies;
  return ts.isTypeQueryNode(node);
}

export function isTypeReferenceNode(ctx: InterpreterContext, typeNode: TypeNode): typeNode is TypeReferenceNode {
  const { ts } = ctx.dependencies;
  return ts.isTypeReferenceNode(typeNode);
}

export function isUnionTypeNode(ctx: InterpreterContext, node: Node): node is UnionTypeNode {
  const { ts } = ctx.dependencies;
  return ts.isUnionTypeNode(node);
}
