import { createTypeParameterEntityByDeclaration } from "unwritten:interpreter/ast/entities/index.js";
import { getJSDocProperties } from "unwritten:interpreter/ast/jsdoc.js";
import { getPositionByDeclaration } from "unwritten:interpreter/ast/shared/position.js";
import { EntityKind } from "unwritten:interpreter/enums/entity.js";
import { withLockedSymbol } from "unwritten:interpreter/utils/ts.js";
import { getDeclarationId, getSymbolId } from "unwritten:interpreter:ast/shared/id.js";
import { getNameBySymbol } from "unwritten:interpreter:ast/shared/name.js";
import { isTypeAliasDeclaration } from "unwritten:interpreter:typeguards/declarations.js";
import { assert } from "unwritten:utils:general.js";

import { getTypeByTypeNode } from "../type";

import type { Symbol } from "typescript";

import type { TypeAliasEntity } from "unwritten:interpreter/type-definitions/entities.js";
import type { InterpreterContext } from "unwritten:type-definitions/context.js";


export const createTypeAliasEntity = (ctx: InterpreterContext, symbol: Symbol): TypeAliasEntity => withLockedSymbol(ctx, symbol, () => {

  const declaration = symbol.valueDeclaration ?? symbol.getDeclarations()?.[0];

  assert(declaration && isTypeAliasDeclaration(ctx, declaration), "Type alias declaration is not found");

  const name = getNameBySymbol(ctx, symbol);
  const symbolId = getSymbolId(ctx, symbol);

  const jsdocProperties = getJSDocProperties(ctx, declaration);

  const declarationId = getDeclarationId(ctx, declaration);
  const position = getPositionByDeclaration(ctx, declaration);

  // Getting the resolved type via symbol or declaration results in an error type
  const type = getTypeByTypeNode(ctx, declaration.type);
  const kind = EntityKind.TypeAlias;

  const typeParameters = declaration.typeParameters?.map(
    typeParameter => createTypeParameterEntityByDeclaration(ctx, typeParameter)
  );

  return {
    ...jsdocProperties,
    declarationId,
    kind,
    name,
    position,
    symbolId,
    type,
    typeParameters
  };

});
