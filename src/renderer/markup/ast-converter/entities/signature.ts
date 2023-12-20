import { renderNode } from "unwritten:renderer/index";
import { convertJSDocNodes } from "unwritten:renderer/markup/ast-converter/shared/jsdoc";
import {
  convertSeeTagsForDocumentation,
  convertSeeTagsForType
} from "unwritten:renderer/markup/ast-converter/shared/see";
import {
  convertThrowsForDocumentation,
  convertThrowsForType
} from "unwritten:renderer/markup/ast-converter/shared/throws";
import { registerAnchor, registerAnonymousAnchor } from "unwritten:renderer/markup/registry/registry";
import { isRenderParentNamesEnabled, renderMemberContext } from "unwritten:renderer/markup/utils/context";
import { getRenderConfig } from "unwritten:renderer/utils/config";
import {
  convertParameterEntitiesForDocumentation,
  convertParameterEntitiesForSignature,
  convertParameterEntitiesForType,
  convertTypeParameterEntitiesForDocumentation,
  convertTypeParameterEntitiesForSignature,
  convertTypeParameterEntitiesForType
} from "unwritten:renderer:markup/ast-converter/entities/index";
import {
  convertDescriptionForDocumentation,
  convertDescriptionForType
} from "unwritten:renderer:markup/ast-converter/shared/description";
import {
  convertExamplesForDocumentation,
  convertExamplesForType
} from "unwritten:renderer:markup/ast-converter/shared/example";
import { convertPositionForDocumentation } from "unwritten:renderer:markup/ast-converter/shared/position";
import {
  convertRemarksForDocumentation,
  convertRemarksForType
} from "unwritten:renderer:markup/ast-converter/shared/remarks";
import { convertTagsForDocumentation, convertTagsForType } from "unwritten:renderer:markup/ast-converter/shared/tags";
import { convertType } from "unwritten:renderer:markup/ast-converter/shared/type";
import { getSectionType } from "unwritten:renderer:markup/types-definitions/sections";
import {
  createAnchorNode,
  createInlineTitleNode,
  createMultilineNode,
  createParagraphNode,
  createSectionNode,
  createTitleNode
} from "unwritten:renderer:markup/utils/nodes";
import { encapsulate, renderEntityPrefix, spaceBetween } from "unwritten:renderer:markup/utils/renderer";
import { getTranslator } from "unwritten:renderer:markup/utils/translations";

import type { ExplicitSignatureEntity, SignatureEntity } from "unwritten:interpreter/type-definitions/entities";
import type { MarkupRenderContext } from "unwritten:renderer:markup/types-definitions/markup";
import type { AnchorNode, ASTNode } from "unwritten:renderer:markup/types-definitions/nodes";
import type {
  ConvertedPropertyEntityForTableOfContents,
  ConvertedReturnTypeForDocumentation,
  ConvertedReturnTypeForType,
  ConvertedSignatureEntityForDocumentation,
  ConvertedSignatureEntityForType
} from "unwritten:renderer:markup/types-definitions/renderer";


export function convertSignatureEntityToAnchor(ctx: MarkupRenderContext, signatureEntity: ExplicitSignatureEntity, displayName?: string): AnchorNode {

  // TODO: Workaround collisions with symbol ids
  const id = Number.MAX_SAFE_INTEGER - signatureEntity.declarationId;

  const convertedSignatureForDocumentation = convertSignature(ctx, signatureEntity, "documentation");
  const renderedSignatureForDocumentation = renderNode(ctx, convertedSignatureForDocumentation);
  const documentationEntityPrefix = renderEntityPrefix(ctx, "documentation", signatureEntity.kind);

  const convertedSignatureForTableOfContents = convertSignature(ctx, signatureEntity, "tableOfContents");
  const renderedSignatureForTableOfContents = renderNode(ctx, convertedSignatureForTableOfContents);
  const tableOfContentsEntityPrefix = renderEntityPrefix(ctx, "tableOfContents", signatureEntity.kind);

  const prefixedDocumentationName = documentationEntityPrefix
    ? `${documentationEntityPrefix}: ${renderedSignatureForDocumentation}`
    : renderedSignatureForDocumentation;

  const prefixedTableOfContentsName = tableOfContentsEntityPrefix
    ? `${tableOfContentsEntityPrefix}: ${renderedSignatureForTableOfContents}`
    : renderedSignatureForTableOfContents;

  displayName ??= prefixedTableOfContentsName;

  return createAnchorNode(
    prefixedDocumentationName,
    id,
    displayName
  );

}

export function convertSignatureEntityForTableOfContents(ctx: MarkupRenderContext, signatureEntity: ExplicitSignatureEntity): ConvertedPropertyEntityForTableOfContents {
  return convertSignatureEntityToAnchor(ctx, signatureEntity);
}

export function convertSignatureEntityForDocumentation(ctx: MarkupRenderContext, signatureEntity: ExplicitSignatureEntity): ConvertedSignatureEntityForDocumentation {

  // TODO: Workaround collisions with symbol ids
  const declarationId = Number.MAX_SAFE_INTEGER - signatureEntity.declarationId;
  const symbolId = signatureEntity.symbolId;

  const signature = convertSignature(ctx, signatureEntity, "documentation");
  const renderedSignature = renderNode(ctx, signature);

  const entityPrefix = renderEntityPrefix(ctx, "documentation", signatureEntity.kind);

  const prefixedDocumentationName = entityPrefix
    ? `${entityPrefix}: ${renderedSignature}`
    : renderedSignature;

  const anchor = registerAnchor(ctx, prefixedDocumentationName, [declarationId, ...symbolId ? [symbolId] : []]);

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
    getSectionType(signatureEntity.kind),
    createTitleNode(
      prefixedDocumentationName,
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


export function convertSignatureEntityForType(ctx: MarkupRenderContext, signatureEntity: SignatureEntity): ConvertedSignatureEntityForType {

  const signature = convertSignature(ctx, signatureEntity, "documentation");
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


function convertSignature(ctx: MarkupRenderContext, signatureEntity: SignatureEntity, target: "documentation" | "tableOfContents"): ASTNode {

  const renderConfig = getRenderConfig(ctx);

  const name = signatureEntity.name;
  const withRenderContext = isRenderParentNamesEnabled(ctx, target);
  const nameWithContext =
  name === "constructor"
    ? withRenderContext
      ? `new ${renderMemberContext(ctx, target)}`
      : ctx.memberContext.length > 0
        ? `new ${ctx.memberContext.at(-1)}`
        : name
    : renderMemberContext(ctx, target, name);


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


function convertReturnTypeForDocumentation(ctx: MarkupRenderContext, signatureEntity: SignatureEntity): ConvertedReturnTypeForDocumentation {

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

function convertReturnTypeForType(ctx: MarkupRenderContext, signatureEntity: SignatureEntity): ConvertedReturnTypeForType {

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
