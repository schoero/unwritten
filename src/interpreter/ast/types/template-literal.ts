import { parseTypeNode } from "unwritten:interpreter/ast/index.js";
import { getIdByTypeNode } from "unwritten:interpreter/ast/shared/id.js";
import { TypeKind } from "unwritten:interpreter/enums/types.js";

import type { TemplateLiteralTypeNode } from "typescript";

import type { TemplateLiteralType } from "unwritten:interpreter/type-definitions/types.js";
import type { CompilerContext } from "unwritten:type-definitions/context.d.js";


export function createTemplateLiteralType(ctx: CompilerContext, typeNode: TemplateLiteralTypeNode): TemplateLiteralType {

  const id = getIdByTypeNode(ctx, typeNode);
  const head = typeNode.head.text;
  const spans = typeNode.templateSpans.map(span => span.literal.text);
  const types = typeNode.templateSpans.map(span => parseTypeNode(ctx, span.type));
  const kind = TypeKind.TemplateLiteral;

  return {
    head,
    id,
    kind,
    spans,
    types
  };

}
