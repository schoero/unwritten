import { getTypeByTypeNode } from "unwritten:interpreter/ast/index.js";
import { TypeKind } from "unwritten:interpreter/enums/type.js";
import { getIdByTypeNode } from "unwritten:interpreter:ast/shared/id.js";

import type { TemplateLiteralTypeNode } from "typescript";

import type { TemplateLiteralType } from "unwritten:interpreter:type-definitions/types.js";
import type { InterpreterContext } from "unwritten:type-definitions/context.js";


export function createTemplateLiteralType(ctx: InterpreterContext, typeNode: TemplateLiteralTypeNode): TemplateLiteralType {

  const typeId = getIdByTypeNode(ctx, typeNode);
  const head = typeNode.head.text;
  const spans = typeNode.templateSpans.map(span => span.literal.text);
  const types = typeNode.templateSpans.map(span => getTypeByTypeNode(ctx, span.type));
  const kind = TypeKind.TemplateLiteral;

  return {
    head,
    kind,
    spans,
    typeId,
    types
  };

}
