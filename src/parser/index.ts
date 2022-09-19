import { Program, Symbol } from "typescript";
import { assert } from "vitest";

import { cacheSymbol, createSymbolCache } from "../compiler/cache/index.js";
import { getContext } from "../compiler/context/index.js";
import { createClassBySymbol } from "../compiler/types/class.js";
import { createFunctionBySymbol } from "../compiler/types/function.js";
import { createInterfaceBySymbol } from "../compiler/types/interface.js";
import { createTypeAliasBySymbol } from "../compiler/types/type-alias.js";
import { createVariableBySymbol } from "../compiler/types/variable.js";
import {
  isClassSymbol,
  isFunctionSymbol,
  isInterfaceSymbol,
  isTypeAliasSymbol,
  isVariableSymbol
} from "../typeguards/ts.js";
import { Entities } from "../types/types.js";
import { resolveSymbolInCaseOfImport } from "../utils/ts.js";


export function parse(moduleOrNamespaceSymbol: Symbol) {
  return createSymbolCache(() => getExportedSymbols(moduleOrNamespaceSymbol).map(cacheSymbol).reduce((parsedSymbols, exportedSymbol) => {
    const parsedSymbol = parseSymbol(exportedSymbol);
    if(parsedSymbol){
      parsedSymbols.push(parsedSymbol);
    }
    return parsedSymbols;
  }, <Entities[]>[]));
}


export function parseSymbol(symbol: Symbol): Entities | undefined {

  const resolvedSymbol = resolveSymbolInCaseOfImport(symbol);

  if(isVariableSymbol(resolvedSymbol)){
    return createVariableBySymbol(resolvedSymbol);
  } else if(isFunctionSymbol(resolvedSymbol)){
    return createFunctionBySymbol(resolvedSymbol);
  } else if(isClassSymbol(resolvedSymbol)){
    return createClassBySymbol(resolvedSymbol);
  } else if(isInterfaceSymbol(resolvedSymbol)){
    return createInterfaceBySymbol(resolvedSymbol);
  } else if(isTypeAliasSymbol(resolvedSymbol)){
    return createTypeAliasBySymbol(resolvedSymbol);
  }

}

export function getEntryFileSymbolFromProgram(program: Program) {

  const rootFileName = program.getRootFileNames()[0];

  assert(rootFileName, "Root file not found.");

  const entryFile = program.getSourceFile(rootFileName);

  assert(entryFile, "Entry file not found.");

  const entryFileSymbol = getContext().checker.getSymbolAtLocation(entryFile);

  assert(entryFileSymbol, "Entry file symbol not found.");

  return entryFileSymbol;

}

function getExportedSymbols(moduleSymbol: Symbol, exclude?: string[]) {
  const name = moduleSymbol.getName();
  const resolvedSymbol = resolveSymbolInCaseOfImport(moduleSymbol);
  const exportedSymbols = getContext().checker.getExportsOfModule(resolvedSymbol);
  return exportedSymbols;
}