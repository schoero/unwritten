import { getJSDocProperties } from "unwritten:interpreter/ast/jsdoc";
import { getSymbolId } from "unwritten:interpreter/ast/shared/id";
import { getNameBySymbol } from "unwritten:interpreter/ast/shared/name";
import { getPositionByDeclaration } from "unwritten:interpreter/ast/shared/position";
import { EntityKind } from "unwritten:interpreter/enums/entity";
import { isExportAssignment } from "unwritten:interpreter/typeguards/declarations";
import { withCachedEntity, withLockedSymbol } from "unwritten:interpreter/utils/ts";
import { assert } from "unwritten:utils/general";

import { getTypeByType } from "../type";

import type { Symbol } from "typescript";
import type { ExportAssignmentEntity } from "unwritten:interpreter:type-definitions/entities";
import type { InterpreterContext } from "unwritten:type-definitions/context";


export const createExportAssignmentEntity = (ctx: InterpreterContext, symbol: Symbol): ExportAssignmentEntity => withCachedEntity(ctx, symbol, () => withLockedSymbol(ctx, symbol, () => {

  const declaration = symbol.valueDeclaration ?? symbol.declarations?.[0];

  assert(declaration && isExportAssignment(ctx, declaration), "Export assignment is not found");

  const jsdocProperties = getJSDocProperties(ctx, declaration);
  const tsType = ctx.checker.getTypeAtLocation(declaration.expression);
  const position = getPositionByDeclaration(ctx, declaration);
  const name = getNameBySymbol(ctx, symbol);
  const type = getTypeByType(ctx, tsType);
  const symbolId = getSymbolId(ctx, symbol);
  const kind = EntityKind.ExportAssignment;

  return {
    ...jsdocProperties,
    kind,
    name,
    position,
    symbolId,
    type
  };

}));
