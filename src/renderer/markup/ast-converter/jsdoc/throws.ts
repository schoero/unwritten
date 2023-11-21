import { convertJSDocType } from "unwritten:renderer/markup/ast-converter/jsdoc/type";
import { convertJSDocNodes } from "unwritten:renderer/markup/ast-converter/shared/jsdoc";
import { spaceBetween } from "unwritten:renderer/markup/utils/renderer";

import type { JSDocThrowsTag } from "unwritten:interpreter/type-definitions/jsdoc";
import type { MarkupRenderContext } from "unwritten:renderer/markup/types-definitions/markup";
import type { ConvertedJSDocThrowsTag } from "unwritten:renderer/markup/types-definitions/renderer";


export function convertJSDocThrowsTag(ctx: MarkupRenderContext, jsdocThrowsTag: JSDocThrowsTag): ConvertedJSDocThrowsTag {

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
