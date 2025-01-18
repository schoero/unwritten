import { getNameBySymbol } from "unwritten:interpreter/ast/shared/name";
import { getPositionByNode } from "unwritten:interpreter/ast/shared/position";
import { interpretSymbol } from "unwritten:interpreter/ast/symbol";
import { JSDocKind } from "unwritten:interpreter/enums/jsdoc";

import type { EntityName, JSDocMemberName } from "typescript";
import type { JSDocReference } from "unwritten:interpreter:type-definitions/jsdoc";
import type { InterpreterContext } from "unwritten:type-definitions/context";


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
