import ts, { Declaration, Symbol, Type } from "typescript";

import { isConstructorDeclaration } from "../../typeguards/ts.js";


export function getNameBySymbol(symbol: Symbol): string {
  return symbol.getName();
}


export function getNameByDeclaration(declaration: Declaration): string | undefined {

  if(isConstructorDeclaration(declaration)){
    return "constructor";
  }

  return ts.getNameOfDeclaration(declaration)?.getText();

}


export function getNameByType(type: Type): string | undefined {
  const symbol = type.getSymbol();
  return symbol ? getNameBySymbol(symbol) : undefined;
}