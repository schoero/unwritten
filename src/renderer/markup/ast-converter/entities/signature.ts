import { renderNode } from "unwritten:renderer/index.js";
import {
  convertDescriptionForDocumentation,
  convertDescriptionForType
} from "unwritten:renderer/markup/ast-converter/shared/description.js";
import { convertExample } from "unwritten:renderer/markup/ast-converter/shared/example.js";
import { convertRemarks } from "unwritten:renderer/markup/ast-converter/shared/remarks.js";
import {
  convertTagsForDocumentation,
  convertTagsForType
} from "unwritten:renderer/markup/ast-converter/shared/tags.js";
import { convertTypeForType } from "unwritten:renderer/markup/ast-converter/shared/type.js";
import { SECTION_TYPE } from "unwritten:renderer/markup/enums/sections.js";
import { registerAnchor } from "unwritten:renderer/markup/utils/linker.js";
import { getTranslator } from "unwritten:renderer/markup/utils/translations.js";
import { getRenderConfig } from "unwritten:renderer/utils/config.js";
import {
  convertParameterEntitiesForDocumentation,
  convertParameterEntitiesForSignature,
  convertParameterEntitiesForType,
  convertTypeParameterEntitiesForDocumentation,
  convertTypeParameterEntitiesForSignature,
  convertTypeParameterEntitiesForType
} from "unwritten:renderer:markup/ast-converter/entities/index.js";
import { convertPosition } from "unwritten:renderer:markup/ast-converter/shared/position.js";
import {
  createAnchorNode,
  createListNode,
  createParagraphNode,
  createSectionNode,
  createTitleNode
} from "unwritten:renderer:markup/utils/nodes.js";
import { encapsulate, spaceBetween } from "unwritten:renderer:markup/utils/renderer.js";

import type { SignatureEntity } from "unwritten:interpreter:type-definitions/entities.js";
import type { ASTNodes } from "unwritten:renderer/markup/types-definitions/nodes.js";
import type { MarkupRenderContexts } from "unwritten:renderer:markup/types-definitions/markup.d.js";
import type {
  ConvertedReturnTypeForDocumentation,
  ConvertedReturnTypeForType,
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
  const convertedTags = convertTagsForDocumentation(ctx, signatureEntity);
  const convertedTypeParameters = convertTypeParameterEntitiesForDocumentation(ctx, signatureEntity.typeParameters);
  const convertedParameters = convertParameterEntitiesForDocumentation(ctx, signatureEntity.parameters);
  const convertedReturnType = convertReturnTypeForDocumentation(ctx, signatureEntity);
  const convertedDescription = convertDescriptionForDocumentation(ctx, signatureEntity.description);
  const convertedExample = convertExample(ctx, signatureEntity.example);
  const convertedRemarks = convertRemarks(ctx, signatureEntity.remarks);

  const renderedSignature = renderNode(ctx, convertedSignature);
  const anchor = registerAnchor(ctx, renderedSignature, id);

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

  const t = getTranslator(ctx);

  const convertedReturnType = convertTypeForType(ctx, signatureEntity.returnType);
  const returnDescription = signatureEntity.returnType.description ?? "";
  const convertedReturnTypeWithDescription = createParagraphNode(
    spaceBetween(
      convertedReturnType,
      returnDescription
    )
  );

  return createTitleNode(
    t("return-type", { capitalizeEach: true }),
    convertedReturnTypeWithDescription
  );

}

function convertReturnTypeForType(ctx: MarkupRenderContexts, signatureEntity: SignatureEntity): ConvertedReturnTypeForType {

  const t = getTranslator(ctx);

  const convertedReturnType = convertTypeForType(ctx, signatureEntity.returnType);
  const returnDescription = signatureEntity.returnType.description ?? "";

  return createListNode(
    spaceBetween(
      t("return-type", { capitalizeEach: true }),
      convertedReturnType,
      returnDescription
    )
  );

}
