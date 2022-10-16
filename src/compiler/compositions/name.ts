import ts, { Declaration, Symbol, Type, TypeNode } from "typescript";

import { isConstructorDeclaration } from "../../typeguards/ts.js";
import { Name } from "../../types/compositions.js";
import { CompilerContext } from "../../types/context.js";


export function getNameBySymbol(ctx: CompilerContext, symbol: Symbol): Name {
  return symbol.getName();
}


export function getNameByDeclaration(ctx: CompilerContext, declaration: Declaration): Name | undefined {

  if(isConstructorDeclaration(declaration)){
    return "constructor";
  }

  return ts.getNameOfDeclaration(declaration)?.getText();

}


export function getNameByType(ctx: CompilerContext, type: Type): Name | undefined {
  const symbol = type.getSymbol();
  return symbol ? getNameBySymbol(ctx, symbol) : undefined;
}


export function getNameByTypeNode(ctx: CompilerContext, typeNode: TypeNode): Name | undefined {
  // @ts-expect-error
  return typeNode.intrinsicName;
}