import { renderType } from "unwritten:renderer/markup/ast/index.js";

import type { TemplateLiteralType } from "unwritten:compiler:type-definitions/types.js";
import type { RenderedStringLiteralType } from "unwritten:renderer:markup/types/renderer.js";


export function renderTemplateLiteralType(ctx: MarkupRenderContext, templateLiteralType: TemplateLiteralType): RenderedStringLiteralType {

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
