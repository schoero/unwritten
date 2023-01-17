import { createUnresolvedType } from "quickdoks:compiler:ast/types/unresolved.js";
import {
  createClassEntity,
  createEnumEntity,
  createFunctionEntity,
  createInterfaceEntity,
  createModuleEntity,
  createNamespaceEntity,
  createPropertyEntity,
  createSourceFileEntity,
  createTypeAliasEntity,
  createVariableEntity
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
  isVariableSymbol
} from "quickdoks:compiler:typeguards/symbols.js";
import { resolveSymbolInCaseOfImport } from "quickdoks:compiler:utils/ts.js";

import type { Symbol } from "typescript";

import type { Entities } from "quickdoks:compiler:type-definitions/entities.js";
import type { CompilerContext } from "quickdoks:type-definitions/context.d.js";


export function parseSymbol(ctx: CompilerContext, symbol: Symbol): Entities {

  const resolvedSymbol = resolveSymbolInCaseOfImport(ctx, symbol);

  if(isVariableSymbol(resolvedSymbol)){
    return createVariableEntity(ctx, resolvedSymbol);
  } else if(isFunctionSymbol(resolvedSymbol)){
    return createFunctionEntity(ctx, resolvedSymbol);
  } else if(isClassSymbol(resolvedSymbol)){
    return createClassEntity(ctx, resolvedSymbol);
  } else if(isInterfaceSymbol(resolvedSymbol)){
    return createInterfaceEntity(ctx, resolvedSymbol);
  } else if(isTypeAliasSymbol(resolvedSymbol)){
    return createTypeAliasEntity(ctx, resolvedSymbol);
  } else if(isEnumSymbol(resolvedSymbol)){
    return createEnumEntity(ctx, resolvedSymbol);
  } else if(isNamespaceSymbol(symbol)){
    return createNamespaceEntity(ctx, resolvedSymbol);
  } else if(isModuleSymbol(symbol)){
    return createModuleEntity(ctx, resolvedSymbol);
  } else if(isSourceFileSymbol(symbol)){
    return createSourceFileEntity(ctx, resolvedSymbol);
  } else if(isPropertySymbol(symbol)){
    return createPropertyEntity(ctx, resolvedSymbol);
  } else {
    return createUnresolvedType(ctx, resolvedSymbol);
  }

}
