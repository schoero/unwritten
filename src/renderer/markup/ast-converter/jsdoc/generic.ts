import { convertJSDocNodes } from "unwritten:renderer/markup/ast-converter/shared/jsdoc.js";

import type { JSDocGenericTag } from "unwritten:interpreter/type-definitions/jsdoc.js";
import type { MarkupRenderContexts } from "unwritten:renderer/markup/types-definitions/markup.js";
import type { ConvertedJSDocTags } from "unwritten:renderer/markup/types-definitions/renderer.js";


export function convertJSDocGenericTag(ctx: MarkupRenderContexts, jsdocGenericTag: JSDocGenericTag): ConvertedJSDocTags {
  return convertJSDocNodes(ctx, jsdocGenericTag.content);
}
