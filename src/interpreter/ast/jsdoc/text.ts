import { JSDocKind } from "unwritten:interpreter/enums/jsdoc.js";

import type { JSDocText as TSJSDocText } from "typescript";

import type { JSDocText } from "unwritten:interpreter/type-definitions/jsdoc.js";
import type { InterpreterContext } from "unwritten:type-definitions/context.js";


export function createJSDocText(ctx: InterpreterContext, comment: TSJSDocText | string): JSDocText {

  const text = typeof comment === "string"
    ? comment
    : comment.text;

  const kind = JSDocKind.Text;

  return {
    kind,
    text
  };

}
