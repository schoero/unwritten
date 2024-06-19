import { renderNode } from "unwritten:renderer/index";
import { convertEntityToAnchor } from "unwritten:renderer/markup/ast-converter/index";
import { getAnchorLink } from "unwritten:renderer/markup/registry/registry";
import { getRenderConfig } from "unwritten:renderer/utils/config";
import { renderNewLine } from "unwritten:renderer/utils/new-line";
import { convertType } from "unwritten:renderer:markup/ast-converter/shared/type";
import { createConditionalNode } from "unwritten:renderer:markup/utils/nodes";
import { encapsulate } from "unwritten:renderer:markup/utils/renderer";
import { isFunctionLikeEntity, isLinkableEntity, isSignatureEntity } from "unwritten:typeguards/entities";

import type { TypeReferenceType } from "unwritten:interpreter:type-definitions/types";
import type { MarkupRenderContext } from "unwritten:renderer:markup/types-definitions/markup";
import type {
  ConvertedTypeReferenceTypeInline,
  ConvertedTypeReferenceTypeMultiline
} from "unwritten:renderer:markup/types-definitions/renderer";


export function convertTypeReferenceTypeInline(ctx: MarkupRenderContext, typeReferenceType: TypeReferenceType): ConvertedTypeReferenceTypeInline {

  const renderConfig = getRenderConfig(ctx);

  const fallback = typeReferenceType.type
    ? convertType(ctx, typeReferenceType.type).inlineType
    : encapsulate(typeReferenceType.name ?? "", renderConfig.typeEncapsulation);

  if(typeReferenceType.target === undefined){
    return fallback;
  }

  // Use the first signature if the target is a function-like entity
  const entity = isFunctionLikeEntity(typeReferenceType.target)
    ? typeReferenceType.target.signatures[0]
    : typeReferenceType.target;

  if(!isLinkableEntity(entity)){
    return fallback;
  }

  const encapsulatedName = encapsulate(typeReferenceType.name ?? entity.name, renderConfig.typeEncapsulation);
  const renderedName = renderNode(ctx, encapsulatedName);

  const anchor = convertEntityToAnchor(ctx, entity, renderedName);

  return createConditionalNode(
    getAnchorLink,
    [ctx, anchor.id],
    "!==",
    undefined,
    anchor,
    fallback
  );

}


export function convertTypeReferenceTypeMultiline(ctx: MarkupRenderContext, typeReferenceType: TypeReferenceType): ConvertedTypeReferenceTypeMultiline | undefined {

  const fallback = typeReferenceType.type && convertType(ctx, typeReferenceType.type).multilineType;

  if(typeReferenceType.target === undefined){
    return fallback;
  }

  const id = isSignatureEntity(typeReferenceType.target)
    ? typeReferenceType.target.declarationId
      ? Number.MAX_SAFE_INTEGER - typeReferenceType.target.declarationId
      : undefined
    : typeReferenceType.target.symbolId;

  if(!id){
    return fallback;
  }

  if(fallback === undefined){
    return;
  }

  const renderedNewLine = renderNewLine(ctx);

  return createConditionalNode(
    getAnchorLink,
    [ctx, id],
    "!==",
    undefined,
    undefined,
    [
      renderedNewLine,
      fallback
    ]
  );

}
