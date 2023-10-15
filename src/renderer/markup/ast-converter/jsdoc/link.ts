import { convertJSDocReference } from "unwritten:renderer/markup/ast-converter/jsdoc/reference.js";
import { createLinkNode } from "unwritten:renderer/markup/utils/nodes.js";

import type { JSDocLink } from "unwritten:interpreter/type-definitions/jsdoc.js";
import type { MarkupRenderContexts } from "unwritten:renderer/markup/types-definitions/markup.js";
import type { ConvertedJSDocTags } from "unwritten:renderer/markup/types-definitions/renderer.js";


export function convertJSDocLink(ctx: MarkupRenderContexts, jsdocLink: JSDocLink): ConvertedJSDocTags {
  if(jsdocLink.reference){
    jsdocLink.text && (jsdocLink.reference.name = jsdocLink.text);
    return convertJSDocReference(ctx, jsdocLink.reference);
  } else {
    return createLinkNode(jsdocLink.text ?? jsdocLink.link, jsdocLink.link);
  }
}
