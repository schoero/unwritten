import { Program, Symbol } from "typescript";
import { assert } from "vitest";

import { Cache } from "../compiler/cache/index.js";
import { createTypeAliasBySymbol } from "../compiler/types/alias.js";
import { createClassBySymbol } from "../compiler/types/class.js";
import { createFunctionBySymbol } from "../compiler/types/function.js";
import { createInterfaceBySymbol } from "../compiler/types/interface.js";
import { createVariableBySymbol } from "../compiler/types/variable.js";
import { resolveSymbolInCaseOfImport } from "../compiler/utils/ts.js";
import {
  isClassSymbol,
  isFunctionSymbol,
  isInterfaceSymbol,
  isTypeAliasSymbol,
  isVariableSymbol
} from "../typeguards/ts.js";
import { CompilerContext } from "../types/context.js";
import { ExportableTypes } from "../types/types.js";


export function parse(ctx: CompilerContext, moduleOrNamespaceSymbol: Symbol): ExportableTypes[] {


  //-- Create new context

  const newCtx = {
    ...ctx,
    cache: new Cache()
  };

  return getExportedSymbols(newCtx, moduleOrNamespaceSymbol)
    .map(symbol => newCtx.cache.cacheSymbol(newCtx, symbol))
    .reduce((parsedSymbols, exportedSymbol) => {
      const parsedSymbol = parseSymbol(newCtx, exportedSymbol);
      if(parsedSymbol){
        parsedSymbols.push(parsedSymbol);
      }
      return parsedSymbols;
    }, <ExportableTypes[]>[]);

}


export function parseSymbol(ctx: CompilerContext, symbol: Symbol): ExportableTypes | undefined {

  const resolvedSymbol = resolveSymbolInCaseOfImport(ctx, symbol);

  if(isVariableSymbol(resolvedSymbol)){
    return createVariableBySymbol(ctx, resolvedSymbol);
  } else if(isFunctionSymbol(resolvedSymbol)){
    return createFunctionBySymbol(ctx, resolvedSymbol);
  } else if(isClassSymbol(resolvedSymbol)){
    return createClassBySymbol(ctx, resolvedSymbol);
  } else if(isInterfaceSymbol(resolvedSymbol)){
    return createInterfaceBySymbol(ctx, resolvedSymbol);
  } else if(isTypeAliasSymbol(resolvedSymbol)){
    return createTypeAliasBySymbol(ctx, resolvedSymbol);
  }

}

export function getEntryFileSymbolFromProgram(ctx: CompilerContext, program: Program) {

  const rootFileName = program.getRootFileNames()[0];

  assert(rootFileName, "Root file not found.");

  const entryFile = program.getSourceFile(rootFileName);

  assert(entryFile, `Entry file not found. ${rootFileName}`);

  const entryFileSymbol = ctx.checker.getSymbolAtLocation(entryFile);

  assert(entryFileSymbol, "Entry file symbol not found.");

  return entryFileSymbol;

}

function getExportedSymbols(ctx: CompilerContext, moduleSymbol: Symbol, exclude?: string[]) {
  const name = moduleSymbol.getName();
  const resolvedSymbol = resolveSymbolInCaseOfImport(ctx, moduleSymbol);
  const exportedSymbols = ctx.checker.getExportsOfModule(resolvedSymbol);
  return exportedSymbols;
}