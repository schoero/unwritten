import {
  convertParameterEntitiesForSignature,
  convertParameterEntityForDocumentation
} from "unwritten:renderer:markup/ast-converter/entities/index.js";
import { convertType } from "unwritten:renderer:markup/ast-converter/index.js";
import { convertJSDocTags } from "unwritten:renderer:markup/ast-converter/shared/jsdoc-tags.js";
import { convertPosition } from "unwritten:renderer:markup/ast-converter/shared/position.js";
import {
  createLinkNode,
  createListNode,
  createParagraphNode,
  createSmallNode,
  createTitleNode
} from "unwritten:renderer:markup/utils/nodes.js";
import { spaceBetween } from "unwritten:renderer:markup/utils/renderer.js";
import { getTranslator } from "unwritten:renderer:markup/utils/translations.js";

import type { SignatureEntity } from "unwritten:interpreter:type-definitions/entities.js";
import type { MarkupRenderContexts } from "unwritten:renderer:markup/types-definitions/markup.d.js";
import type {
  ConvertedSignatureEntityForDocumentation,
  ConvertedSignatureEntityForTableOfContents,
  ConvertedSignatureEntityForType
} from "unwritten:renderer:markup/types-definitions/renderer.js";


export function convertSignatureEntityForTableOfContents(ctx: MarkupRenderContexts, signatureEntity: SignatureEntity): ConvertedSignatureEntityForTableOfContents {

  const name = signatureEntity.name ?? "";
  const renderedParameters = signatureEntity.parameters
    ? convertParameterEntitiesForSignature(ctx, signatureEntity.parameters)
    : "";
  const renderedSignature = [name, "(", renderedParameters, ")"];

  return createLinkNode(
    renderedSignature,
    signatureEntity.symbolId
  );

}

export function convertSignatureEntityForDocumentation(ctx: MarkupRenderContexts, signatureEntity: SignatureEntity, createTitle: false): ConvertedSignatureEntityForType;
export function convertSignatureEntityForDocumentation(ctx: MarkupRenderContexts, signatureEntity: SignatureEntity, createTitle?: true): ConvertedSignatureEntityForDocumentation;
export function convertSignatureEntityForDocumentation(ctx: MarkupRenderContexts, signatureEntity: SignatureEntity, createTitle?: boolean): ConvertedSignatureEntityForDocumentation | ConvertedSignatureEntityForType;
export function convertSignatureEntityForDocumentation(ctx: MarkupRenderContexts, signatureEntity: SignatureEntity, createTitle: boolean = true): ConvertedSignatureEntityForDocumentation | ConvertedSignatureEntityForType {

  const translate = getTranslator(ctx);

  const signatureName = signatureEntity.name ?? "";
  const renderedSignatureParameters = signatureEntity.parameters
    ? convertParameterEntitiesForSignature(ctx, signatureEntity.parameters)
    : "";
  const renderedSignature = [signatureName, "(", renderedSignatureParameters, ")"];
  const id = signatureEntity.symbolId;

  const position = signatureEntity.position ? convertPosition(ctx, signatureEntity.position) : "";
  const jsdocTags = convertJSDocTags(ctx, signatureEntity);

  const parameters = signatureEntity.parameters?.map(
    parameter => convertParameterEntityForDocumentation(ctx, parameter)
  ) ?? [];

  const returnType = convertType(ctx, signatureEntity.returnType);

  const description = signatureEntity.description ?? "";
  const example = signatureEntity.example ?? "";
  const remarks = signatureEntity.remarks ?? "";
  const returnDescription = signatureEntity.returnType.description ?? "";

  const returnTypeWithDescription = spaceBetween(
    `${translate("returns", { capitalize: true })}:`,
    returnType,
    returnDescription
  );

  const content = [
    createSmallNode(position),
    createParagraphNode(jsdocTags),
    createListNode(
      ...parameters,
      returnTypeWithDescription
    ),
    createParagraphNode(description),
    createParagraphNode(remarks),
    createParagraphNode(example)
  ] as const;

  return createTitle
    ? createTitleNode(
      renderedSignature,
      id,
      ...content
    )
    : [
      renderedSignature,
      ...content
    ];

}
