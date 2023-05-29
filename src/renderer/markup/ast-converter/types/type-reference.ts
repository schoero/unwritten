import { convertTypeForType } from "unwritten:renderer/markup/ast-converter/shared/type.js";
import { getRenderConfig } from "unwritten:renderer/utils/config.js";
import { createAnchorNode } from "unwritten:renderer:markup/utils/nodes.js";
import { encapsulate, spaceBetween } from "unwritten:renderer:markup/utils/renderer.js";

import type { TypeReferenceType, Types } from "unwritten:interpreter:type-definitions/types.js";
import type { MarkupRenderContexts } from "unwritten:renderer:markup/types-definitions/markup.d.js";
import type { ASTNodes } from "unwritten:renderer:markup/types-definitions/nodes.js";
import type { ConvertedTypeReferenceType } from "unwritten:renderer:markup/types-definitions/renderer.js";


export function convertTypeReferenceType(ctx: MarkupRenderContexts, typeReferenceType: TypeReferenceType): ConvertedTypeReferenceType {

  const name = typeReferenceType.name ?? "";

  const anchor = typeReferenceType.symbolId
    ? createAnchorNode(name, typeReferenceType.symbolId)
    : undefined;

  const typeArguments = typeReferenceType.typeArguments
    ? convertTypeArguments(ctx, typeReferenceType.typeArguments)
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
