import { isConstructorDeclaration } from "unwritten:interpreter:typeguards/declarations.js";

import type { Declaration, Node, Symbol, Type } from "typescript";

import type { Name } from "unwritten:interpreter:type-definitions/shared.js";
import type { InterpreterContext } from "unwritten:type-definitions/context.js";


export function getNameBySymbol(ctx: InterpreterContext, symbol: Symbol): Name {
  return symbol.getName();
}


export function getNameByDeclaration(ctx: InterpreterContext, declaration: Declaration): Name | undefined {

  const { ts } = ctx.dependencies;

  if(isConstructorDeclaration(ctx, declaration)){
    return "constructor";
  }

  const symbol = ctx.checker.getSymbolAtLocation(declaration);
  return ts.getNameOfDeclaration(declaration)?.getText() ?? (symbol && getNameBySymbol(ctx, symbol));

}


export function getNameByType(ctx: InterpreterContext, type: Type): Name | undefined {
  const symbol = type.getSymbol();
  return symbol ? getNameBySymbol(ctx, symbol) : undefined;
}


export function getNameByTypeNode(ctx: InterpreterContext, typeNode: Node): Name | undefined {
  return typeNode.getText();
}
