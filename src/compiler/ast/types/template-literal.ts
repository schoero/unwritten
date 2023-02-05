import { getIdByTypeNode } from "unwritten:compiler/ast/shared/id.js";
import { parseTypeNode } from "unwritten:compiler:ast/index.js";
import { TypeKind } from "unwritten:compiler:enums/types.js";

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
