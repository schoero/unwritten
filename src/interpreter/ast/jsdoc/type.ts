import { getNameByTypeNode } from "unwritten:interpreter/ast/shared/name";
import { getPositionByNode } from "unwritten:interpreter/ast/shared/position";
import { getTypeByTypeNode } from "unwritten:interpreter/ast/type";
import { JSDocKind } from "unwritten:interpreter/enums/jsdoc";

import type { JSDocTypeExpression } from "typescript";

import type { JSDocType } from "unwritten:interpreter:type-definitions/jsdoc";
import type { InterpreterContext } from "unwritten:type-definitions/context";


export function createJSDocType(ctx: InterpreterContext, typeExpression: JSDocTypeExpression): JSDocType | undefined {

  const type = getTypeByTypeNode(ctx, typeExpression.type);
  const position = getPositionByNode(ctx, typeExpression);
  const name = getNameByTypeNode(ctx, typeExpression.type);

  const kind = JSDocKind.Type;

  return {
    kind,
    name,
    position,
    type
  };

}
