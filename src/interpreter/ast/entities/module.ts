import { getPositionByDeclaration } from "unwritten:interpreter:ast/shared/position";
import { getJSDocProperties } from "unwritten:interpreter/ast/jsdoc";
import { getDeclarationId } from "unwritten:interpreter/ast/shared/id";
import { getNameBySymbol } from "unwritten:interpreter/ast/shared/name";
import { EntityKind } from "unwritten:interpreter/enums/entity";
import { withCachedEntity, withLockedSymbol } from "unwritten:interpreter/utils/ts";

import { createSourceFileEntity } from "./source-file";

import type { Symbol } from "typescript";

import type { ModuleEntity } from "unwritten:interpreter:type-definitions/entities";
import type { InterpreterContext } from "unwritten:type-definitions/context";


export const createModuleEntity = (ctx: InterpreterContext, symbol: Symbol): ModuleEntity => withCachedEntity(ctx, symbol, () => withLockedSymbol(ctx, symbol, () => {

  const fromSourceFile = createSourceFileEntity(ctx, symbol);

  const declaration = symbol.valueDeclaration ?? symbol.declarations?.[0];

  const name = getNameBySymbol(ctx, symbol);

  const jsdocProperties = declaration && getJSDocProperties(ctx, declaration);
  const position = declaration && getPositionByDeclaration(ctx, declaration);
  const declarationId = declaration && getDeclarationId(ctx, declaration);

  const kind = EntityKind.Module;

  return {
    ...fromSourceFile,
    ...jsdocProperties,
    kind,
    name,
    position
  };

}));
