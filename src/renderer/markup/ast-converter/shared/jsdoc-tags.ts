import { RenderableJSDocTags } from "unwritten:renderer:markup/enums/jsdoc.js";
import { encapsulate, spaceBetween } from "unwritten:renderer:markup/utils/renderer.js";

import type { JSDocTags } from "unwritten:interpreter:type-definitions/shared.js";
import type { MarkupRenderContexts } from "unwritten:renderer:markup/types-definitions/markup.js";
import type { ASTNode } from "unwritten:renderer:markup/types-definitions/nodes.js";


export function convertJSDocTags(ctx: MarkupRenderContexts, entityWithTags: JSDocTags): ASTNode[] {

  const jsdocTagNames = Object.values(RenderableJSDocTags);

  const convertedTags = Object.keys(entityWithTags)
    .filter(key => jsdocTagNames.includes(key as RenderableJSDocTags))
    .map(key => encapsulate(key, ctx.config.renderConfig[ctx.renderer.name].tagEncapsulation));

  return spaceBetween(...convertedTags);

}

export function hasRenderableJSDocTags(jsdocTags: JSDocTags): boolean {
  return Object.keys(jsdocTags)
    .some(isRenderableJSDocTag);
}


export function isRenderableJSDocTag(jsdocTagName: string): boolean {
  const jsdocTagNames = Object.values(RenderableJSDocTags);
  return jsdocTagNames.includes(jsdocTagName as RenderableJSDocTags);
}
