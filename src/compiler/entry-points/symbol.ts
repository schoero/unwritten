import {
  createClassEntity,
  createEnumEntity,
  createFunctionBySymbol,
  createInterfaceBySymbol,
  createModuleEntity,
  createNamespaceBySymbol,
  createPropertyBySymbol,
  createSourceFileEntity,
  createTypeAliasEntity,
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
import { isSymbolExcluded } from "quickdoks:utils:exclude.js";

import type { Symbol } from "typescript";

import type { Types } from "quickdoks:compiler:type-definitions/types.d.js";
import type { CompilerContext } from "quickdoks:type-definitions/context.d.js";


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
    return createClassEntity(ctx, resolvedSymbol);
  } else if(isInterfaceSymbol(resolvedSymbol)){
    return createInterfaceBySymbol(ctx, resolvedSymbol);
  } else if(isTypeAliasSymbol(resolvedSymbol)){
    return createTypeAliasEntity(ctx, resolvedSymbol);
  } else if(isEnumSymbol(resolvedSymbol)){
    return createEnumEntity(ctx, resolvedSymbol);
  } else if(isNamespaceSymbol(symbol)){
    return createNamespaceBySymbol(ctx, resolvedSymbol);
  } else if(isModuleSymbol(symbol)){
    return createModuleEntity(ctx, resolvedSymbol);
  } else if(isSourceFileSymbol(symbol)){
    return createSourceFileEntity(ctx, resolvedSymbol);
  } else if(isTypeParameterSymbol(symbol)){
    return createTypeParameterBySymbol(ctx, resolvedSymbol);
  } else if(isPropertySymbol(symbol)){
    return createPropertyBySymbol(ctx, resolvedSymbol);
  } else {
    return createUnresolvedBySymbol(ctx, resolvedSymbol);
  }

}
