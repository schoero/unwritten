import { parseTypeNode } from "quickdoks:compiler:entry-points/type-node.js";
import { EntityKind } from "quickdoks:compiler:enums/entities.js";
import { getIdByTypeNode } from "quickdoks:compiler:mixins/id.js";

import type { TemplateLiteralTypeNode } from "typescript";

import type { TemplateLiteralEntity } from "quickdoks:compiler:type-definitions/entities.d.js";
import type { CompilerContext } from "quickdoks:type-definitions/context.d.js";


export function createTemplateLiteralEntity(ctx: CompilerContext, typeNode: TemplateLiteralTypeNode): TemplateLiteralEntity {

  const kind = EntityKind.TemplateLiteral;
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
