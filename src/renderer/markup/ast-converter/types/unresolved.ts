import { createLinkNode } from "unwritten:renderer:markup/utils/nodes";
import { encapsulate, spaceBetween } from "unwritten:renderer:markup/utils/renderer";
import { convertTypeArguments } from "unwritten:renderer/markup/utils/type-arguments";
import { getRenderConfig } from "unwritten:renderer/utils/config";

import type { UnresolvedType } from "unwritten:interpreter:type-definitions/types";
import type { MarkupRenderContext } from "unwritten:renderer:markup/types-definitions/markup";
import type { ConvertedTypeReferenceTypeInline } from "unwritten:renderer:markup/types-definitions/renderer";


export function convertUnresolvedTypeInline(ctx: MarkupRenderContext, unresolvedType: UnresolvedType): ConvertedTypeReferenceTypeInline {

  const renderConfig = getRenderConfig(ctx);

  const name = unresolvedType.name;
  const encapsulatedName = name &&
    encapsulate(name, renderConfig.typeEncapsulation);

  const link = name && name in ctx.config.externalTypes &&
    createLinkNode(encapsulatedName, ctx.config.externalTypes[name]!);

  const typeArguments = unresolvedType.typeArguments && unresolvedType.typeArguments.length > 0 &&
    convertTypeArguments(ctx, unresolvedType.typeArguments);

  return spaceBetween(
    link || encapsulatedName,
    typeArguments
  );

}
