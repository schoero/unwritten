import { getRenderConfig } from "unwritten:renderer/utils/config.js";
import { convertType } from "unwritten:renderer:markup/ast-converter/shared/type.js";
import { createLinkNode } from "unwritten:renderer:markup/utils/nodes.js";
import { encapsulate, spaceBetween } from "unwritten:renderer:markup/utils/renderer.js";

import type { Type, UnresolvedType } from "unwritten:interpreter:type-definitions/types.js";
import type { MarkupRenderContexts } from "unwritten:renderer:markup/types-definitions/markup.js";
import type { ASTNodes } from "unwritten:renderer:markup/types-definitions/nodes.js";
import type { ConvertedTypeReferenceTypeInline } from "unwritten:renderer:markup/types-definitions/renderer.js";


export function convertUnresolvedTypeInline(ctx: MarkupRenderContexts, unresolvedType: UnresolvedType): ConvertedTypeReferenceTypeInline {

  const name = unresolvedType.name ?? "";

  const link = name &&
    name in ctx.config.externalTypes
    ? createLinkNode(name, ctx.config.externalTypes[name]!)
    : undefined;

  const typeArguments = unresolvedType.typeArguments && unresolvedType.typeArguments.length > 0
    ? convertTypeArguments(ctx, unresolvedType.typeArguments)
    : "";

  return spaceBetween(
    link ?? name,
    typeArguments
  );

}


function convertTypeArguments(ctx: MarkupRenderContexts, typeArguments: Type[]): ASTNodes {

  const renderConfig = getRenderConfig(ctx);

  const convertedTypeArguments = typeArguments.map((typeArgument, index) => {
    const { inlineType } = convertType(ctx, typeArgument);
    if(index === 0){
      return inlineType;
    } else {
      return [", ", inlineType];
    }
  }, []);

  return encapsulate(convertedTypeArguments, renderConfig.typeParameterEncapsulation);

}
