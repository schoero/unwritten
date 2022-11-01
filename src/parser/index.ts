import { Program, Symbol } from "typescript";
import { assert } from "vitest";

import { Cache } from "../compiler/cache/index.js";
import { createTypeAliasBySymbol } from "../compiler/types/alias.js";
import { createClassBySymbol } from "../compiler/types/class.js";
import { createEnumBySymbol } from "../compiler/types/enum.js";
import { createFunctionBySymbol } from "../compiler/types/function.js";
import { createInterfaceBySymbol } from "../compiler/types/interface.js";
import { createNamespaceBySymbol } from "../compiler/types/namespace.js";
import { createTypeParameterBySymbol } from "../compiler/types/type-parameter.js";
import { createVariableBySymbol } from "../compiler/types/variable.js";
import { resolveSymbolInCaseOfImport } from "../compiler/utils/ts.js";
import { error } from "../log/index.js";
import {
  isClassSymbol,
  isEnumSymbol,
  isFunctionSymbol,
  isInterfaceSymbol,
  isNamespaceSymbol,
  isSourceFileSymbol,
  isTypeAliasSymbol,
  isTypeParameterSymbol,
  isVariableSymbol
} from "../typeguards/ts.js";
import { isExportableType } from "../typeguards/types.js";
import { CompilerContext } from "../types/context.js";
import { ExportableTypes, Types } from "../types/types.js";


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
      assert(isExportableType(parsedSymbol), "Parsed symbol is not an exportable type");
      parsedSymbols.push(parsedSymbol);

      return parsedSymbols;

    }, <ExportableTypes[]>[]);

}

/**
 * Parses a TypeScript symbol.
 * This is the main entry point for parsing a TypeScript symbol.
 * @param ctx Compiler context
 * @param symbol File symbol
 * @returns Parsed symbol
 */
export function parseSymbol(ctx: CompilerContext, symbol: Symbol): Types {

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

  } else if(isEnumSymbol(resolvedSymbol)){

    return createEnumBySymbol(ctx, resolvedSymbol);

  } else if(isNamespaceSymbol(symbol) && isSourceFileSymbol(resolvedSymbol)){

    return createNamespaceBySymbol(ctx, symbol);

  } else if(isTypeParameterSymbol(symbol)){

    return createTypeParameterBySymbol(ctx, symbol);

  }

  throw error(`Symbol ${resolvedSymbol.getName()} is not supported`);

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
