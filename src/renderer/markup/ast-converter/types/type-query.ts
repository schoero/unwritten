import { renderNode } from "unwritten:renderer";
import { convertEntityToAnchor } from "unwritten:renderer/markup/ast-converter";
import { getAnchorLink } from "unwritten:renderer/markup/registry/registry";
import { createConditionalNode } from "unwritten:renderer/markup/utils/nodes";
import { spaceBetween } from "unwritten:renderer/markup/utils/renderer";
import { convertTypeArguments } from "unwritten:renderer/markup/utils/type-arguments";
import { isFunctionLikeEntity, isLinkableEntity, isSignatureEntity } from "unwritten:typeguards/entities";

import type { TypeQueryType } from "unwritten:interpreter:type-definitions/types";
import type { MarkupRenderContext } from "unwritten:renderer:markup/types-definitions/markup";
import type { ConvertedTypeQueryTypeInline } from "unwritten:renderer:markup/types-definitions/renderer";


export function convertTypeQueryTypeInline(ctx: MarkupRenderContext, typeQueryType: TypeQueryType): ConvertedTypeQueryTypeInline {

  const typeArguments = typeQueryType.typeArguments && typeQueryType.typeArguments.length > 0 &&
    convertTypeArguments(ctx, typeQueryType.typeArguments);

  const fallback = [
    spaceBetween(
      "typeof",
      renderNode(ctx, typeQueryType.target?.name ?? typeQueryType.name)
    ),
    typeArguments
  ];

  const entity = typeQueryType.target && isFunctionLikeEntity(typeQueryType.target)
    ? typeQueryType.target.signatures[0]
    : typeQueryType.target;

  if(!entity || !typeQueryType.target || !isLinkableEntity(entity)){
    return fallback;
  }

  const id = isSignatureEntity(typeQueryType.target)
    ? typeQueryType.target.declarationId
      ? Number.MAX_SAFE_INTEGER - typeQueryType.target.declarationId
      : undefined
    : typeQueryType.target.symbolId;

  const anchor = convertEntityToAnchor(ctx, entity, typeQueryType.target?.name ?? typeQueryType.name);

  return [
    ...spaceBetween(
      "typeof",
      createConditionalNode(
        getAnchorLink,
        [ctx, id],
        "!==",
        undefined,
        anchor,
        typeQueryType.target?.name ?? typeQueryType.name
      )
    ),
    typeArguments
  ];
}
