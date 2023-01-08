import { parseTypeNode } from "quickdoks:compiler:entry-points/type-node.js";
import { EntityKind } from "quickdoks:compiler:enums/entities.js";
import { getIdBySymbol } from "quickdoks:compiler:mixins/id.js";
import { getTypeParameterDescription } from "quickdoks:compiler:mixins/jsdoc.js";
import { getNameBySymbol } from "quickdoks:compiler:mixins/name.js";
import { getPositionByDeclaration } from "quickdoks:compiler:mixins/position.js";
import { isTypeParameterDeclaration } from "quickdoks:compiler:typeguards/declarations.js";
import { assert } from "quickdoks:utils:general.js";

import type { TypeParameterDeclaration } from "typescript";

import type { TypeParameterEntity } from "quickdoks:compiler:type-definitions/entities.d.js";
import type { CompilerContext } from "quickdoks:type-definitions/context.d.js";


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
