import { renderNode } from "unwritten:renderer/index.js";
import { convertEntityToAnchor } from "unwritten:renderer/markup/ast-converter/index.js";
import { getAnchorLink } from "unwritten:renderer/markup/registry/registry.js";
import { getRenderConfig } from "unwritten:renderer/utils/config.js";
import { renderNewLine } from "unwritten:renderer/utils/new-line.js";
import { convertType } from "unwritten:renderer:markup/ast-converter/shared/type.js";
import { createConditionalNode } from "unwritten:renderer:markup/utils/nodes.js";
import { encapsulate } from "unwritten:renderer:markup/utils/renderer.js";
import { isFunctionLikeEntity, isLinkableEntity, isSignatureEntity } from "unwritten:typeguards/entities.js";

import type { TypeReferenceType } from "unwritten:interpreter:type-definitions/types.js";
import type { MarkupRenderContexts } from "unwritten:renderer:markup/types-definitions/markup.js";
import type {
  ConvertedTypeReferenceTypeInline,
  ConvertedTypeReferenceTypeMultiline
} from "unwritten:renderer:markup/types-definitions/renderer.js";


export function convertTypeReferenceTypeInline(ctx: MarkupRenderContexts, typeReferenceType: TypeReferenceType): ConvertedTypeReferenceTypeInline {

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
    [ctx, anchor.name, anchor.id],
    "!==",
    undefined,
    anchor,
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

  const renderedNewLine = renderNewLine(ctx);

  return createConditionalNode(
    getAnchorLink,
    [ctx, typeReferenceType.name, id],
    "!==",
    undefined,
    undefined,
    [
      renderedNewLine,
      fallback
    ]
  );

}
