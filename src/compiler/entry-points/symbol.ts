import { Symbol } from "typescript";

import {
  createClassBySymbol,
  createEnumBySymbol,
  createFunctionBySymbol,
  createInterfaceBySymbol,
  createModuleBySymbol,
  createNamespaceBySymbol,
  createPropertyBySymbol,
  createSourceFileBySymbol,
  createTypeAliasBySymbol,
  createTypeParameterBySymbol,
  createUnresolvedBySymbol,
  createVariableBySymbol
} from "quickdoks:compiler:entities";
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
import { resolveSymbolInCaseOfImport } from "quickdoks:compiler:utils/ts.js";
import { CompilerContext } from "quickdoks:types:context.js";
import { Types } from "quickdoks:types:types.js";
import { isSymbolExcluded } from "quickdoks:utils:exclude.js";


export function parseSymbol(ctx: CompilerContext, symbol: Symbol): Types {

  const resolvedSymbol = resolveSymbolInCaseOfImport(ctx, symbol);

  if(isSymbolExcluded(ctx, resolvedSymbol)){
    return createUnresolvedBySymbol(ctx, resolvedSymbol);
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
