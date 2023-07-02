import { convertType } from "unwritten:renderer/markup/ast-converter/shared/type.js";
import { isSymbolExported } from "unwritten:renderer/markup/utils/exports.js";
import { isMultilineType } from "unwritten:renderer/markup/utils/types.js";
import { getRenderConfig } from "unwritten:renderer/utils/config.js";
import { createAnchorNode } from "unwritten:renderer:markup/utils/nodes.js";
import { encapsulate, spaceBetween } from "unwritten:renderer:markup/utils/renderer.js";

import type { TypeReferenceType, Types } from "unwritten:interpreter:type-definitions/types.js";
import type { MarkupRenderContexts } from "unwritten:renderer:markup/types-definitions/markup.d.js";
import type { ASTNodes } from "unwritten:renderer:markup/types-definitions/nodes.js";
import type {
  ConvertedMultilineTypes,
  ConvertedTypeReferenceTypeInline
} from "unwritten:renderer:markup/types-definitions/renderer.js";


export function convertTypeReferenceTypeInline(ctx: MarkupRenderContexts, typeReferenceType: TypeReferenceType): ConvertedTypeReferenceTypeInline {

  const name = typeReferenceType.name ?? "";

  if(typeReferenceType.symbolId && isSymbolExported(ctx, typeReferenceType.symbolId)){

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

  if(typeReferenceType.type){
    return convertType(ctx, typeReferenceType.type).inlineType;
  }

  return name;

}


export function convertTypeReferenceTypeMultiline(ctx: MarkupRenderContexts, typeReferenceType: TypeReferenceType): ConvertedMultilineTypes | undefined {

  if(typeReferenceType.type !== undefined &&
    isMultilineType(ctx, typeReferenceType.type) &&
    "symbolId" in typeReferenceType.type &&
    typeReferenceType.type.symbolId &&
    !isSymbolExported(ctx, typeReferenceType.type.symbolId)){
    return convertType(ctx, typeReferenceType.type).multilineType!;
  }

}


function convertTypeArguments(ctx: MarkupRenderContexts, typeArguments: Types[]): ASTNodes {

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
