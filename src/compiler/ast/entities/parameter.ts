import { parseType } from "quickdoks:compiler:entry-points/type.js";
import { EntityKind } from "quickdoks:compiler:enums/entities.js";
import { getIdBySymbol } from "quickdoks:compiler:mixins/id.js";
import { getInitializerByDeclaration } from "quickdoks:compiler:mixins/initializer.js";
import { getParameterDescription } from "quickdoks:compiler:mixins/jsdoc.js";
import { getNameBySymbol } from "quickdoks:compiler:mixins/name.js";
import { getPositionByDeclaration } from "quickdoks:compiler:mixins/position.js";
import { assert } from "quickdoks:utils:general.js";

import type { ParameterDeclaration } from "typescript";

import type { ParameterEntity } from "quickdoks:compiler:type-definitions/entities.d.js";
import type { CompilerContext } from "quickdoks:type-definitions/context.d.js";


export function createParameterEntity(ctx: CompilerContext, declaration: ParameterDeclaration): ParameterEntity {

  const symbol = ctx.checker.getSymbolAtLocation(declaration.name);
  const tsType = ctx.checker.getTypeAtLocation(declaration.name);

  assert(symbol, "Symbol is not found");

  const id = getIdBySymbol(ctx, symbol);
  const name = getNameBySymbol(ctx, symbol);
  const initializer = getInitializerByDeclaration(ctx, declaration);
  const position = getPositionByDeclaration(ctx, declaration);
  const description = getParameterDescription(ctx, declaration);
  const type = parseType(ctx, tsType);

  const optional = declaration.questionToken !== undefined;
  const rest = declaration.dotDotDotToken !== undefined;
  const kind = EntityKind.Parameter;

  return {
    description,
    id,
    initializer,
    kind,
    name,
    optional,
    position,
    rest,
    type
  };

}
