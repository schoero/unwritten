import { BuiltInRenderers } from "quickdoks:renderer/enums/renderer.js";
import { assert } from "quickdoks:utils:general.js";

import type { MarkupRenderConfig } from "quickdoks:renderer:markup/types/config.js";
import type { RenderContext } from "quickdoks:type-definitions/context.d.js";
import type { Complete } from "quickdoks:type-definitions/utils.js";


export function getRenderConfig(ctx: RenderContext): Complete<MarkupRenderConfig> {
  const name = ctx.renderer.name;

  assert(name === BuiltInRenderers.HTML || name === BuiltInRenderers.Markdown, "Invalid renderer");

  return ctx.config.renderConfig[name];
}
