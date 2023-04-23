import { createSmallNode } from "unwritten:renderer/markup/utils/nodes.js";
import { RenderableJSDocTags } from "unwritten:renderer:markup/enums/jsdoc.js";
import { encapsulate } from "unwritten:renderer:markup/utils/renderer.js";

import type { JSDocTags } from "unwritten:interpreter:type-definitions/shared.js";
import type { ConvertedTags } from "unwritten:renderer/markup/types-definitions/renderer.js";
import type { MarkupRenderContexts } from "unwritten:renderer:markup/types-definitions/markup.js";


export function hasRenderableJSDocTags(jsdocTags: JSDocTags): boolean {
  return Object.keys(jsdocTags)
    .some(isRenderableJSDocTag);
}

export function isRenderableJSDocTag(jsdocTagName: string): boolean {
  const jsdocTagNames = Object.values(RenderableJSDocTags);
  return jsdocTagNames.includes(jsdocTagName as RenderableJSDocTags);
}


export function convertJSDocTags(ctx: MarkupRenderContexts, jsdocTags: JSDocTags): ConvertedTags {

  const jsdocTagNames = Object.values(RenderableJSDocTags);

  const convertedTags = Object.keys(jsdocTags)
    .filter(key => jsdocTagNames.includes(key as RenderableJSDocTags))
    .map(key => encapsulate(key, ctx.config.renderConfig[ctx.renderer.name].tagEncapsulation))
    .join(" ");

  return convertedTags
    ? createSmallNode(convertedTags)
    : "";

}
