import { getDescriptionByDeclaration, getJSDocTagsByDeclaration } from "unwritten:compiler/ast/shared/jsdoc.js";
import { getPositionByDeclaration } from "unwritten:compiler/ast/shared/position.js";
import { EntityKind } from "unwritten:compiler:enums/entities.js";

import { createSourceFileEntity } from "./source-file.js";

import type { Symbol } from "typescript";

import type { ModuleEntity } from "unwritten:compiler:type-definitions/entities.d.js";
import type { CompilerContext } from "unwritten:type-definitions/context.d.js";


export function createModuleEntity(ctx: CompilerContext, symbol: Symbol): ModuleEntity {

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
