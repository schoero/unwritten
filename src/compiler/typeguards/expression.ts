import ts from "typescript";


export function isExpressionWithTypeArguments(node: ts.Node): node is ts.ExpressionWithTypeArguments {
  return node.kind === ts.SyntaxKind.ExpressionWithTypeArguments;
}
