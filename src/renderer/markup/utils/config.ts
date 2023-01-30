import { BuiltInRenderers } from "unwritten:renderer:enums/renderer.js";
import { assert } from "unwritten:utils:general.js";

import type { MarkupRenderConfig } from "unwritten:renderer:markup/types/config.js";
import type { RenderContext } from "unwritten:type-definitions/context.d.js";
import type { Complete } from "unwritten:type-definitions/utils.js";


export function getRenderConfig(ctx: RenderContext): Complete<MarkupRenderConfig> {
  const name = ctx.renderer.name;

  assert(name === BuiltInRenderers.HTML || name === BuiltInRenderers.Markdown, "Invalid renderer");

  return ctx.config.renderConfig[name];
}
