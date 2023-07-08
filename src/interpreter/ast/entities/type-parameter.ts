import { EntityKind } from "unwritten:interpreter/enums/entity.js";
import { interpretTypeNode } from "unwritten:interpreter:ast/index.js";
import { getDeclarationId, getSymbolId } from "unwritten:interpreter:ast/shared/id.js";
import { getTypeParameterDescription } from "unwritten:interpreter:ast/shared/jsdoc.js";
import { getNameBySymbol } from "unwritten:interpreter:ast/shared/name.js";
import { getPositionByDeclaration } from "unwritten:interpreter:ast/shared/position.js";
import { isTypeParameterDeclaration } from "unwritten:interpreter:typeguards/declarations.js";
import { assert } from "unwritten:utils:general.js";

import type { TypeParameterDeclaration } from "typescript";

import type { TypeParameterEntity } from "unwritten:interpreter/type-definitions/entities.js";
import type { InterpreterContext } from "unwritten:type-definitions/context.js";


export function createTypeParameterEntity(ctx: InterpreterContext, declaration: TypeParameterDeclaration): TypeParameterEntity {

  assert(isTypeParameterDeclaration(declaration), "Declaration is not found");

  const symbol = ctx.checker.getSymbolAtLocation(declaration.name);

  assert(symbol, "Symbol is not found");

  const symbolId = getSymbolId(ctx, symbol);
  const declarationId = getDeclarationId(ctx, declaration);
  const name = getNameBySymbol(ctx, symbol);
  const position = getPositionByDeclaration(ctx, declaration);
  const description = getTypeParameterDescription(ctx, declaration);
  const initializer = declaration.default && interpretTypeNode(ctx, declaration.default);
  const constraint = declaration.constraint && interpretTypeNode(ctx, declaration.constraint);
  const kind = EntityKind.TypeParameter;

  return {
    constraint,
    declarationId,
    description,
    initializer,
    kind,
    name,
    position,
    symbolId
  };

}
