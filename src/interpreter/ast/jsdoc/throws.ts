import { interpretJSDocComments } from "unwritten:interpreter/ast/jsdoc.js";
import { createJSDocType } from "unwritten:interpreter/ast/jsdoc/type.js";
import { JSDocKind } from "unwritten:interpreter/enums/jsdoc.js";

import type { JSDocThrowsTag as TSJSDocThrowsTag } from "typescript";

import type { JSDocThrowsTag } from "unwritten:interpreter/type-definitions/jsdoc.js";
import type { InterpreterContext } from "unwritten:type-definitions/context.js";


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
