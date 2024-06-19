import { JSDocKind } from "unwritten:interpreter/enums/jsdoc";

import type { JSDocText as TSJSDocText } from "typescript";

import type { JSDocText } from "unwritten:interpreter:type-definitions/jsdoc";
import type { InterpreterContext } from "unwritten:type-definitions/context";


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
