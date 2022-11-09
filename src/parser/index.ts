import { Program, Symbol } from "typescript";
import { assert } from "vitest";

import { createTypeAliasBySymbol } from "../compiler/entities/alias.js";
import { createClassBySymbol } from "../compiler/entities/class.js";
import { createEnumBySymbol } from "../compiler/entities/enum.js";
import { createFunctionBySymbol } from "../compiler/entities/function.js";
import { createInterfaceBySymbol } from "../compiler/entities/interface.js";
import { createModuleBySymbol } from "../compiler/entities/module.js";
import { createNamespaceBySymbol } from "../compiler/entities/namespace.js";
import { createObjectLiteralBySymbol } from "../compiler/entities/object-literal.js";
import { createPropertyBySymbol } from "../compiler/entities/property.js";
import { createSourceFileBySymbol } from "../compiler/entities/source-file.js";
import { createTypeParameterBySymbol } from "../compiler/entities/type-parameter.js";
import { createVariableBySymbol } from "../compiler/entities/variable.js";
import { resolveSymbolInCaseOfImport } from "../compiler/utils/ts.js";
import { error } from "../log/index.js";
import {
  isClassSymbol,
  isEnumSymbol,
  isFunctionSymbol,
  isInterfaceSymbol,
  isModuleSymbol,
  isNamespaceSymbol,
  isObjectLiteralSymbol,
  isPropertySymbol,
  isSourceFileSymbol,
  isTypeAliasSymbol,
  isTypeParameterSymbol,
  isVariableSymbol
} from "../typeguards/ts.js";
import { CompilerContext } from "../types/context.js";
import { ExportableTypes, Types } from "../types/types.js";


export function parse(ctx: CompilerContext, sourceFileSymbol: Symbol): ExportableTypes[] {
  return createSourceFileBySymbol(ctx, sourceFileSymbol).exports;

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
  } else if(isNamespaceSymbol(symbol)){
    return createNamespaceBySymbol(ctx, resolvedSymbol);
  } else if(isModuleSymbol(symbol)){
    return createModuleBySymbol(ctx, resolvedSymbol);
  } else if(isSourceFileSymbol(symbol)){
    return createSourceFileBySymbol(ctx, symbol);
  } else if(isTypeParameterSymbol(symbol)){
    return createTypeParameterBySymbol(ctx, symbol);
  } else if(isPropertySymbol(symbol)){
    return createPropertyBySymbol(ctx, symbol);
  } else if(isObjectLiteralSymbol(symbol)){
    return createObjectLiteralBySymbol(ctx, symbol);
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
