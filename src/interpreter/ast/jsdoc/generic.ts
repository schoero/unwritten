import { interpretJSDocComments } from "unwritten:interpreter/ast/jsdoc";
import { JSDocKind } from "unwritten:interpreter/enums/jsdoc";

import type { JSDocTag as TSJSDocTag } from "typescript";
import type { JSDocGenericTag } from "unwritten:interpreter:type-definitions/jsdoc";
import type { InterpreterContext } from "unwritten:type-definitions/context";


export function createGenericJSDocTag(ctx: InterpreterContext, jsdocTag: TSJSDocTag): JSDocGenericTag {

  const content = jsdocTag.comment
    ? interpretJSDocComments(ctx, jsdocTag.comment)
    : [];

  const tag = jsdocTag.tagName.getText() as JSDocGenericTag["tag"]; // Allow all tags for now

  const kind = JSDocKind.Generic;

  return {
    content,
    kind,
    tag
  };

}
