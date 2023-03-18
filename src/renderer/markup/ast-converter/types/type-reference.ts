import { convertType } from "unwritten:renderer:markup/ast-converter/index.js";
import { getRenderConfig } from "unwritten:renderer:markup/utils/config.js";
import { createLinkNode } from "unwritten:renderer:markup/utils/nodes.js";
import { encapsulate, spaceBetween } from "unwritten:renderer:markup/utils/renderer.js";

import type { TypeReferenceType, Types } from "unwritten:interpreter:type-definitions/types.js";
import type { MarkupRenderContexts } from "unwritten:renderer:markup/types-definitions/markup.d.js";
import type { ASTNodes } from "unwritten:renderer:markup/types-definitions/nodes.js";
import type { ConvertedTypeReferenceType } from "unwritten:renderer:markup/types-definitions/renderer.js";


export function convertTypeReferenceType(ctx: MarkupRenderContexts, typeReferenceType: TypeReferenceType): ConvertedTypeReferenceType {

  const name = typeReferenceType.name ?? "";

  const link = typeReferenceType.symbolId
    ? createLinkNode(name, typeReferenceType.symbolId)
    : undefined;

  const typeArguments = typeReferenceType.typeArguments
    ? convertTypeArguments(ctx, typeReferenceType.typeArguments)
    : "";

  return spaceBetween(
    link ?? name,
    typeArguments
  );

}


function convertTypeArguments(ctx: MarkupRenderContexts, typeArguments: Types[]): ASTNodes {

  const renderConfig = getRenderConfig(ctx);

  const convertedTypeArguments = typeArguments.map((typeArgument, index) => {
    const convertedTypeArgument = convertType(ctx, typeArgument);
    if(index === 0){
      return convertedTypeArgument;
    } else {
      return [", ", convertedTypeArgument];
    }
  }, []);

  return encapsulate(convertedTypeArguments, renderConfig.typeParameterEncapsulation);

}
