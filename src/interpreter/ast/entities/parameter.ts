import { EntityKind } from "unwritten:interpreter/enums/entity.js";
import { isParameterDeclaration } from "unwritten:interpreter/typeguards/declarations.js";
import {
  getDeclaredType,
  getResolvedTypeBySymbol,
  getTypeByDeclaredOrResolvedType
} from "unwritten:interpreter:ast/index.js";
import { getDeclarationId, getSymbolId } from "unwritten:interpreter:ast/shared/id.js";
import { getInitializerByDeclaration } from "unwritten:interpreter:ast/shared/initializer.js";
import { getParameterDescription } from "unwritten:interpreter:ast/shared/jsdoc.js";
import { getNameBySymbol } from "unwritten:interpreter:ast/shared/name.js";
import { getPositionByDeclaration } from "unwritten:interpreter:ast/shared/position.js";
import { assert } from "unwritten:utils:general.js";

import type { Symbol } from "typescript";

import type { ParameterEntity } from "unwritten:interpreter/type-definitions/entities.js";
import type { InterpreterContext } from "unwritten:type-definitions/context.js";


export function createParameterEntity(ctx: InterpreterContext, symbol: Symbol): ParameterEntity {

  const declaration = symbol.valueDeclaration ?? symbol.getDeclarations()?.[0];

  assert(declaration && isParameterDeclaration(declaration), "Parameter declaration is not found");

  const name = getNameBySymbol(ctx, symbol);

  const resolvedType = getResolvedTypeBySymbol(ctx, symbol, declaration);
  const declaredType = declaration.type ? getDeclaredType(ctx, declaration.type) : resolvedType;
  const type = getTypeByDeclaredOrResolvedType(declaredType, resolvedType);

  const initializer = getInitializerByDeclaration(ctx, declaration);
  const position = getPositionByDeclaration(ctx, declaration);
  const description = getParameterDescription(ctx, declaration);
  const symbolId = getSymbolId(ctx, symbol);
  const declarationId = getDeclarationId(ctx, declaration);
  const kind = EntityKind.Parameter;

  const optional = declaration.questionToken !== undefined;
  const rest = declaration.dotDotDotToken !== undefined;

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
