import { createTypeParameterEntityByDeclaration } from "unwritten:interpreter/ast/entities/index.js";
import { getDeclaredType } from "unwritten:interpreter/ast/index.js";
import { getPositionByDeclaration } from "unwritten:interpreter/ast/shared/position.js";
import { EntityKind } from "unwritten:interpreter/enums/entity.js";
import { getDeclarationId, getSymbolId } from "unwritten:interpreter:ast/shared/id.js";
import { getDescriptionBySymbol, getJSDocTagsByDeclaration } from "unwritten:interpreter:ast/shared/jsdoc.js";
import { getNameBySymbol } from "unwritten:interpreter:ast/shared/name.js";
import { isTypeAliasDeclaration } from "unwritten:interpreter:typeguards/declarations.js";
import { assert } from "unwritten:utils:general.js";

import type { Symbol } from "typescript";

import type { TypeAliasEntity } from "unwritten:interpreter/type-definitions/entities.js";
import type { InterpreterContext } from "unwritten:type-definitions/context.js";


export function createTypeAliasEntity(ctx: InterpreterContext, symbol: Symbol): TypeAliasEntity {

  const declaration = symbol.valueDeclaration ?? symbol.getDeclarations()?.[0];

  assert(declaration && isTypeAliasDeclaration(declaration), "Type alias declaration is not found");

  const name = getNameBySymbol(ctx, symbol);
  const symbolId = getSymbolId(ctx, symbol);
  const description = getDescriptionBySymbol(ctx, symbol);
  const declarationId = getDeclarationId(ctx, declaration);
  const jsdocTags = getJSDocTagsByDeclaration(ctx, declaration);
  const position = getPositionByDeclaration(ctx, declaration);
  const type = getDeclaredType(ctx, declaration.type);
  const kind = EntityKind.TypeAlias;

  const typeParameters = declaration.typeParameters?.map(
    typeParameter => createTypeParameterEntityByDeclaration(ctx, typeParameter)
  );

  return {
    ...jsdocTags,
    declarationId,
    description,
    kind,
    name,
    position,
    symbolId,
    type,
    typeParameters
  };

}
