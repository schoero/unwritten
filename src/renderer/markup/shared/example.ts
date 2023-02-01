import type { MarkupRenderer, RenderedExample } from "../types/renderer.js";

import type { Example } from "unwritten:compiler:type-definitions/mixins.js";
import type { RenderContext } from "unwritten:type-definitions/context.js";


export function renderExample(ctx: MarkupRenderContext, example: Example): RenderedExample {
  return example;
}
