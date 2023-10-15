import { getJSDocProperties } from "unwritten:interpreter/ast/jsdoc.js";
import { getDeclarationId } from "unwritten:interpreter/ast/shared/id.js";
import { getNameBySymbol } from "unwritten:interpreter/ast/shared/name.js";
import { EntityKind } from "unwritten:interpreter/enums/entity.js";
import { getPositionByDeclaration } from "unwritten:interpreter:ast/shared/position.js";

import { createSourceFileEntity } from "./source-file.js";

import type { Symbol } from "typescript";

import type { ModuleEntity } from "unwritten:interpreter/type-definitions/entities.js";
import type { InterpreterContext } from "unwritten:type-definitions/context.js";


export function createModuleEntity(ctx: InterpreterContext, symbol: Symbol): ModuleEntity {

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

}
