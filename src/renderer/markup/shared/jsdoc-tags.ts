import { RenderableJSDocTags } from "../enums/jsdoc.js";
import { encapsulate } from "../utils/renderer.js";

import type { MarkupRenderContext } from "../types-definitions/markup.js";

import type { JSDocTags } from "unwritten:compiler/type-definitions/shared.js";


export function renderJSDocTags(ctx: MarkupRenderContext, jsdocTags: JSDocTags): string {

  const jsdocTagNames = Object.values(RenderableJSDocTags);

  return Object.keys(jsdocTags)
    .filter(key => jsdocTagNames.includes(key as RenderableJSDocTags))
    .map(key => encapsulate(key, ctx.config.renderConfig[ctx.renderer.name].tagEncapsulation))
    .join(" ");

}


export function hasRenderableJSDocTags(jsdocTags: JSDocTags): boolean {

  const jsdocTagNames = Object.values(RenderableJSDocTags);

  return Object.keys(jsdocTags)
    .some(key => jsdocTagNames.includes(key as RenderableJSDocTags));

}
