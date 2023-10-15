import { getJSDocProperties } from "unwritten:interpreter/ast/jsdoc.js";
import { getSymbolId } from "unwritten:interpreter/ast/shared/id.js";
import { getNameBySymbol } from "unwritten:interpreter/ast/shared/name.js";
import { getPositionByDeclaration } from "unwritten:interpreter/ast/shared/position.js";
import { EntityKind } from "unwritten:interpreter/enums/entity.js";
import { isExportAssignment } from "unwritten:interpreter/typeguards/declarations.js";
import { assert } from "unwritten:utils/general.js";

import { getTypeByType } from "../type";

import type { Symbol } from "typescript";

import type { ExportAssignmentEntity } from "unwritten:interpreter/type-definitions/entities.js";
import type { InterpreterContext } from "unwritten:type-definitions/context.js";


export function createExportAssignmentEntity(ctx: InterpreterContext, symbol: Symbol): ExportAssignmentEntity {

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

}
