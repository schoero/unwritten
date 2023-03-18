import { getDescriptionByDeclaration, getJSDocTagsByDeclaration } from "unwritten:interpreter/ast/shared/jsdoc.js";
import { getPositionByDeclaration } from "unwritten:interpreter/ast/shared/position.js";
import { EntityKind } from "unwritten:interpreter/enums/entities.js";

import { createSourceFileEntity } from "./source-file.js";

import type { Symbol } from "typescript";

import type { ModuleEntity } from "unwritten:interpreter/type-definitions/entities.js";
import type { InterpreterContext } from "unwritten:type-definitions/context.d.js";


export function createModuleEntity(ctx: InterpreterContext, symbol: Symbol): ModuleEntity {

  const fromSourceFile = createSourceFileEntity(ctx, symbol);

  const declaration = symbol.valueDeclaration ?? symbol.declarations?.[0];

  const description = declaration && getDescriptionByDeclaration(ctx, declaration);
  const jsdocTags = declaration && getJSDocTagsByDeclaration(ctx, declaration);
  const position = declaration && getPositionByDeclaration(ctx, declaration);

  const kind = EntityKind.Module;

  return {
    ...fromSourceFile,
    description,
    ...jsdocTags,
    kind,
    position
  };

}
