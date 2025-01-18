import { interpretJSDocComments } from "unwritten:interpreter/ast/jsdoc";
import { createJSDocType } from "unwritten:interpreter/ast/jsdoc/type";
import { JSDocKind } from "unwritten:interpreter/enums/jsdoc";

import type { JSDocThrowsTag as TSJSDocThrowsTag } from "typescript";
import type { JSDocThrowsTag } from "unwritten:interpreter:type-definitions/jsdoc";
import type { InterpreterContext } from "unwritten:type-definitions/context";


export function createJSDocThrowsTag(ctx: InterpreterContext, jsdocThrowsTag: TSJSDocThrowsTag): JSDocThrowsTag {

  const type = jsdocThrowsTag.typeExpression && createJSDocType(ctx, jsdocThrowsTag.typeExpression);

  const content = jsdocThrowsTag.comment
    ? interpretJSDocComments(ctx, jsdocThrowsTag.comment)
    : [];

  const kind = JSDocKind.Throws;

  return {
    content,
    kind,
    type
  };

}
