import { interpretType } from "unwritten:interpreter/ast/index.js";
import { getSymbolId } from "unwritten:interpreter/ast/shared/id.js";
import { EntityKind } from "unwritten:interpreter/enums/entities.js";
import { isExportAssignment } from "unwritten:interpreter/typeguards/declarations.js";
import { assert } from "unwritten:utils/general.js";

import type { Symbol } from "typescript";

import type { ExportAssignmentEntity } from "unwritten:interpreter/type-definitions/entities.js";
import type { InterpreterContext } from "unwritten:type-definitions/context.js";


export function createExportAssignment(ctx: InterpreterContext, symbol: Symbol): ExportAssignmentEntity {

  const declaration = symbol.valueDeclaration ?? symbol.declarations?.[0];

  assert(declaration && isExportAssignment(declaration), "Export assignment is not found");

  const tsType = ctx.checker.getTypeAtLocation(declaration.expression);
  const type = interpretType(ctx, tsType);
  const symbolId = getSymbolId(ctx, symbol);
  const kind = EntityKind.ExportAssignment;

  return {
    kind,
    symbolId,
    type
  };

}
