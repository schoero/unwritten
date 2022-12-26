import { MarkupRenderConfig } from "quickdoks:renderer:markup/types/config.js";
import { assert } from "quickdoks:utils:general.js";

import { RenderContext } from "quickdoks:type-definitions/context.d.js";
import { BuiltInRenderers } from "quickdoks:type-definitions/renderer.d.js";
import { Complete } from "quickdoks:type-definitions/utils.d.js";


export function getRenderConfig(ctx: RenderContext): Complete<MarkupRenderConfig> {
  const name = ctx.renderer.name;

  assert(name === BuiltInRenderers.HTML || name === BuiltInRenderers.Markdown, "Invalid renderer");

  return ctx.config.renderConfig[name];
}
