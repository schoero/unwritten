import { contentFilter } from "unwritten:compiler:utils/filter.js";
import { renderType } from "unwritten:renderer:markup/entry-points/types.js";
import { renderJSDocTags } from "unwritten:renderer:markup/shared/jsdoc-tags.js";
import { renderName } from "unwritten:renderer:markup/shared/name.js";
import { renderLink } from "unwritten:renderer:markup/utils/renderer.js";

import { renderDescription } from "../../shared/description.js";
import { renderExample } from "../../shared/example.js";
import { renderPosition } from "../../shared/position.js";
import { renderRemarks } from "../../shared/remarks.js";

import { renderParameterForDocumentation, renderParametersForSignature } from "./parameter.js";

import type { SignatureEntity } from "unwritten:compiler:type-definitions/entities.js";
import type {
  MarkupRenderContext,
  RenderedSignatureForDocumentation,
  RenderedSignatureForTableOfContents
} from "unwritten:renderer:markup/types/renderer.js";


export function renderSignatureForTableOfContents(ctx: MarkupRenderContext, signatureEntity: SignatureEntity): RenderedSignatureForTableOfContents {
  const name = renderName(ctx, signatureEntity.name);
  const renderedParameters = renderParametersForSignature(ctx, signatureEntity.parameters);
  const renderedSignature = `${name}(${renderedParameters})`;
  return renderLink(ctx, renderedSignature, signatureEntity.id);
}

export function renderSignaturesForDocumentation(ctx: MarkupRenderContext, signatureEntities: SignatureEntity[]): RenderedSignatureForDocumentation {
  return signatureEntities.reduce<RenderedSignatureForDocumentation>((acc, signatureEntity) => {
    const renderedSignatureForDocumentation = renderSignatureForDocumentation(ctx, signatureEntity);
    return {
      ...acc,
      ...renderedSignatureForDocumentation
    };
  }, {});
}

export function renderSignatureForDocumentation(ctx: MarkupRenderContext, signatureEntity: SignatureEntity): RenderedSignatureForDocumentation {

  const name = renderName(ctx, signatureEntity.name);
  const renderedParameters = renderParametersForSignature(ctx, signatureEntity.parameters);
  const renderedSignature = `${name}(${renderedParameters})`;

  const jsdocTags = renderJSDocTags(ctx, signatureEntity);
  const position = renderPosition(ctx, signatureEntity.position);

  const parameters = signatureEntity.parameters.map(parameter => renderParameterForDocumentation(ctx, parameter));
  const returnDescription = signatureEntity.returnType.description;

  const description = renderDescription(ctx, signatureEntity.description);
  const returnType = renderType(ctx, signatureEntity.returnType);
  const example = renderExample(ctx, signatureEntity.example);
  const remarks = renderRemarks(ctx, signatureEntity.remarks);

  const returnTypeWithDescription = returnDescription ? `Returns: ${returnType} ${returnDescription}` : `Returns: ${returnType}`;
  const parameterAndReturnValueList = [...parameters, returnTypeWithDescription].filter(contentFilter);

  return {
    [renderedSignature]: [
      jsdocTags,
      position,
      [
        parameterAndReturnValueList
      ],
      description,
      remarks,
      example
    ]
  };

}
