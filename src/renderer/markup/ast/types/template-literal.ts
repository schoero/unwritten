import { renderType } from "quickdoks:renderer/markup/entry-points/types.js";

import type { TemplateLiteralType } from "quickdoks:compiler/type-definitions/types.js";
import type { MarkupRenderer, RenderedStringLiteralType } from "quickdoks:renderer/markup/types/renderer.js";
import type { RenderContext } from "quickdoks:type-definitions/context.js";


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
