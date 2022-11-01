import { assert } from "vitest";

import { RenderContext } from "../../../types/context.js";
import { BuiltInRenderers } from "../../../types/renderer.js";
import { Complete } from "../../../types/utils.js";
import { MarkupRenderConfig } from "../types/config.js";


export function getRenderConfig(ctx: RenderContext): Complete<MarkupRenderConfig> {
  const name = ctx.renderer.name;

  assert(name === BuiltInRenderers.HTML || name === BuiltInRenderers.Markdown, "Invalid renderer");

  return ctx.config.renderConfig[name] as Complete<MarkupRenderConfig>;
}
