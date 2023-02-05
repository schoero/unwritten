import { contentFilter } from "unwritten:compiler:utils/filter.js";
import { renderType } from "unwritten:renderer/markup/ast/index.js";
import { getAnchorLink } from "unwritten:renderer/markup/utils/linker.js";
import { renderJSDocTags } from "unwritten:renderer:markup/shared/jsdoc-tags.js";
import { renderName } from "unwritten:renderer:markup/shared/name.js";
import { renderLink } from "unwritten:renderer:markup/utils/renderer.js";
import { assert } from "unwritten:utils/general.js";

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

  const signatureName = renderName(ctx, signatureEntity.name);
  const renderedParameters = renderParametersForSignature(ctx, signatureEntity.parameters);
  const renderedSignature = `${signatureName}(${renderedParameters})`;
  const anchor = getAnchorLink(ctx, renderedSignature, signatureEntity.id);

  assert(anchor, "Interface anchor must be defined.");


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
    [anchor]: [
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
