import { getDeclarationId, getSymbolId } from "unwritten:interpreter/ast/shared/id.js";
import { createSourceFileEntity } from "unwritten:interpreter:ast/entities/index.js";
import { getDescriptionByDeclaration, getJSDocTagsByDeclaration } from "unwritten:interpreter:ast/shared/jsdoc.js";
import { getPositionByDeclaration } from "unwritten:interpreter:ast/shared/position.js";
import { EntityKind } from "unwritten:interpreter:enums/entities.js";

import type { Symbol } from "typescript";

import type { NamespaceEntity } from "unwritten:interpreter:type-definitions/entities.js";
import type { InterpreterContext } from "unwritten:type-definitions/context.d.js";


export function createNamespaceEntity(ctx: InterpreterContext, symbol: Symbol): NamespaceEntity {

  const fromSourceFile = createSourceFileEntity(ctx, symbol);

  const declaration = symbol.valueDeclaration ?? symbol.declarations?.[0];

  const symbolId = getSymbolId(ctx, symbol);
  const description = declaration && getDescriptionByDeclaration(ctx, declaration);
  const jsdocTags = declaration && getJSDocTagsByDeclaration(ctx, declaration);
  const position = declaration && getPositionByDeclaration(ctx, declaration);
  const declarationId = declaration && getDeclarationId(ctx, declaration);

  const kind = EntityKind.Namespace;

  return {
    ...fromSourceFile,
    ...jsdocTags,
    declarationId,
    description,
    kind,
    position,
    symbolId
  };

}
