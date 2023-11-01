import { convertJSDocNodes } from "unwritten:renderer/markup/ast-converter/shared/jsdoc";

import type { JSDocGenericTag } from "unwritten:interpreter/type-definitions/jsdoc";
import type { MarkupRenderContexts } from "unwritten:renderer/markup/types-definitions/markup";
import type { ConvertedJSDocTags } from "unwritten:renderer/markup/types-definitions/renderer";


export function convertJSDocGenericTag(ctx: MarkupRenderContexts, jsdocGenericTag: JSDocGenericTag): ConvertedJSDocTags {
  return convertJSDocNodes(ctx, jsdocGenericTag.content);
}
