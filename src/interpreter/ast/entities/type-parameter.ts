import { parseTypeNode } from "unwritten:interpreter/ast/index.js";
import { getIdBySymbol } from "unwritten:interpreter/ast/shared/id.js";
import { getTypeParameterDescription } from "unwritten:interpreter/ast/shared/jsdoc.js";
import { getNameBySymbol } from "unwritten:interpreter/ast/shared/name.js";
import { getPositionByDeclaration } from "unwritten:interpreter/ast/shared/position.js";
import { EntityKind } from "unwritten:interpreter/enums/entities.js";
import { isTypeParameterDeclaration } from "unwritten:interpreter/typeguards/declarations.js";
import { assert } from "unwritten:utils:general.js";

import type { TypeParameterDeclaration } from "typescript";

import type { TypeParameterEntity } from "unwritten:interpreter/type-definitions/entities.js";
import type { InterpreterContext } from "unwritten:type-definitions/context.d.js";


export function createTypeParameterEntity(ctx: InterpreterContext, declaration: TypeParameterDeclaration): TypeParameterEntity {

  assert(isTypeParameterDeclaration(declaration), "Declaration is not found");

  const symbol = ctx.checker.getSymbolAtLocation(declaration.name);

  assert(symbol, "Symbol is not found");

  const id = getIdBySymbol(ctx, symbol);
  const name = getNameBySymbol(ctx, symbol);
  const position = getPositionByDeclaration(ctx, declaration);
  const description = getTypeParameterDescription(ctx, declaration);
  const initializer = declaration.default && parseTypeNode(ctx, declaration.default);
  const constraint = declaration.constraint && parseTypeNode(ctx, declaration.constraint);
  const kind = EntityKind.TypeParameter;

  return {
    constraint,
    description,
    id,
    initializer,
    kind,
    name,
    position
  };

}
