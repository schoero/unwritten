import { convertDescription } from "unwritten:renderer/markup/ast-converter/shared/description.js";
import { convertExample } from "unwritten:renderer/markup/ast-converter/shared/example.js";
import { convertRemarks } from "unwritten:renderer/markup/ast-converter/shared/remarks.js";
import { convertTags } from "unwritten:renderer/markup/ast-converter/shared/tags.js";
import { convertTypeInline } from "unwritten:renderer/markup/ast-converter/shared/type.js";
import { getRenderConfig } from "unwritten:renderer/markup/utils/config.js";
import { getTranslator } from "unwritten:renderer/markup/utils/translations.js";
import {
  convertParameterEntitiesForDocumentation,
  convertParameterEntitiesForSignature,
  convertTypeParameterEntitiesForDocumentation,
  convertTypeParameterEntitiesForSignature
} from "unwritten:renderer:markup/ast-converter/entities/index.js";
import { convertPosition } from "unwritten:renderer:markup/ast-converter/shared/position.js";
import { createLinkNode, createTitleNode } from "unwritten:renderer:markup/utils/nodes.js";
import { encapsulate, spaceBetween } from "unwritten:renderer:markup/utils/renderer.js";

import type { SignatureEntity } from "unwritten:interpreter:type-definitions/entities.js";
import type { MarkupRenderContexts } from "unwritten:renderer:markup/types-definitions/markup.d.js";
import type {
  ConvertedSignatureEntityForDocumentation,
  ConvertedSignatureEntityForTableOfContents,
  ConvertedSignatureEntityForType
} from "unwritten:renderer:markup/types-definitions/renderer.js";


export function convertSignatureEntityForTableOfContents(ctx: MarkupRenderContexts, signatureEntity: SignatureEntity): ConvertedSignatureEntityForTableOfContents {

  const id = signatureEntity.declarationId;

  const renderedSignature = renderSignature(ctx, signatureEntity);

  return createLinkNode(
    renderedSignature,
    id
  );

}


export function convertSignatureEntityForDocumentation(ctx: MarkupRenderContexts, signatureEntity: SignatureEntity): ConvertedSignatureEntityForDocumentation {

  const id = signatureEntity.declarationId;
  const renderedSignature = renderSignature(ctx, signatureEntity);

  const convertedPosition = convertPosition(ctx, signatureEntity.position);
  const convertedTags = convertTags(ctx, signatureEntity);
  const convertedTypeParameters = convertTypeParameterEntitiesForDocumentation(ctx, signatureEntity.typeParameters);
  const convertedParameters = convertParameterEntitiesForDocumentation(ctx, signatureEntity.parameters);
  const convertedReturnType = convertReturnType(ctx, signatureEntity);
  const convertedDescription = convertDescription(ctx, signatureEntity.description);
  const convertedExample = convertExample(ctx, signatureEntity.example);
  const convertedRemarks = convertRemarks(ctx, signatureEntity.remarks);

  return createTitleNode(
    renderedSignature,
    id,
    convertedPosition,
    convertedTags,
    convertedTypeParameters,
    convertedParameters,
    convertedReturnType,
    convertedDescription,
    convertedRemarks,
    convertedExample
  );
}


export function convertSignatureEntityForType(ctx: MarkupRenderContexts, signatureEntity: SignatureEntity): ConvertedSignatureEntityForType {

  const renderedSignature = renderSignature(ctx, signatureEntity);

  const convertedPosition = convertPosition(ctx, signatureEntity.position);
  const convertedTags = convertTags(ctx, signatureEntity);
  const convertedTypeParameters = convertTypeParameterEntitiesForDocumentation(ctx, signatureEntity.typeParameters);
  const convertedParameters = convertParameterEntitiesForDocumentation(ctx, signatureEntity.parameters);
  const convertedReturnType = convertReturnType(ctx, signatureEntity);
  const convertedDescription = convertDescription(ctx, signatureEntity.description);
  const convertedExample = convertExample(ctx, signatureEntity.example);
  const convertedRemarks = convertRemarks(ctx, signatureEntity.remarks);

  return [
    renderedSignature,
    convertedPosition,
    convertedTags,
    convertedTypeParameters,
    convertedParameters,
    convertedReturnType,
    convertedDescription,
    convertedRemarks,
    convertedExample
  ];

}


function renderSignature(ctx: MarkupRenderContexts, signatureEntity: SignatureEntity) {

  const renderConfig = getRenderConfig(ctx);

  const name = signatureEntity.name ?? "";

  const renderedTypeParameters = signatureEntity.typeParameters
    ? convertTypeParameterEntitiesForSignature(ctx, signatureEntity.typeParameters)
    : "";

  const encapsulatedTypeParameters = renderedTypeParameters
    ? encapsulate(renderedTypeParameters, renderConfig.typeParameterEncapsulation)
    : "";

  const renderedParameters = signatureEntity.parameters
    ? convertParameterEntitiesForSignature(ctx, signatureEntity.parameters)
    : "";

  return [
    name,
    encapsulatedTypeParameters,
    "(",
    renderedParameters,
    ")"
  ];

}


function convertReturnType(ctx: MarkupRenderContexts, signatureEntity: SignatureEntity) {

  const t = getTranslator(ctx);

  const convertedReturnType = convertTypeInline(ctx, signatureEntity.returnType);
  const returnDescription = signatureEntity.returnType.description ?? "";
  const convertedReturnTypeWithDescription = spaceBetween(
    convertedReturnType,
    returnDescription
  );

  return createTitleNode(
    t("returns"),
    convertedReturnTypeWithDescription
  );

}
