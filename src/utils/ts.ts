import ts, { Declaration, Symbol } from "typescript";

import { getContext } from "../compiler/context/index.js";
import { isAliasedSymbol } from "../typeguards/ts.js";


/**
 * Resolves symbols from imports to their actual symbols.
 */
export function resolveSymbolInCaseOfImport(symbol: Symbol): Symbol {
  if(isAliasedSymbol(symbol)){
    return getContext().checker.getAliasedSymbol(symbol);
  }
  return symbol;
}


export function isSymbolExported(symbol: Symbol) {

  const declaration = symbol.getDeclarations()?.[0];

  if(declaration === undefined){
    return false;
  }

  return isDeclarationExported(declaration);

}

export function isDeclarationExported(declaration: Declaration) {
  return declaration.modifiers?.some(modifier => modifier.kind === ts.SyntaxKind.ExportKeyword);
}