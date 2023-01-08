import { contentFilter } from "quickdoks:compiler:utils/filter.js";
import { renderLink } from "quickdoks:renderer:markup/utils/renderer.js";

import { renderParameterForDocumentation, renderParametersForSignature } from "./parameter.js";
import { renderType } from "./type.js";

import type { FunctionLike, FunctionLikeTypeKinds } from "quickdoks:compiler:type-definitions/types.d.js";
import type {
  MarkupRenderer,
  RenderedFunctionForDocumentation,
  RenderedFunctionForTableOfContents
} from "quickdoks:renderer:markup/types/renderer.js";
import type { RenderContext } from "quickdoks:type-definitions/context.d.js";


export function renderFunctionForTableOfContents(ctx: RenderContext<MarkupRenderer>, func: FunctionLike<FunctionLikeTypeKinds>): RenderedFunctionForTableOfContents {
  return func.signatures.map(signature => {
    const renderedParameters = renderParametersForSignature(ctx, signature.parameters);
    const renderedSignature = `${func.name!}(${renderedParameters})`;
    return renderLink(ctx, renderedSignature, func.id);
  });
}


export function renderFunctionForDocumentation(ctx: RenderContext<MarkupRenderer>, func: FunctionLike<FunctionLikeTypeKinds>): RenderedFunctionForDocumentation {
  return Object.fromEntries(func.signatures.map(signature => {

    const renderedParameters = renderParametersForSignature(ctx, signature.parameters);
    const renderedSignature = `${func.name!}(${renderedParameters})`;

    const parameters = signature.parameters.map(parameter => renderParameterForDocumentation(ctx, parameter));
    const description = signature.description;
    const returnType = renderType(ctx, signature.returnType);
    const returnDescription = signature.returnType.description;
    const example = signature.example;

    const returnTypeWithDescription = returnDescription ? `Returns: ${returnType} ${returnDescription}` : `Returns: ${returnType}`;
    const parameterAndReturnValueList = [...parameters, returnTypeWithDescription].filter(contentFilter);

    return [
      renderedSignature,
      [
        [parameterAndReturnValueList],
        description,
        example
      ]
    ];

  }));
}
