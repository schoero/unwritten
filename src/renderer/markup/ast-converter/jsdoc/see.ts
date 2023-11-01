import { convertJSDocReference } from "unwritten:renderer/markup/ast-converter/jsdoc/reference";
import { convertJSDocNodes } from "unwritten:renderer/markup/ast-converter/shared/jsdoc";
import { spaceBetween } from "unwritten:renderer/markup/utils/renderer";

import type { JSDocSeeTag } from "unwritten:interpreter/type-definitions/jsdoc";
import type { MarkupRenderContexts } from "unwritten:renderer/markup/types-definitions/markup";
import type { ConvertedJSDocSeeTag } from "unwritten:renderer/markup/types-definitions/renderer";


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
