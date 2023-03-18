import { parseTypeNode } from "unwritten:interpreter/ast/index.js";
import { getIdBySymbol } from "unwritten:interpreter/ast/shared/id.js";
import { getInitializerByDeclaration } from "unwritten:interpreter/ast/shared/initializer.js";
import { getParameterDescription } from "unwritten:interpreter/ast/shared/jsdoc.js";
import { getNameBySymbol } from "unwritten:interpreter/ast/shared/name.js";
import { getPositionByDeclaration } from "unwritten:interpreter/ast/shared/position.js";
import { EntityKind } from "unwritten:interpreter/enums/entities.js";
import { assert } from "unwritten:utils:general.js";

import type { ParameterDeclaration } from "typescript";

import type { ParameterEntity } from "unwritten:interpreter/type-definitions/entities.js";
import type { InterpreterContext } from "unwritten:type-definitions/context.d.js";


export function createParameterEntity(ctx: InterpreterContext, declaration: ParameterDeclaration): ParameterEntity {

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
