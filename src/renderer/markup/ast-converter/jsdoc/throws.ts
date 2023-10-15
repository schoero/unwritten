import { convertJSDocType } from "unwritten:renderer/markup/ast-converter/jsdoc/type.js";
import { convertJSDocNodes } from "unwritten:renderer/markup/ast-converter/shared/jsdoc.js";
import { spaceBetween } from "unwritten:renderer/markup/utils/renderer.js";

import type { JSDocThrowsTag } from "unwritten:interpreter/type-definitions/jsdoc.js";
import type { MarkupRenderContexts } from "unwritten:renderer/markup/types-definitions/markup.js";
import type { ConvertedJSDocThrowsTag } from "unwritten:renderer/markup/types-definitions/renderer.js";


export function convertJSDocThrowsTag(ctx: MarkupRenderContexts, jsdocThrowsTag: JSDocThrowsTag): ConvertedJSDocThrowsTag {

  const content = convertJSDocNodes(ctx, jsdocThrowsTag.content);

  if(!jsdocThrowsTag.type){
    return content;
  }

  const type = convertJSDocType(ctx, jsdocThrowsTag.type);

  return spaceBetween(
    type,
    ...content
  );

}
