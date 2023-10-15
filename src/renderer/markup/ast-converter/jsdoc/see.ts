import { convertJSDocReference } from "unwritten:renderer/markup/ast-converter/jsdoc/reference.js";
import { convertJSDocNodes } from "unwritten:renderer/markup/ast-converter/shared/jsdoc.js";
import { spaceBetween } from "unwritten:renderer/markup/utils/renderer.js";

import type { JSDocSeeTag } from "unwritten:interpreter/type-definitions/jsdoc.js";
import type { MarkupRenderContexts } from "unwritten:renderer/markup/types-definitions/markup.js";
import type { ConvertedJSDocSeeTag } from "unwritten:renderer/markup/types-definitions/renderer.js";


export function convertJSDocSeeTag(ctx: MarkupRenderContexts, jsdocSeeTag: JSDocSeeTag): ConvertedJSDocSeeTag {

  const content = convertJSDocNodes(ctx, jsdocSeeTag.content);

  if(!jsdocSeeTag.reference){
    return content;
  }

  const reference = convertJSDocReference(ctx, jsdocSeeTag.reference);

  return spaceBetween(
    reference,
    ...content
  );

}
