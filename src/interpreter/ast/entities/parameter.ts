import { getDeclarationId, getSymbolId } from "unwritten:interpreter:ast/shared/id";
import { getInitializerByDeclaration } from "unwritten:interpreter:ast/shared/initializer";
import { getNameBySymbol } from "unwritten:interpreter:ast/shared/name";
import { getPositionByDeclaration } from "unwritten:interpreter:ast/shared/position";
import { getJSDocProperties } from "unwritten:interpreter/ast/jsdoc";
import { EntityKind } from "unwritten:interpreter/enums/entity";
import { isParameterDeclaration } from "unwritten:interpreter/typeguards/declarations";
import { withCachedEntity } from "unwritten:interpreter/utils/ts";
import { assert } from "unwritten:utils:general";

import { getTypeBySymbol } from "../type";

import type { Symbol } from "typescript";

import type { ParameterEntity } from "unwritten:interpreter:type-definitions/entities";
import type { InterpreterContext } from "unwritten:type-definitions/context";


export const createParameterEntity = (ctx: InterpreterContext, symbol: Symbol): ParameterEntity => withCachedEntity(ctx, symbol, () => {

  const declaration = symbol.valueDeclaration ?? symbol.getDeclarations()?.[0];

  assert(declaration && isParameterDeclaration(ctx, declaration), "Parameter declaration is not found");

  const name = getNameBySymbol(ctx, symbol);
  const type = getTypeBySymbol(ctx, symbol, declaration);
  const initializer = getInitializerByDeclaration(ctx, declaration);
  const position = getPositionByDeclaration(ctx, declaration);
  const jsdocProperties = getJSDocProperties(ctx, declaration);
  const description = jsdocProperties.param?.[0]?.content;
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

});
