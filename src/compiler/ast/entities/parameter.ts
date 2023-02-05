import { getIdBySymbol } from "unwritten:compiler/ast/shared/id.js";
import { getInitializerByDeclaration } from "unwritten:compiler/ast/shared/initializer.js";
import { getParameterDescription } from "unwritten:compiler/ast/shared/jsdoc.js";
import { getNameBySymbol } from "unwritten:compiler/ast/shared/name.js";
import { getPositionByDeclaration } from "unwritten:compiler/ast/shared/position.js";
import { parseTypeNode } from "unwritten:compiler:ast/index.js";
import { EntityKind } from "unwritten:compiler:enums/entities.js";
import { assert } from "unwritten:utils:general.js";

import type { ParameterDeclaration } from "typescript";

import type { ParameterEntity } from "unwritten:compiler:type-definitions/entities.d.js";
import type { CompilerContext } from "unwritten:type-definitions/context.d.js";


export function createParameterEntity(ctx: CompilerContext, declaration: ParameterDeclaration): ParameterEntity {

  const symbol = ctx.checker.getSymbolAtLocation(declaration.name);
  const typeNode = declaration.type;

  assert(symbol, "Symbol is not found");

  const id = getIdBySymbol(ctx, symbol);
  const name = getNameBySymbol(ctx, symbol);
  const initializer = getInitializerByDeclaration(ctx, declaration);
  const position = getPositionByDeclaration(ctx, declaration);
  const description = getParameterDescription(ctx, declaration);
  const type = typeNode && parseTypeNode(ctx, typeNode);

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
