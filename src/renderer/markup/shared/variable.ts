import { RenderContext } from "../../../types/context.js";
import { Variable } from "../../../types/types.js";
import {
  MarkupRenderer,
  RenderedObjectLiteralVariable,
  RenderedVariableForDocumentation,
  RenderedVariableForTableOfContents
} from "../types/renderer.js";
import { renderLink } from "../utils/renderer.js";
import { renderType } from "./type.js";


export function renderVariableForTableOfContents(ctx: RenderContext<MarkupRenderer>, variable: Variable): RenderedVariableForTableOfContents {
  const link = renderLink(ctx, variable.name, variable.id);
  return link;
}


export function renderVariableForDocumentation(ctx: RenderContext<MarkupRenderer>, variable: Variable): RenderedObjectLiteralVariable | RenderedVariableForDocumentation {


  //-- Special case for object literals

  // if(variable.type !== undefined && isObjectLiteralType(variable.type)){
  //   return renderObjectLiteralVariableForDocumentation(variable);
  // }


  //-- Normal variable

  const name = variable.name;
  const description = variable.description;
  const type = `Type: ${renderType(ctx, variable.type) }`;
  const example = variable.example;

  return {
    [name]:[
      description,
      type,
      example
    ]
  };

}


// export function renderObjectLiteralVariableForDocumentation(variable: Variable): RenderedObjectLiteralVariable {

//   if(!isObjectLiteralType(variable.type)){
//     return {};
//   }

//   const name = variable.name;
//   const description = variable.description;
//   const example = variable.example;

//   const properties = variable.type.properties.map(renderPropertyEntityForDocumentation);

//   return {
//     [name]:[
//       description,
//       [properties],
//       example
//     ]
//   };

// }