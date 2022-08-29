import { isObjectLiteralType } from "src/typeguards/types.js";
import {
  RenderedObjectLiteralVariable,
  RenderedVariableForDocumentation,
  RenderedVariableForTableOfContents
} from "src/types/renderer.js";
import { renderLink } from "src/utils/renderer.js";
import { VariableEntity } from "../../types/entities.js";
import { renderPropertyEntityForDocumentation } from "./property.js";
import { renderType } from "./type.js";

export function renderVariableEntityForTableOfContents(variableEntity: VariableEntity): RenderedVariableForTableOfContents {
  const link = renderLink(variableEntity.name, variableEntity.id);
  return link;
}


export function renderVariableEntityForDocumentation(variableEntity: VariableEntity): RenderedVariableForDocumentation | RenderedObjectLiteralVariable {


  //-- Special case for object literals

  // if(variableEntity.type !== undefined && isObjectLiteralType(variableEntity.type)){
  //   return renderObjectLiteralVariableForDocumentation(variableEntity);
  // }


  //-- Normal variable

  const name = variableEntity.name;
  const description = variableEntity.description;
  const type = variableEntity.type ? `Type: ${renderType(variableEntity.type) }` : undefined;
  const example = variableEntity.example;

  return {
    [name]:[
      description,
      type,
      example
    ]
  };

}


export function renderObjectLiteralVariableForDocumentation(variableEntity: VariableEntity): RenderedObjectLiteralVariable {

  if(variableEntity.type === undefined || !isObjectLiteralType(variableEntity.type)){
    return {};
  }

  const name = variableEntity.name;
  const description = variableEntity.description;
  const example = variableEntity.example;

  const properties = variableEntity.type.properties.map(renderPropertyEntityForDocumentation);

  return {
    [name]:[
      description,
      [properties],
      example
    ]
  };

}