import { renderNode } from "unwritten:renderer/index.js";
import { convertJSDocNodes } from "unwritten:renderer/markup/ast-converter/shared/jsdoc.js";
import {
  convertSeeTagsForDocumentation,
  convertSeeTagsForType
} from "unwritten:renderer/markup/ast-converter/shared/see.js";
import {
  convertThrowsForDocumentation,
  convertThrowsForType
} from "unwritten:renderer/markup/ast-converter/shared/throws.js";
import { registerAnchor, registerAnonymousAnchor } from "unwritten:renderer/markup/registry/registry.js";
import { renderMemberContext } from "unwritten:renderer/markup/utils/context.js";
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
import {
  convertExamplesForDocumentation,
  convertExamplesForType
} from "unwritten:renderer:markup/ast-converter/shared/example.js";
import { convertPositionForDocumentation } from "unwritten:renderer:markup/ast-converter/shared/position.js";
import {
  convertRemarksForDocumentation,
  convertRemarksForType
} from "unwritten:renderer:markup/ast-converter/shared/remarks.js";
import {
  convertTagsForDocumentation,
  convertTagsForType
} from "unwritten:renderer:markup/ast-converter/shared/tags.js";
import { convertType } from "unwritten:renderer:markup/ast-converter/shared/type.js";
import { SECTION_TYPE } from "unwritten:renderer:markup/types-definitions/sections.js";
import {
  createAnchorNode,
  createInlineTitleNode,
  createMultilineNode,
  createParagraphNode,
  createSectionNode,
  createTitleNode
} from "unwritten:renderer:markup/utils/nodes.js";
import { encapsulate, spaceBetween } from "unwritten:renderer:markup/utils/renderer.js";
import { getTranslator } from "unwritten:renderer:markup/utils/translations.js";

import type { ExplicitSignatureEntity, SignatureEntity } from "unwritten:interpreter/type-definitions/entities.js";
import type { MarkupRenderContexts } from "unwritten:renderer:markup/types-definitions/markup.js";
import type { AnchorNode, ASTNode } from "unwritten:renderer:markup/types-definitions/nodes.js";
import type {
  ConvertedPropertyEntityForTableOfContents,
  ConvertedReturnTypeForDocumentation,
  ConvertedReturnTypeForType,
  ConvertedSignatureEntityForDocumentation,
  ConvertedSignatureEntityForType
} from "unwritten:renderer:markup/types-definitions/renderer.js";


export function convertSignatureEntityToAnchor(ctx: MarkupRenderContexts, signatureEntity: ExplicitSignatureEntity, displayName?: string): AnchorNode {

  const id = signatureEntity.declarationId;
  const convertedSignature = convertSignature(ctx, signatureEntity);
  const renderedSignature = renderNode(ctx, convertedSignature);

  return createAnchorNode(
    renderedSignature,
    id,
    displayName
  );

}

export function convertSignatureEntityForTableOfContents(ctx: MarkupRenderContexts, signatureEntity: ExplicitSignatureEntity): ConvertedPropertyEntityForTableOfContents {
  return convertSignatureEntityToAnchor(ctx, signatureEntity);
}


export function convertSignatureEntityForDocumentation(ctx: MarkupRenderContexts, signatureEntity: ExplicitSignatureEntity): ConvertedSignatureEntityForDocumentation {

  const declarationId = signatureEntity.declarationId;
  const symbolId = signatureEntity.symbolId;

  const signature = convertSignature(ctx, signatureEntity);
  const renderedSignature = renderNode(ctx, signature);
  const anchor = registerAnchor(ctx, renderedSignature, [declarationId, ...symbolId ? [symbolId] : []]);

  const position = convertPositionForDocumentation(ctx, signatureEntity.position);
  const tags = convertTagsForDocumentation(ctx, signatureEntity);
  const typeParameters = convertTypeParameterEntitiesForDocumentation(ctx, signatureEntity.typeParameters);
  const parameters = convertParameterEntitiesForDocumentation(ctx, signatureEntity.parameters);
  const returnType = convertReturnTypeForDocumentation(ctx, signatureEntity);

  const throws = signatureEntity.throws && convertThrowsForDocumentation(ctx, signatureEntity.throws);
  const description = signatureEntity.description && convertDescriptionForDocumentation(ctx, signatureEntity.description);
  const remarks = signatureEntity.remarks && convertRemarksForDocumentation(ctx, signatureEntity.remarks);
  const example = signatureEntity.example && convertExamplesForDocumentation(ctx, signatureEntity.example);
  const see = signatureEntity.see && convertSeeTagsForDocumentation(ctx, signatureEntity.see);

  return createSectionNode(
    SECTION_TYPE[signatureEntity.kind],
    createTitleNode(
      signature,
      anchor,
      tags,
      position,
      typeParameters,
      parameters,
      returnType,
      throws,
      description,
      remarks,
      example,
      see
    )
  );

}


export function convertSignatureEntityForType(ctx: MarkupRenderContexts, signatureEntity: SignatureEntity): ConvertedSignatureEntityForType {

  const signature = convertSignature(ctx, signatureEntity);
  const tags = convertTagsForType(ctx, signatureEntity);
  const typeParameters = convertTypeParameterEntitiesForType(ctx, signatureEntity.typeParameters);
  const parameters = convertParameterEntitiesForType(ctx, signatureEntity.parameters);
  const returnType = convertReturnTypeForType(ctx, signatureEntity);

  const description = signatureEntity.description && convertDescriptionForType(ctx, signatureEntity.description);
  const throws = signatureEntity.throws && convertThrowsForType(ctx, signatureEntity.throws);
  const remarks = signatureEntity.remarks && convertRemarksForType(ctx, signatureEntity.remarks);
  const examples = signatureEntity.example && convertExamplesForType(ctx, signatureEntity.example);
  const see = signatureEntity.see && convertSeeTagsForType(ctx, signatureEntity.see);

  return createMultilineNode(
    spaceBetween(
      signature,
      description,
      tags
    ),
    typeParameters,
    parameters,
    returnType,
    throws,
    remarks,
    examples,
    see
  );

}


function convertSignature(ctx: MarkupRenderContexts, signatureEntity: SignatureEntity): ASTNode {

  const renderConfig = getRenderConfig(ctx);

  const name = signatureEntity.name;
  const nameWithContext = name === "constructor"
    ? `new ${renderMemberContext(ctx)}`
    : name && renderMemberContext(ctx, name);

  const convertedTypeParameters = signatureEntity.typeParameters && signatureEntity.typeParameters.length > 0 &&
    convertTypeParameterEntitiesForSignature(ctx, signatureEntity.typeParameters);

  const encapsulatedTypeParameters = convertedTypeParameters &&
    encapsulate(convertedTypeParameters, renderConfig.typeParameterEncapsulation);

  const convertedParameters = signatureEntity.parameters &&
    convertParameterEntitiesForSignature(ctx, signatureEntity.parameters);

  return [
    nameWithContext,
    encapsulatedTypeParameters,
    "(",
    convertedParameters,
    ")"
  ];

}


function convertReturnTypeForDocumentation(ctx: MarkupRenderContexts, signatureEntity: SignatureEntity): ConvertedReturnTypeForDocumentation {

  const translate = getTranslator(ctx);

  const returnDescription = signatureEntity.returnType.description && convertJSDocNodes(ctx, signatureEntity.returnType.description);
  const returnTypeTranslation = translate("returnType", { capitalizeEach: true });
  const returnTypeAnchor = registerAnonymousAnchor(ctx, returnTypeTranslation);

  const { inlineType, multilineType } = convertType(ctx, signatureEntity.returnType);

  return createTitleNode(
    returnTypeTranslation,
    returnTypeAnchor,
    createParagraphNode(
      spaceBetween(
        inlineType,
        returnDescription
      )
    ),
    multilineType
  );

}

function convertReturnTypeForType(ctx: MarkupRenderContexts, signatureEntity: SignatureEntity): ConvertedReturnTypeForType {

  const translate = getTranslator(ctx);

  const title = translate("returnType", { capitalizeEach: true });
  const anchor = registerAnonymousAnchor(ctx, title);

  const returnDescription = signatureEntity.returnType.description && convertDescriptionForType(ctx, signatureEntity.returnType.description);

  const { inlineType, multilineType } = convertType(ctx, signatureEntity.returnType);

  return createInlineTitleNode(
    title,
    anchor,
    createParagraphNode(
      spaceBetween(
        inlineType,
        returnDescription
      )
    ),
    multilineType
  );

}
