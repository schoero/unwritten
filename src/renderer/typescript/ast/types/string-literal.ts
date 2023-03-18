import { renderQuote } from "unwritten:renderer/typescript/utils/keywords.js";

import type { StringLiteralType } from "unwritten:interpreter/type-definitions/types.js";
import type { TypeScriptRenderContext } from "unwritten:renderer/typescript/type-definitions/renderer.js";


export function renderStringLiteralType(ctx: TypeScriptRenderContext, type: StringLiteralType): string {
  const quote = renderQuote(ctx);
  return `${quote}${type.value}${quote}`;
}
