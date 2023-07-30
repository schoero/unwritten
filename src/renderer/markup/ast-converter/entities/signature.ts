import { renderNode } from "unwritten:renderer/index.js";
import { registerAnchor } from "unwritten:renderer/markup/registry/registry.js";
import { getRenderConfig } from "unwritten:renderer/utils/config.js";
import {
  convertParameterEntitiesForDocumentation,
  convertParameterEntitiesForSignature,
  convertParameterEntitiesForType,
  convertTypeParameterEntitiesForDocumentation,
  convertTypeParameterEntitiesForSignature,
  convertTypeParameterEntitiesForType
} from "unwritten:renderer:markup/ast-converter/entities/index.js";
import {
  convertDescriptionForDocumentation,
  convertDescriptionForType
} from "unwritten:renderer:markup/ast-converter/shared/description.js";
import { convertExample } from "unwritten:renderer:markup/ast-converter/shared/example.js";
import { convertPosition } from "unwritten:renderer:markup/ast-converter/shared/position.js";
import { convertRemarks } from "unwritten:renderer:markup/ast-converter/shared/remarks.js";
import {
  convertTagsForDocumentation,
  convertTagsForType
} from "unwritten:renderer:markup/ast-converter/shared/tags.js";
import { convertType } from "unwritten:renderer:markup/ast-converter/shared/type.js";
import { SECTION_TYPE } from "unwritten:renderer:markup/types-definitions/sections.js";
import {
  createAnchorNode,
  createListNode,
  createParagraphNode,
  createSectionNode,
  createTitleNode
} from "unwritten:renderer:markup/utils/nodes.js";
import { encapsulate, spaceBetween } from "unwritten:renderer:markup/utils/renderer.js";
import { getTranslator } from "unwritten:renderer:markup/utils/translations.js";

import type { SignatureEntity } from "unwritten:interpreter/type-definitions/entities.js";
import type { MarkupRenderContexts } from "unwritten:renderer:markup/types-definitions/markup.js";
import type { ASTNodes } from "unwritten:renderer:markup/types-definitions/nodes.js";
import type {
  ConvertedPropertyEntityForTableOfContents,
  ConvertedReturnTypeForDocumentation,
  ConvertedReturnTypeInline,
  ConvertedSignatureEntityForDocumentation,
  ConvertedSignatureEntityForType
} from "unwritten:renderer:markup/types-definitions/renderer.js";
import type { DeepRequiredByKey } from "unwritten:type-definitions/utils.js";


export function convertSignatureEntityForTableOfContents(ctx: MarkupRenderContexts, signatureEntity: DeepRequiredByKey<SignatureEntity, "declarationId">): ConvertedPropertyEntityForTableOfContents {

  const convertedSignature = convertSignature(ctx, signatureEntity);
  const renderedSignature = renderNode(ctx, convertedSignature);
  const id = signatureEntity.declarationId;

  return createAnchorNode(
    renderedSignature,
    id
  );

}


export function convertSignatureEntityForDocumentation(ctx: MarkupRenderContexts, signatureEntity: DeepRequiredByKey<SignatureEntity, "declarationId">): ConvertedSignatureEntityForDocumentation {

  const symbolId = signatureEntity.declarationId;

  const convertedSignature = convertSignature(ctx, signatureEntity);
  const convertedPosition = convertPosition(ctx, signatureEntity.position);
  const convertedTags = convertTagsForDocumentation(ctx, signatureEntity);
  const convertedTypeParameters = convertTypeParameterEntitiesForDocumentation(ctx, signatureEntity.typeParameters);
  const convertedParameters = convertParameterEntitiesForDocumentation(ctx, signatureEntity.parameters);
  const convertedReturnType = convertReturnTypeForDocumentation(ctx, signatureEntity);
  const convertedDescription = convertDescriptionForDocumentation(ctx, signatureEntity.description);
  const convertedExample = convertExample(ctx, signatureEntity.example);
  const convertedRemarks = convertRemarks(ctx, signatureEntity.remarks);

  const renderedSignature = renderNode(ctx, convertedSignature);
  const anchor = registerAnchor(ctx, renderedSignature, symbolId);

  return createSectionNode(
    SECTION_TYPE[signatureEntity.kind],
    createTitleNode(
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
    )
  );

}


export function convertSignatureEntityForType(ctx: MarkupRenderContexts, signatureEntity: SignatureEntity): ConvertedSignatureEntityForType {

  const convertedSignature = convertSignature(ctx, signatureEntity);
  const convertedTags = convertTagsForType(ctx, signatureEntity);
  const convertedTypeParameters = convertTypeParameterEntitiesForType(ctx, signatureEntity.typeParameters);
  const convertedParameters = convertParameterEntitiesForType(ctx, signatureEntity.parameters);
  const convertedReturnType = convertReturnTypeForType(ctx, signatureEntity);
  const convertedDescription = convertDescriptionForType(ctx, signatureEntity.description);

  const convertedSignatureWithDescription = spaceBetween(
    convertedSignature,
    convertedDescription,
    convertedTags
  );

  return [
    convertedSignatureWithDescription,
    convertedTypeParameters,
    convertedParameters,
    convertedReturnType
  ];

}


function convertSignature(ctx: MarkupRenderContexts, signatureEntity: SignatureEntity): ASTNodes {

  const renderConfig = getRenderConfig(ctx);

  const name = signatureEntity.name ?? "";

  const convertedTypeParameters = signatureEntity.typeParameters && signatureEntity.typeParameters.length > 0
    ? convertTypeParameterEntitiesForSignature(ctx, signatureEntity.typeParameters)
    : "";

  const encapsulatedTypeParameters = convertedTypeParameters
    ? encapsulate(convertedTypeParameters, renderConfig.typeParameterEncapsulation)
    : "";

  const convertedParameters = signatureEntity.parameters
    ? convertParameterEntitiesForSignature(ctx, signatureEntity.parameters)
    : "";

  return [
    name,
    encapsulatedTypeParameters,
    "(",
    convertedParameters,
    ")"
  ];

}


function convertReturnTypeForDocumentation(ctx: MarkupRenderContexts, signatureEntity: SignatureEntity): ConvertedReturnTypeForDocumentation {

  const translate = getTranslator(ctx);

  const { inlineType, multilineType } = convertType(ctx, signatureEntity.returnType);
  const returnDescription = signatureEntity.returnType.description ?? "";

  const convertedReturnTypeWithDescription = createParagraphNode(
    [
      spaceBetween(
        inlineType,
        returnDescription
      ),
      multilineType ?? ""
    ]
  );

  return createTitleNode(
    translate("returnType", { capitalizeEach: true }),
    convertedReturnTypeWithDescription
  );

}

function convertReturnTypeForType(ctx: MarkupRenderContexts, signatureEntity: SignatureEntity): ConvertedReturnTypeInline {

  const translate = getTranslator(ctx);

  const { inlineType } = convertType(ctx, signatureEntity.returnType);
  const returnDescription = signatureEntity.returnType.description ?? "";

  return createListNode(
    spaceBetween(
      translate("returnType", { capitalizeEach: true }),
      inlineType,
      returnDescription
    )
  );

}
