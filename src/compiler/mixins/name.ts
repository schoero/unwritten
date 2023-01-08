import ts from "typescript";

import { isConstructorDeclaration } from "quickdoks:compiler:typeguards/declarations.js";

import type { Declaration, Node, Symbol, Type } from "typescript";

import type { Name } from "quickdoks:compiler:type-definitions/mixins.d.js";
import type { CompilerContext } from "quickdoks:type-definitions/context.d.js";


export function getNameBySymbol(ctx: CompilerContext, symbol: Symbol): Name {
  return symbol.getName();
}


export function getNameByDeclaration(ctx: CompilerContext, declaration: Declaration): Name | undefined {

  if(isConstructorDeclaration(declaration)){
    return "constructor";
  }

  const symbol = ctx.checker.getSymbolAtLocation(declaration);
  return ts.getNameOfDeclaration(declaration)?.getText() ?? (symbol && getNameBySymbol(ctx, symbol));

}


export function getNameByType(ctx: CompilerContext, type: Type): Name | undefined {
  const symbol = type.getSymbol();
  return symbol ? getNameBySymbol(ctx, symbol) : undefined;
}


export function getNameByTypeNode(ctx: CompilerContext, typeNode: Node): Name | undefined {
  return typeNode.getText();
}
