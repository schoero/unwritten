import { NodeArray, Program, Symbol, TypeNode } from "typescript";
import { assert } from "vitest";

import { createLinkToSymbol } from "../compiler/entities/circular.js";
import { createClassBySymbol } from "../compiler/entities/class.js";
import { createEnumBySymbol } from "../compiler/entities/enum.js";
import { createFunctionBySymbol } from "../compiler/entities/function.js";
import { createInterfaceBySymbol } from "../compiler/entities/interface.js";
import { createModuleBySymbol } from "../compiler/entities/module.js";
import { createNamespaceBySymbol } from "../compiler/entities/namespace.js";
import { createObjectLiteralBySymbol } from "../compiler/entities/object-literal.js";
import { createPropertyBySymbol } from "../compiler/entities/property.js";
import { createSourceFileBySymbol } from "../compiler/entities/source-file.js";
import { createTypeAliasBySymbol } from "../compiler/entities/type-alias.js";
import { createTypeParameterBySymbol } from "../compiler/entities/type-parameter.js";
import { createUnresolvedBySymbol } from "../compiler/entities/unresolved.js";
import { createVariableBySymbol } from "../compiler/entities/variable.js";
import { isSymbolLocked, resolveSymbolInCaseOfImport } from "../compiler/utils/ts.js";
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
} from "../compiler/typeguards/isFunctionSymbol";
import { CompilerContext } from "../types/context.js";
import { ExportableTypes, Types } from "../types/types.js";
import { isSymbolExcluded } from "../utils/general.js";


export function parse(ctx: CompilerContext, sourceFileSymbol: Symbol): ExportableTypes[] {
  return createSourceFileBySymbol(ctx, sourceFileSymbol).exports;
}


/**
 * Parses a TypeScript symbol.
 * This is the main entry point for parsing a TypeScript symbol.
 * @param ctx - Compiler context
 * @param symbol - File symbol
 * @returns Parsed symbol
 */
export function parseSymbol(ctx: CompilerContext, symbol: Symbol, typeArguments?: NodeArray<TypeNode>): Types {

  const resolvedSymbol = resolveSymbolInCaseOfImport(ctx, symbol);

  if(isSymbolExcluded(ctx, resolvedSymbol)){
    return createUnresolvedBySymbol(ctx, resolvedSymbol);
  }

  if(isSymbolLocked(ctx, resolvedSymbol)){
    return createLinkToSymbol(ctx, resolvedSymbol, typeArguments);
  }

  if(isVariableSymbol(resolvedSymbol)){
    return createVariableBySymbol(ctx, resolvedSymbol);
  } else if(isFunctionSymbol(resolvedSymbol)){
    return createFunctionBySymbol(ctx, resolvedSymbol);
  } else if(isClassSymbol(resolvedSymbol)){
    return createClassBySymbol(ctx, resolvedSymbol, typeArguments);
  } else if(isInterfaceSymbol(resolvedSymbol)){
    return createInterfaceBySymbol(ctx, resolvedSymbol, typeArguments);
  } else if(isTypeAliasSymbol(resolvedSymbol)){
    return createTypeAliasBySymbol(ctx, resolvedSymbol, typeArguments);
  } else if(isEnumSymbol(resolvedSymbol)){
    return createEnumBySymbol(ctx, resolvedSymbol);
  } else if(isNamespaceSymbol(symbol)){
    return createNamespaceBySymbol(ctx, resolvedSymbol);
  } else if(isModuleSymbol(symbol)){
    return createModuleBySymbol(ctx, resolvedSymbol);
  } else if(isSourceFileSymbol(symbol)){
    return createSourceFileBySymbol(ctx, resolvedSymbol);
  } else if(isTypeParameterSymbol(symbol)){
    return createTypeParameterBySymbol(ctx, resolvedSymbol);
  } else if(isPropertySymbol(symbol)){
    return createPropertyBySymbol(ctx, resolvedSymbol);
  } else if(isObjectLiteralSymbol(symbol)){
    return createObjectLiteralBySymbol(ctx, resolvedSymbol);
  } else {
    return createUnresolvedBySymbol(ctx, resolvedSymbol);
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
