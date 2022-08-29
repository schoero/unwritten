import {
  RenderedFunctionForDocumentation,
  RenderedFunctionForTableOfContents,
  RenderedFunctionImplementationOrOverloadForDocumentation
} from "src/types/renderer.js";
import { contentFilter } from "src/utils/filter.js";
import { renderLink } from "src/utils/renderer.js";
import {
  FunctionImplementation,
  FunctionLikeEntity,
  FunctionLikeEntityKinds,
  FunctionOverload
} from "types/entities.js";
import { renderParameterEntitiesForSignature, renderParameterEntityForDocumentation } from "./parameter.js";
import { renderType } from "./type.js";


export function renderFunctionEntityForTableOfContents(functionEntity: FunctionLikeEntity<FunctionLikeEntityKinds>): RenderedFunctionForTableOfContents {
  if(functionEntity.overloads && functionEntity.overloads.length > 0){
    const renderedOverloads = functionEntity.overloads.map(_renderFunctionImplementationOrOverloadForTableOfContents);
    return renderedOverloads;
  } else {
    return [
      _renderFunctionImplementationOrOverloadForTableOfContents(functionEntity.implementation)
    ];
  }
}


export function renderFunctionEntityForDocumentation(functionEntity: FunctionLikeEntity<FunctionLikeEntityKinds>): RenderedFunctionForDocumentation {
  if(functionEntity.overloads && functionEntity.overloads.length > 0){
    return functionEntity.overloads.reduce((acc, overload) => {
      acc = {
        ..._renderFunctionImplementationOrOverloadForDocumentation(overload),
        ...acc
      };
      return acc;
    }, {});
  } else {
    return _renderFunctionImplementationOrOverloadForDocumentation(functionEntity.implementation);
  }
}


function _renderFunctionImplementationOrOverloadForSignature(functionImplementationOrOverload: FunctionImplementation | FunctionOverload): string {
  const parameters = renderParameterEntitiesForSignature(functionImplementationOrOverload.parameters);
  return `${functionImplementationOrOverload.name}(${parameters})`;
}


function _renderFunctionImplementationOrOverloadForTableOfContents(functionImplementationOrOverload: FunctionImplementation | FunctionOverload): string {
  const signature = _renderFunctionImplementationOrOverloadForSignature(functionImplementationOrOverload);
  const link = renderLink(signature, functionImplementationOrOverload.id);
  return link;
}


function _renderFunctionImplementationOrOverloadForDocumentation(functionImplementationOrOverload: FunctionImplementation | FunctionOverload): RenderedFunctionImplementationOrOverloadForDocumentation {


  //-- Create signature

  const signature = _renderFunctionImplementationOrOverloadForSignature(functionImplementationOrOverload);


  //-- Create content

  const parameters = functionImplementationOrOverload.parameters.map(renderParameterEntityForDocumentation);
  const description = functionImplementationOrOverload.description;
  const returnType = renderType(functionImplementationOrOverload.returnType);
  const returnDescription = functionImplementationOrOverload.returns;
  const example = functionImplementationOrOverload.example;

  const returnTypeWithDescription = returnDescription ? `Returns: ${returnType} ${returnDescription}` : `Returns: ${returnType}`;
  const parameterAndReturnValueList = [...parameters, returnTypeWithDescription].filter(contentFilter);

  return {
    [signature]: [
      [parameterAndReturnValueList],
      description,
      example
    ]
  };

}
