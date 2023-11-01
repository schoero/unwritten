import type { JSDocText } from "unwritten:interpreter/type-definitions/jsdoc";
import type { MarkupRenderContexts } from "unwritten:renderer/markup/types-definitions/markup";
import type { ConvertedJSDocTags } from "unwritten:renderer/markup/types-definitions/renderer";


export function convertJSDocText(ctx: MarkupRenderContexts, jsdocText: JSDocText): ConvertedJSDocTags {
  return jsdocText.text;
}
