import {
  convertParameterForDocumentation,
  convertParametersForSignature
} from "unwritten:renderer/markup/ast-converter/entities/index.js";
import { convertType } from "unwritten:renderer/markup/ast-converter/index.js";
import { convertJSDocTags } from "unwritten:renderer/markup/ast-converter/shared/jsdoc-tags.js";
import { convertPosition } from "unwritten:renderer/markup/ast-converter/shared/position.js";
import { getAnchorIdentifier, getAnchorLink } from "unwritten:renderer/markup/utils/linker.js";
import {
  createLinkNode,
  createListNode,
  createParagraphNode,
  createSmallNode,
  createTitleNode
} from "unwritten:renderer/markup/utils/nodes.js";
import { renderLink } from "unwritten:renderer:markup/utils/renderer.js";

import type { SignatureEntity } from "unwritten:compiler:type-definitions/entities.js";
import type { MarkupRenderContexts } from "unwritten:renderer/markup/types-definitions/markup.d.js";
import type {
  ConvertedSignatureEntityForDocumentation,
  ConvertedSignatureEntityForTableOfContents
} from "unwritten:renderer/markup/types-definitions/renderer.js";


export function convertSignatureForTableOfContents(ctx: MarkupRenderContexts, signatureEntity: SignatureEntity): ConvertedSignatureEntityForTableOfContents {

  const name = signatureEntity.name;
  const renderedParameters = convertParametersForSignature(ctx, signatureEntity.parameters);
  const renderedSignature = `${name}(${renderedParameters})`;

  return createLinkNode(
    renderedSignature,
    renderLink(ctx, renderedSignature, signatureEntity.id)
  );

}

export function convertSignatureForDocumentation(ctx: MarkupRenderContexts, signatureEntity: SignatureEntity): ConvertedSignatureEntityForDocumentation {

  const signatureName = signatureEntity.name;
  const renderedParameters = convertParametersForSignature(ctx, signatureEntity.parameters);
  const renderedSignature = `${signatureName}(${renderedParameters})`;

  const anchorIdentifier = getAnchorIdentifier(ctx, renderedSignature, signatureEntity.id);
  const anchorLink = getAnchorLink(ctx, anchorIdentifier);

  const jsdocTags = convertJSDocTags(ctx, signatureEntity);
  const position = signatureEntity.position ? convertPosition(ctx, signatureEntity.position) : "";

  const parameters = signatureEntity.parameters
    .map(parameter => convertParameterForDocumentation(ctx, parameter));

  const returnType = convertType(ctx, signatureEntity.returnType);

  const description = signatureEntity.description ?? "";
  const example = signatureEntity.example ?? "";
  const remarks = signatureEntity.remarks ?? "";

  const returnDescription = signatureEntity.returnType.description;

  const returnTypeWithDescription = returnDescription ? `Returns: ${returnType} ${returnDescription}` : `Returns: ${returnType}`;
  const parameterAndReturnValueList = [...parameters, returnTypeWithDescription];

  return createTitleNode(
    renderedSignature,
    anchorLink,
    [
      createSmallNode(position),
      createSmallNode(jsdocTags),
      createListNode(parameterAndReturnValueList),
      createParagraphNode(description),
      createParagraphNode(remarks),
      createParagraphNode(example)
    ]
  );

}
