import { parseTypeNode } from "unwritten:compiler:entry-points/type-node.js";
import { EntityKind } from "unwritten:compiler:enums/entities.js";
import { getIdBySymbol } from "unwritten:compiler:shared/id.js";
import { getTypeParameterDescription } from "unwritten:compiler:shared/jsdoc.js";
import { getNameBySymbol } from "unwritten:compiler:shared/name.js";
import { getPositionByDeclaration } from "unwritten:compiler:shared/position.js";
import { isTypeParameterDeclaration } from "unwritten:compiler:typeguards/declarations.js";
import { assert } from "unwritten:utils:general.js";

import type { TypeParameterDeclaration } from "typescript";

import type { TypeParameterEntity } from "unwritten:compiler:type-definitions/entities.d.js";
import type { CompilerContext } from "unwritten:type-definitions/context.d.js";


export function createTypeParameterEntity(ctx: CompilerContext, declaration: TypeParameterDeclaration): TypeParameterEntity {

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
