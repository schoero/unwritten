import { renderNode } from "unwritten:renderer/index.js";
import { convertDescription } from "unwritten:renderer/markup/ast-converter/shared/description.js";
import { convertExample } from "unwritten:renderer/markup/ast-converter/shared/example.js";
import { convertRemarks } from "unwritten:renderer/markup/ast-converter/shared/remarks.js";
import { convertTags } from "unwritten:renderer/markup/ast-converter/shared/tags.js";
import { convertTypeInline } from "unwritten:renderer/markup/ast-converter/shared/type.js";
import { getRenderConfig } from "unwritten:renderer/markup/utils/config.js";
import { createAnchor } from "unwritten:renderer/markup/utils/linker.js";
import { getTranslator } from "unwritten:renderer/markup/utils/translations.js";
import {
  convertParameterEntitiesForDocumentation,
  convertParameterEntitiesForSignature,
  convertTypeParameterEntitiesForDocumentation,
  convertTypeParameterEntitiesForSignature
} from "unwritten:renderer:markup/ast-converter/entities/index.js";
import { convertPosition } from "unwritten:renderer:markup/ast-converter/shared/position.js";
import { createAnchorNode, createTitleNode } from "unwritten:renderer:markup/utils/nodes.js";
import { encapsulate, spaceBetween } from "unwritten:renderer:markup/utils/renderer.js";

import type { SignatureEntity } from "unwritten:interpreter:type-definitions/entities.js";
import type { ASTNodes } from "unwritten:renderer/markup/types-definitions/nodes.js";
import type { MarkupRenderContexts } from "unwritten:renderer:markup/types-definitions/markup.d.js";
import type {
  ConvertedSignatureEntityForDocumentation,
  ConvertedSignatureEntityForTableOfContents,
  ConvertedSignatureEntityForType
} from "unwritten:renderer:markup/types-definitions/renderer.js";


export function convertSignatureEntityForTableOfContents(ctx: MarkupRenderContexts, signatureEntity: SignatureEntity): ConvertedSignatureEntityForTableOfContents {

  const convertedSignature = convertSignature(ctx, signatureEntity);
  const renderedSignature = renderNode(ctx, convertedSignature);
  const id = signatureEntity.declarationId;

  return createAnchorNode(
    renderedSignature,
    id
  );

}


export function convertSignatureEntityForDocumentation(ctx: MarkupRenderContexts, signatureEntity: SignatureEntity): ConvertedSignatureEntityForDocumentation {

  const id = signatureEntity.declarationId;

  const convertedSignature = convertSignature(ctx, signatureEntity);
  const convertedPosition = convertPosition(ctx, signatureEntity.position);
  const convertedTags = convertTags(ctx, signatureEntity);
  const convertedTypeParameters = convertTypeParameterEntitiesForDocumentation(ctx, signatureEntity.typeParameters);
  const convertedParameters = convertParameterEntitiesForDocumentation(ctx, signatureEntity.parameters);
  const convertedReturnType = convertReturnType(ctx, signatureEntity);
  const convertedDescription = convertDescription(ctx, signatureEntity.description);
  const convertedExample = convertExample(ctx, signatureEntity.example);
  const convertedRemarks = convertRemarks(ctx, signatureEntity.remarks);

  const renderedSignature = renderNode(ctx, convertedSignature);
  const anchor = createAnchor(renderedSignature, id);

  return createTitleNode(
    convertedSignature,
    anchor,
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

  const convertedSignature = convertSignature(ctx, signatureEntity);
  const convertedPosition = convertPosition(ctx, signatureEntity.position);
  const convertedTags = convertTags(ctx, signatureEntity);
  const convertedTypeParameters = convertTypeParameterEntitiesForDocumentation(ctx, signatureEntity.typeParameters);
  const convertedParameters = convertParameterEntitiesForDocumentation(ctx, signatureEntity.parameters);
  const convertedReturnType = convertReturnType(ctx, signatureEntity);
  const convertedDescription = convertDescription(ctx, signatureEntity.description);
  const convertedExample = convertExample(ctx, signatureEntity.example);
  const convertedRemarks = convertRemarks(ctx, signatureEntity.remarks);

  return [
    convertedSignature,
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


function convertSignature(ctx: MarkupRenderContexts, signatureEntity: SignatureEntity): ASTNodes {

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
    t("return-type"),
    convertedReturnTypeWithDescription
  );

}
