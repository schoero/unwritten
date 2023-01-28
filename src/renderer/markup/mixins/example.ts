import type { MarkupRenderer, RenderedExample } from "../types/renderer.js";

import type { Example } from "quickdoks:compiler/type-definitions/mixins.js";
import type { RenderContext } from "quickdoks:type-definitions/context.js";


export function renderExample(ctx: RenderContext<MarkupRenderer>, example: Example): RenderedExample {
  return example;
}
