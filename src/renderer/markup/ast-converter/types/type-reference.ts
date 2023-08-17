import { getAnchorLink } from "unwritten:renderer/markup/registry/registry.js";
import { getRenderConfig } from "unwritten:renderer/utils/config.js";
import { convertType } from "unwritten:renderer:markup/ast-converter/shared/type.js";
import { createAnchorNode, createConditionalNode } from "unwritten:renderer:markup/utils/nodes.js";
import { encapsulate, spaceBetween } from "unwritten:renderer:markup/utils/renderer.js";
import { isSignatureEntity } from "unwritten:typeguards/entities.js";

import type { Type, TypeReferenceType } from "unwritten:interpreter:type-definitions/types.js";
import type { MarkupRenderContexts } from "unwritten:renderer:markup/types-definitions/markup.js";
import type { ASTNode } from "unwritten:renderer:markup/types-definitions/nodes.js";
import type {
  ConvertedTypeReferenceTypeInline,
  ConvertedTypeReferenceTypeMultiline
} from "unwritten:renderer:markup/types-definitions/renderer.js";


export function convertTypeReferenceTypeInline(ctx: MarkupRenderContexts, typeReferenceType: TypeReferenceType): ConvertedTypeReferenceTypeInline {

  const fallback = (
    typeReferenceType.type &&
     convertType(ctx, typeReferenceType.type).inlineType
  ) ?? typeReferenceType.name ?? "";

  if(typeReferenceType.target === undefined){
    return fallback;
  }

  const id = isSignatureEntity(typeReferenceType.target)
    ? typeReferenceType.target.declarationId
    : typeReferenceType.target.symbolId;

  if(!id){
    return fallback;
  }

  const anchor = createAnchorNode(typeReferenceType.target.name ?? "", id, fallback);

  const typeArguments = typeReferenceType.typeArguments && typeReferenceType.typeArguments.length > 0
    ? convertTypeArguments(ctx, typeReferenceType.typeArguments)
    : "";

  return createConditionalNode(
    getAnchorLink,
    [ctx, typeReferenceType.name, id],
    "!==",
    undefined,
    spaceBetween(
      anchor,
      typeArguments
    ),
    fallback
  );

}


export function convertTypeReferenceTypeMultiline(ctx: MarkupRenderContexts, typeReferenceType: TypeReferenceType): ConvertedTypeReferenceTypeMultiline | undefined {

  const fallback = typeReferenceType.type && convertType(ctx, typeReferenceType.type).multilineType;

  if(typeReferenceType.target === undefined){
    return fallback;
  }

  const id = isSignatureEntity(typeReferenceType.target)
    ? typeReferenceType.target.declarationId
    : typeReferenceType.target.symbolId;

  if(!id){
    return fallback;
  }

  if(fallback === undefined){
    return;
  }

  return createConditionalNode(
    getAnchorLink,
    [ctx, typeReferenceType.name, id],
    "!==",
    undefined,
    "",
    fallback
  );

}


function convertTypeArguments(ctx: MarkupRenderContexts, typeArguments: Type[]): ASTNode {

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
