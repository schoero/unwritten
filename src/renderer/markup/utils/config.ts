import { assert } from "quickdoks:utilsgeneral.js";

import { MarkupRenderConfig } from "quickdoks:renderer:markup/types/config.js";
import { RenderContext } from "quickdoks:types:context.js";
import { BuiltInRenderers } from "quickdoks:types:renderer.js";
import { Complete } from "quickdoks:types:utils.js";


export function getRenderConfig(ctx: RenderContext): Complete<MarkupRenderConfig> {
  const name = ctx.renderer.name;

  assert(name === BuiltInRenderers.HTML || name === BuiltInRenderers.Markdown, "Invalid renderer");

  return ctx.config.renderConfig[name];
}
