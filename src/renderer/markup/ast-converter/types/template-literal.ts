import { convertTypeInline } from "unwritten:renderer:markup/ast-converter/index.js";

import type { TemplateLiteralType } from "unwritten:interpreter:type-definitions/types.js";
import type { MarkupRenderContexts } from "unwritten:renderer:markup/types-definitions/markup.d.js";
import type { ASTNodes } from "unwritten:renderer:markup/types-definitions/nodes.js";
import type { ConvertedTemplateLiteralType } from "unwritten:renderer:markup/types-definitions/renderer.js";


export function convertTemplateLiteralType(ctx: MarkupRenderContexts, templateLiteralType: TemplateLiteralType): ConvertedTemplateLiteralType {

  const head = templateLiteralType.head ?? "";
  const types = templateLiteralType.types;
  const spans = templateLiteralType.spans;

  const renderedTemplateLiteralType = types.reduce<ASTNodes[]>((acc, type, index) => {
    const renderedType = convertTypeInline(ctx, type);
    const span = spans[index] ?? "";
    return [
      ...acc,
      "${",
      renderedType,
      "}",
      span
    ];
  }, []);

  return [head, ...renderedTemplateLiteralType];

}
