import { MarkupRenderer, RenderedObjectLiteralType } from "quickdoks:renderer:markup/types/renderer.js";

import { RenderContext } from "quickdoks:type-definitions/context.d.js";
import { ObjectLiteral } from "quickdoks:type-definitions/types.d.js";

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
