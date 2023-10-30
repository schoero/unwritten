import { interpretJSDocComments } from "unwritten:interpreter/ast/jsdoc";
import { createJSDocReference } from "unwritten:interpreter/ast/jsdoc/reference";
import { JSDocKind } from "unwritten:interpreter/enums/jsdoc";

import type { JSDocSeeTag as TSJSDocSeeTag } from "typescript";

import type { JSDocSeeTag } from "unwritten:interpreter/type-definitions/jsdoc";
import type { InterpreterContext } from "unwritten:type-definitions/context";


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
