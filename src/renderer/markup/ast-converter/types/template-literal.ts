import { convertType } from "unwritten:renderer:markup/ast-converter/shared/type";

import type { TemplateLiteralType } from "unwritten:interpreter:type-definitions/types";
import type { MarkupRenderContexts } from "unwritten:renderer:markup/types-definitions/markup";
import type { ASTNode } from "unwritten:renderer:markup/types-definitions/nodes";
import type { ConvertedTemplateLiteralTypeInline } from "unwritten:renderer:markup/types-definitions/renderer";


export function convertTemplateLiteralTypeInline(ctx: MarkupRenderContexts, templateLiteralType: TemplateLiteralType): ConvertedTemplateLiteralTypeInline {

  const head = templateLiteralType.head;
  const types = templateLiteralType.types;
  const spans = templateLiteralType.spans;

  const renderedTemplateLiteralType = types.reduce<ASTNode[]>((acc, type, index) => {
    const { inlineType } = convertType(ctx, type);
    const span = spans[index];
    return [
      ...acc,
      "${",
      inlineType,
      "}",
      span
    ];
  }, []);

  return [head, ...renderedTemplateLiteralType];

}
