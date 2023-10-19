import { getNameBySymbol } from "unwritten:interpreter/ast/shared/name.js";
import { getPositionByNode } from "unwritten:interpreter/ast/shared/position.js";
import { interpretSymbol } from "unwritten:interpreter/ast/symbol.js";
import { JSDocKind } from "unwritten:interpreter/enums/jsdoc.js";

import type { EntityName, JSDocMemberName } from "typescript";

import type { JSDocReference } from "unwritten:interpreter/type-definitions/jsdoc.js";
import type { InterpreterContext } from "unwritten:type-definitions/context.js";


export function createJSDocReference(ctx: InterpreterContext, identifier: EntityName | JSDocMemberName): JSDocReference | undefined {

  const { ts } = ctx.dependencies;

  const symbol = ts.isJSDocMemberName(identifier)
    // @ts-expect-error - Internal API
    ? ctx.checker.getSymbolAtLocation(identifier.right)?.links.target
    : ctx.checker.getSymbolAtLocation(identifier);

  if(!symbol){
    return;
  }

  const position = getPositionByNode(ctx, identifier);
  const target = interpretSymbol(ctx, symbol);
  const name = getNameBySymbol(ctx, symbol);

  const kind = JSDocKind.Reference;

  return {
    kind,
    name,
    position,
    target
  };

}
