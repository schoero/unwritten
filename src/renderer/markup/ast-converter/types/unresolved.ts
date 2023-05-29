import { convertTypeForType } from "unwritten:renderer/markup/ast-converter/shared/type.js";
import { getRenderConfig } from "unwritten:renderer/utils/config.js";
import { createAnchorNode } from "unwritten:renderer:markup/utils/nodes.js";
import { encapsulate, spaceBetween } from "unwritten:renderer:markup/utils/renderer.js";

import type { Types, UnresolvedType } from "unwritten:interpreter:type-definitions/types.js";
import type { MarkupRenderContexts } from "unwritten:renderer:markup/types-definitions/markup.d.js";
import type { ASTNodes } from "unwritten:renderer:markup/types-definitions/nodes.js";
import type { ConvertedTypeReferenceType } from "unwritten:renderer:markup/types-definitions/renderer.js";


export function convertUnresolvedType(ctx: MarkupRenderContexts, unresolvedType: UnresolvedType): ConvertedTypeReferenceType {

  const name = unresolvedType.name ?? "";

  const anchor = unresolvedType.symbolId
    ? createAnchorNode(name, unresolvedType.symbolId)
    : undefined;

  const typeArguments = unresolvedType.typeArguments
    ? convertTypeArguments(ctx, unresolvedType.typeArguments)
    : "";

  return spaceBetween(
    anchor ?? name,
    typeArguments
  );

}


function convertTypeArguments(ctx: MarkupRenderContexts, typeArguments: Types[]): ASTNodes {

  const renderConfig = getRenderConfig(ctx);

  const convertedTypeArguments = typeArguments.map((typeArgument, index) => {
    const convertedTypeArgument = convertTypeForType(ctx, typeArgument);
    if(index === 0){
      return convertedTypeArgument;
    } else {
      return [", ", convertedTypeArgument];
    }
  }, []);

  return encapsulate(convertedTypeArguments, renderConfig.typeParameterEncapsulation);

}
