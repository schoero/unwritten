import type { JSDocText } from "unwritten:interpreter/type-definitions/jsdoc.js";
import type { MarkupRenderContexts } from "unwritten:renderer/markup/types-definitions/markup.js";
import type { ConvertedJSDocTags } from "unwritten:renderer/markup/types-definitions/renderer.js";


export function convertJSDocText(ctx: MarkupRenderContexts, jsdocText: JSDocText): ConvertedJSDocTags {
  return jsdocText.text;
}
