import { parseTypeNode } from "unwritten:compiler:entry-points/type-node.js";
import { TypeKind } from "unwritten:compiler:enums/types.js";
import { getIdByTypeNode } from "unwritten:compiler:shared/id.js";

import type { TemplateLiteralTypeNode } from "typescript";

import type { TemplateLiteralType } from "unwritten:compiler:type-definitions/types.js";
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
