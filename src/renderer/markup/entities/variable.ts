import { renderLink } from "quickdoks:renderer:markup/utils/renderer.js";

import { renderType } from "./type.js";

import type { Variable } from "quickdoks:compiler:type-definitions/types.d.js";
import type {
  MarkupRenderer,
  RenderedVariableForDocumentation,
  RenderedVariableForTableOfContents
} from "quickdoks:renderer:markup/types/renderer.js";
import type { RenderContext } from "quickdoks:type-definitions/context.d.js";


export function renderVariableForTableOfContents(ctx: RenderContext<MarkupRenderer>, variable: Variable): RenderedVariableForTableOfContents {
  const link = renderLink(ctx, variable.name, variable.id);
  return link;
}


export function renderVariableForDocumentation(ctx: RenderContext<MarkupRenderer>, variable: Variable): RenderedVariableForDocumentation {


  //-- Special case for object literals

  // if(variable.type !== undefined && isObjectLiteralType(variable.type)){
  //   return renderObjectLiteralVariableForDocumentation(variable);
  // }


  //-- Normal variable

  const name = variable.name;
  const description = variable.description;
  const type = `Type: ${renderType(ctx, variable.type)}`;
  const example = variable.example;

  return {
    [name]: [
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
