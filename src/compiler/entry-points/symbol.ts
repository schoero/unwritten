import { Symbol } from "typescript";

import { createLinkToSymbol } from "quickdoks:compiler:entities/circular.js";
import { createClassBySymbol } from "quickdoks:compiler:entities/class.js";
import { createEnumBySymbol } from "quickdoks:compiler:entities/enum.js";
import { createFunctionBySymbol } from "quickdoks:compiler:entities/function.js";
import { createInterfaceBySymbol } from "quickdoks:compiler:entities/interface.js";
import { createModuleBySymbol } from "quickdoks:compiler:entities/module.js";
import { createNamespaceBySymbol } from "quickdoks:compiler:entities/namespace.js";
import { createPropertyBySymbol } from "quickdoks:compiler:entities/property.js";
import { createSourceFileBySymbol } from "quickdoks:compiler:entities/source-file.js";
import { createTypeAliasBySymbol } from "quickdoks:compiler:entities/type-alias.js";
import { createTypeParameterBySymbol } from "quickdoks:compiler:entities/type-parameter.js";
import { createUnresolvedBySymbol } from "quickdoks:compiler:entities/unresolved.js";
import { createVariableBySymbol } from "quickdoks:compiler:entities/variable.js";
import {
  isClassSymbol,
  isEnumSymbol,
  isFunctionSymbol,
  isInterfaceSymbol,
  isModuleSymbol,
  isNamespaceSymbol,
  isPropertySymbol,
  isSourceFileSymbol,
  isTypeAliasSymbol,
  isTypeParameterSymbol,
  isVariableSymbol
} from "quickdoks:compiler:typeguards/symbols.js";
import { isSymbolLocked, resolveSymbolInCaseOfImport } from "quickdoks:compiler:utils/ts.js";
import { CompilerContext } from "quickdoks:types:context.js";
import { Types } from "quickdoks:types:types.js";
import { isSymbolExcluded } from "quickdoks:utils:exclude.js";


/**
 * Parses a TypeScript symbol.
 * This is the main entry point for parsing a TypeScript symbol.
 * @param ctx - Compiler context
 * @param symbol - File symbol
 * @returns Parsed symbol
 */


export function parseSymbol(ctx: CompilerContext, symbol: Symbol): Types {

  const resolvedSymbol = resolveSymbolInCaseOfImport(ctx, symbol);

  if(isSymbolExcluded(ctx, resolvedSymbol)){
    return createUnresolvedBySymbol(ctx, resolvedSymbol);
  }

  if(isSymbolLocked(ctx, resolvedSymbol)){
    return createLinkToSymbol(ctx, resolvedSymbol);
  }

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
    return createSourceFileBySymbol(ctx, resolvedSymbol);
  } else if(isTypeParameterSymbol(symbol)){
    return createTypeParameterBySymbol(ctx, resolvedSymbol);
  } else if(isPropertySymbol(symbol)){
    return createPropertyBySymbol(ctx, resolvedSymbol);
  } else {
    return createUnresolvedBySymbol(ctx, resolvedSymbol);
  }

}
