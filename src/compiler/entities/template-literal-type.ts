import { TemplateLiteralTypeNode } from "typescript";

import { getIdByTypeNode } from "quickdoks:compiler:compositions/id.js";
import { parseTypeNode } from "quickdoks:compiler:entry-points/type-node.js";
import { CompilerContext } from "quickdoks:types:context.js";
import { Kind, TemplateLiteralType } from "quickdoks:types:types.js";


export function createTemplateLiteralTypeByTypeNode(ctx: CompilerContext, typeNode: TemplateLiteralTypeNode): TemplateLiteralType {

  const kind = Kind.TemplateLiteral;
  const id = getIdByTypeNode(ctx, typeNode);
  const head = typeNode.head.text;
  const spans = typeNode.templateSpans.map(span => span.literal.text);
  const types = typeNode.templateSpans.map(span => parseTypeNode(ctx, span.type));

  return {
    head,
    id,
    kind,
    spans,
    types
  };

}
