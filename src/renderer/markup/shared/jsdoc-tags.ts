import { RenderableJSDocTags } from "../enums/jsdoc.js";
import { encapsulate } from "../utils/renderer.js";

import type { MarkupRenderContext, RenderedJSDocTags } from "../types/renderer.js";

import type { JSDocTags } from "unwritten:compiler:type-definitions/mixins.js";


export function renderJSDocTags(ctx: MarkupRenderContext, jsdocTags: JSDocTags): RenderedJSDocTags {

  const jsdocTagNames = Object.values(RenderableJSDocTags);

  return Object.keys(jsdocTags)
    .filter(key => jsdocTagNames.includes(key as RenderableJSDocTags))
    .map(key => encapsulate(key, ctx.config.renderConfig[ctx.renderer.name].tagEncapsulation))
    .join(" ") || undefined;

}


export function hasRenderableJSDocTags(jsdocTags: JSDocTags): boolean {

  const jsdocTagNames = Object.values(RenderableJSDocTags);

  return Object.keys(jsdocTags)
    .some(key => jsdocTagNames.includes(key as RenderableJSDocTags));

}
