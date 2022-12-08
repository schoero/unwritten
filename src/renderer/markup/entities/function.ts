import { contentFilter } from "quickdoks:compiler:utils/filter.js";
import {
  MarkupRenderer,
  RenderedFunctionForDocumentation,
  RenderedFunctionForTableOfContents
} from "quickdoks:renderer:markup/types/renderer.js";
import { renderLink } from "quickdoks:renderer:markup/utils/renderer.js";
import { RenderContext } from "quickdoks:types:context.js";
import { FunctionLike, FunctionLikeTypeKinds } from "quickdoks:types:types.js";

import { renderParameterForDocumentation, renderParametersForSignature } from "./parameter.js";
import { renderType } from "./type.js";


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
