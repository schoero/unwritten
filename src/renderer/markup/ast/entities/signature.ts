import { renderType } from "unwritten:renderer/markup/ast/index.js";
import { getAnchorIdentifier, getAnchorLink } from "unwritten:renderer/markup/utils/linker.js";
import {
  createContainerNode,
  createLinkNode,
  createListNode,
  createParagraphNode,
  createSmallNode,
  createTitleNode
} from "unwritten:renderer/markup/utils/nodes.js";
import { renderJSDocTags } from "unwritten:renderer:markup/shared/jsdoc-tags.js";
import { renderLink } from "unwritten:renderer:markup/utils/renderer.js";

import { renderDescription } from "../../shared/description.js";
import { renderExample } from "../../shared/example.js";
import { renderPosition } from "../../shared/position.js";
import { renderRemarks } from "../../shared/remarks.js";

import { renderParameterForDocumentation, renderParametersForSignature } from "./parameter.js";

import type { SignatureEntity } from "unwritten:compiler:type-definitions/entities.js";
import type { MarkupRenderContext } from "unwritten:renderer/markup/types-definitions/markup.d.js";
import type {
  RenderedSignatureEntityForDocumentation,
  RenderedSignatureEntityForTableOfContents
} from "unwritten:renderer/markup/types-definitions/renderer.js";


export function renderSignatureForTableOfContents(ctx: MarkupRenderContext, signatureEntity: SignatureEntity): RenderedSignatureEntityForTableOfContents {

  const name = signatureEntity.name;
  const renderedParameters = renderParametersForSignature(ctx, signatureEntity.parameters);
  const renderedSignature = `${name}(${renderedParameters})`;

  return createLinkNode(
    renderedSignature,
    renderLink(ctx, renderedSignature, signatureEntity.id)
  );

}

export function renderSignatureForDocumentation(ctx: MarkupRenderContext, signatureEntity: SignatureEntity): RenderedSignatureEntityForDocumentation {

  const signatureName = signatureEntity.name;
  const renderedParameters = renderParametersForSignature(ctx, signatureEntity.parameters);
  const renderedSignature = `${signatureName}(${renderedParameters})`;

  const anchorIdentifier = getAnchorIdentifier(ctx, renderedSignature, signatureEntity.id);
  const anchorLink = getAnchorLink(ctx, anchorIdentifier);

  const jsdocTags = renderJSDocTags(ctx, signatureEntity);
  const position = renderPosition(ctx, signatureEntity.position);

  const parameters = signatureEntity.parameters
    .map(parameter => renderParameterForDocumentation(ctx, parameter));

  const returnDescription = signatureEntity.returnType.description;

  const description = renderDescription(ctx, signatureEntity.description);
  const returnType = renderType(ctx, signatureEntity.returnType);
  const example = renderExample(ctx, signatureEntity.example);
  const remarks = renderRemarks(ctx, signatureEntity.remarks);

  const returnTypeWithDescription = returnDescription ? `Returns: ${returnType} ${returnDescription}` : `Returns: ${returnType}`;
  const parameterAndReturnValueList = [...parameters, returnTypeWithDescription];

  return createContainerNode(
    createTitleNode(renderedSignature, anchorLink),
    createSmallNode(position),
    createSmallNode(jsdocTags),
    createListNode(parameterAndReturnValueList),
    createParagraphNode(description),
    createParagraphNode(remarks),
    createParagraphNode(example)
  );

}
