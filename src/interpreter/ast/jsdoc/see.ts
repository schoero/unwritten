import { interpretJSDocComments } from "unwritten:interpreter/ast/jsdoc.js";
import { createJSDocReference } from "unwritten:interpreter/ast/jsdoc/reference.js";
import { JSDocKind } from "unwritten:interpreter/enums/jsdoc.js";

import type { JSDocSeeTag as TSJSDocSeeTag } from "typescript";

import type { JSDocSeeTag } from "unwritten:interpreter/type-definitions/jsdoc.js";
import type { InterpreterContext } from "unwritten:type-definitions/context.js";


export function createJSDocSeeTag(ctx: InterpreterContext, jsdocSeeTag: TSJSDocSeeTag): JSDocSeeTag {

  const reference = jsdocSeeTag.name && createJSDocReference(ctx, jsdocSeeTag.name.name);

  const content = jsdocSeeTag.comment
    ? interpretJSDocComments(ctx, jsdocSeeTag.comment)
    : [];

  const kind = JSDocKind.See;

  return {
    content,
    kind,
    reference
  };

}
