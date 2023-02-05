import type { MarkupRenderContext, RenderedExample } from "../types/renderer.js";

import type { Example } from "unwritten:compiler/type-definitions/shared.js";


export function renderExample(ctx: MarkupRenderContext, example: Example): RenderedExample {
  return example;
}
