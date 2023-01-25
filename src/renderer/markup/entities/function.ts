import { contentFilter } from "quickdoks:compiler:utils/filter.js";
import { renderLink } from "quickdoks:renderer:markup/utils/renderer.js";

import { renderParameterForDocumentation, renderParametersForSignature } from "./parameter.js";
import { renderType } from "./type.js";

import type { FunctionLikeEntities } from "quickdoks:compiler/type-definitions/entities.js";
import type {
  MarkupRenderer,
  RenderedFunctionForDocumentation,
  RenderedFunctionForTableOfContents
} from "quickdoks:renderer:markup/types/renderer.js";
import type { RenderContext } from "quickdoks:type-definitions/context.d.js";


export function renderFunctionForTableOfContents(ctx: RenderContext<MarkupRenderer>, func: FunctionLikeEntities): RenderedFunctionForTableOfContents {
  return func.signatures.map(signature => {
    const renderedParameters = renderParametersForSignature(ctx, signature.parameters);
    const renderedSignature = `${func.name!}(${renderedParameters})`;
    return renderLink(ctx, renderedSignature, func.id);
  });
}


export function renderFunctionForDocumentation(ctx: RenderContext<MarkupRenderer>, func: FunctionLikeEntities): RenderedFunctionForDocumentation {
  return func.signatures.reduce<RenderedFunctionForDocumentation>((signatures, signature) => {

    const renderedParameters = renderParametersForSignature(ctx, signature.parameters);
    const renderedSignature = `${func.name!}(${renderedParameters})`;

    const parameters = signature.parameters.map(parameter => renderParameterForDocumentation(ctx, parameter));
    const description = signature.description;
    const returnType = renderType(ctx, signature.returnType);
    const returnDescription = signature.returnType.description;
    const example = signature.example;
    const remarks = signature.remarks;

    const returnTypeWithDescription = returnDescription ? `Returns: ${returnType} ${returnDescription}` : `Returns: ${returnType}`;
    const parameterAndReturnValueList = [...parameters, returnTypeWithDescription].filter(contentFilter);

    signatures[renderedSignature] = [
      [
        parameterAndReturnValueList
      ],
      description,
      remarks,
      example
    ];

    return signatures;

  }, {});
}
