import { renderType } from "unwritten:renderer/markup/entry-points/types.js";

import type { TemplateLiteralType } from "unwritten:compiler/type-definitions/types.js";
import type { MarkupRenderer, RenderedStringLiteralType } from "unwritten:renderer/markup/types/renderer.js";
import type { RenderContext } from "unwritten:type-definitions/context.js";


export function renderTemplateLiteralType(ctx: RenderContext<MarkupRenderer>, templateLiteralType: TemplateLiteralType): RenderedStringLiteralType {

  const head = templateLiteralType.head ?? "";
  const types = templateLiteralType.types;
  const spans = templateLiteralType.spans;

  const renderedTemplateLiteralType = types.map((type, index) => {
    const renderedType = renderType(ctx, type);
    const span = spans[index] ?? "";
    return `$\{${renderedType}}${span}`;
  }).join("");

  return `${head}${renderedTemplateLiteralType}`;

}
