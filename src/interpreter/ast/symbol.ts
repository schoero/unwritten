import {
  createClassEntity,
  createEnumEntity,
  createEnumMemberEntity,
  createExportAssignmentEntity,
  createFunctionEntity,
  createInterfaceEntity,
  createModuleEntity,
  createNamespaceEntity,
  createNamespaceEntityFromNamespaceExport,
  createSourceFileEntity,
  createTypeAliasEntity,
  createTypeParameterEntity,
  createVariableEntity
} from "unwritten:interpreter:ast/entities/index";
import { getNameBySymbol } from "unwritten:interpreter:ast/shared/name";
import {
  isClassSymbol,
  isEnumMemberSymbol,
  isEnumSymbol,
  isExportAssignmentSymbol,
  isFunctionSymbol,
  isGetterSymbol,
  isInterfaceSymbol,
  isMethodSymbol,
  isModuleSymbol,
  isNamespaceExportSymbol,
  isNamespaceSymbol,
  isPropertySymbol,
  isSetterSymbol,
  isSourceFileSymbol,
  isTypeAliasSymbol,
  isTypeParameterSymbol,
  isVariableSymbol
} from "unwritten:interpreter:typeguards/symbols";
import {
  createCircularEntity,
  createGetterEntity,
  createMethodEntity,
  createPropertyEntity,
  createSetterEntity,
  createUnresolvedEntity
} from "unwritten:interpreter/ast/entities/index";
import { getPositionBySymbol } from "unwritten:interpreter/ast/shared/position";
import { isSymbolLocked, isSymbolUnresolved, resolveSymbolInCaseOfImport } from "unwritten:interpreter/utils/ts";
import { assert } from "unwritten:utils:general";
import { isSymbolExcluded } from "unwritten:utils/exclude";

import type { Symbol } from "typescript";

import type { Entity, SourceFileEntity } from "unwritten:interpreter:type-definitions/entities";
import type { InterpreterContext } from "unwritten:type-definitions/context";


export function interpret(ctx: InterpreterContext, sourceFileSymbols: Symbol[]): SourceFileEntity[] {
  return sourceFileSymbols.map(sourceFileSymbol => {

    assert(isSourceFileSymbol(ctx, sourceFileSymbol), "Source file symbol is not a source file symbol");

    const { logger } = ctx.dependencies;
    const position = getPositionBySymbol(ctx, sourceFileSymbol);

    if(logger && position){
      logger.debug(`Interpreter: interpreting source file ${logger.filePath(position.file)}`);
    }

    return createSourceFileEntity(ctx, sourceFileSymbol);

  });
}


export function interpretSymbol(ctx: InterpreterContext, symbol: Symbol): Entity {

  const resolvedSymbol = resolveSymbolInCaseOfImport(ctx, symbol);

  if(isSymbolExcluded(ctx, resolvedSymbol)){
    return createUnresolvedEntity(ctx, resolvedSymbol);
  }

  if(isSymbolLocked(ctx, resolvedSymbol)){
    return createCircularEntity(ctx, resolvedSymbol);
  }

  if(isSymbolUnresolved(ctx, resolvedSymbol)){
    return createUnresolvedEntity(ctx, resolvedSymbol);
  }

  // Exportable symbols
  if(isVariableSymbol(ctx, resolvedSymbol)){
    return createVariableEntity(ctx, resolvedSymbol);
  } else if(isFunctionSymbol(ctx, resolvedSymbol)){
    return createFunctionEntity(ctx, resolvedSymbol);
  } else if(isClassSymbol(ctx, resolvedSymbol)){
    return createClassEntity(ctx, resolvedSymbol);
  } else if(isInterfaceSymbol(ctx, resolvedSymbol)){
    return createInterfaceEntity(ctx, resolvedSymbol);
  } else if(isTypeAliasSymbol(ctx, resolvedSymbol)){
    return createTypeAliasEntity(ctx, resolvedSymbol);
  } else if(isEnumSymbol(ctx, resolvedSymbol)){
    return createEnumEntity(ctx, resolvedSymbol);
  } else if(isNamespaceSymbol(ctx, resolvedSymbol)){
    return createNamespaceEntity(ctx, resolvedSymbol);
  } else if(isNamespaceExportSymbol(ctx, resolvedSymbol)){
    return createNamespaceEntityFromNamespaceExport(ctx, resolvedSymbol);
  } else if(isModuleSymbol(ctx, resolvedSymbol)){
    return createModuleEntity(ctx, resolvedSymbol);
  } else if(isExportAssignmentSymbol(ctx, resolvedSymbol)){
    return createExportAssignmentEntity(ctx, resolvedSymbol);
  } else if(isTypeParameterSymbol(ctx, resolvedSymbol)){
    return createTypeParameterEntity(ctx, resolvedSymbol);
  } else if(isEnumMemberSymbol(ctx, resolvedSymbol)){
    return createEnumMemberEntity(ctx, resolvedSymbol);
  }

  // Internal symbols
  if(isMethodSymbol(ctx, resolvedSymbol)){
    return createMethodEntity(ctx, resolvedSymbol);
  } else if(isGetterSymbol(ctx, resolvedSymbol)){
    return createGetterEntity(ctx, resolvedSymbol);
  } else if(isSetterSymbol(ctx, resolvedSymbol)){
    return createSetterEntity(ctx, resolvedSymbol);
  } else if(isPropertySymbol(ctx, resolvedSymbol)){
    return createPropertyEntity(ctx, resolvedSymbol);
  }

  const name = getNameBySymbol(ctx, resolvedSymbol);
  const formattedName = name ? `"${name}"` : "";
  const position = getPositionBySymbol(ctx, resolvedSymbol);
  const formattedPosition = position ? `at ${position.file}:${position.line}:${position.column}` : "";

  throw new RangeError(`Symbol ${formattedName} ${formattedPosition} not handled`);

}
