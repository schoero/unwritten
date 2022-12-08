import { MarkupRenderer, RenderedObjectLiteralType } from "quickdoks:renderer:markup/types/renderer.js";
import { RenderContext } from "quickdoks:types:context.js";
import { ObjectLiteral } from "quickdoks:types:types.js";

import { renderPropertyForDocumentation } from "./property.js";


export function renderObjectLiteralType(ctx: RenderContext<MarkupRenderer>, obj: ObjectLiteral): RenderedObjectLiteralType {

  const description = obj.description;
  const example = obj.example;
  const properties = obj.properties.map(property => renderPropertyForDocumentation(ctx, property));

  return [
    description,
    example,
    [properties]
  ];

}
