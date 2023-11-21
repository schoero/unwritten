import { convertJSDocReference } from "unwritten:renderer/markup/ast-converter/jsdoc/reference";
import { createLinkNode } from "unwritten:renderer/markup/utils/nodes";

import type { JSDocLink } from "unwritten:interpreter/type-definitions/jsdoc";
import type { MarkupRenderContext } from "unwritten:renderer/markup/types-definitions/markup";
import type { ConvertedJSDocTags } from "unwritten:renderer/markup/types-definitions/renderer";


export function convertJSDocLink(ctx: MarkupRenderContext, jsdocLink: JSDocLink): ConvertedJSDocTags {
  if(jsdocLink.reference){
    jsdocLink.text && (jsdocLink.reference.name = jsdocLink.text);
    return convertJSDocReference(ctx, jsdocLink.reference);
  } else {
    return createLinkNode(jsdocLink.text ?? jsdocLink.link, jsdocLink.link);
  }
}
