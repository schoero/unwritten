import { BuiltInRenderers } from "quickdoks:compiler:type-definitions/renderer.d.js";
import { assert } from "quickdoks:utils:general.js";

import type { Complete } from "quickdoks:compiler:type-definitions/utils.d.js";
import type { MarkupRenderConfig } from "quickdoks:renderer:markup/types/config.js";
import type { RenderContext } from "quickdoks:type-definitions/context.d.js";


export function getRenderConfig(ctx: RenderContext): Complete<MarkupRenderConfig> {
  const name = ctx.renderer.name;

  assert(name === BuiltInRenderers.HTML || name === BuiltInRenderers.Markdown, "Invalid renderer");

  return ctx.config.renderConfig[name];
}
