import { EntityKind } from "unwritten:interpreter/enums/entity.js";
import { interpretType, interpretTypeNode } from "unwritten:interpreter:ast/index.js";
import { getDeclarationId, getSymbolId } from "unwritten:interpreter:ast/shared/id.js";
import { getInitializerByDeclaration } from "unwritten:interpreter:ast/shared/initializer.js";
import { getParameterDescription } from "unwritten:interpreter:ast/shared/jsdoc.js";
import { getNameBySymbol } from "unwritten:interpreter:ast/shared/name.js";
import { getPositionByDeclaration } from "unwritten:interpreter:ast/shared/position.js";
import { assert } from "unwritten:utils:general.js";

import type { ParameterDeclaration } from "typescript";

import type { ParameterEntity } from "unwritten:interpreter/type-definitions/entities.js";
import type { InterpreterContext } from "unwritten:type-definitions/context.js";


export function createParameterEntity(ctx: InterpreterContext, declaration: ParameterDeclaration): ParameterEntity {

  const symbol = ctx.checker.getSymbolAtLocation(declaration.name);
  const typeNode = declaration.type;
  const tsType = ctx.checker.getTypeAtLocation(declaration);

  assert(symbol, "Symbol is not found");

  const symbolId = getSymbolId(ctx, symbol);
  const declarationId = getDeclarationId(ctx, declaration);
  const name = getNameBySymbol(ctx, symbol);
  const initializer = getInitializerByDeclaration(ctx, declaration);
  const position = getPositionByDeclaration(ctx, declaration);
  const description = getParameterDescription(ctx, declaration);

  const type = typeNode
    ? interpretTypeNode(ctx, typeNode)
    : interpretType(ctx, tsType);

  const optional = declaration.questionToken !== undefined;
  const rest = declaration.dotDotDotToken !== undefined;
  const kind = EntityKind.Parameter;

  return {
    declarationId,
    description,
    initializer,
    kind,
    name,
    optional,
    position,
    rest,
    symbolId,
    type
  };

}
