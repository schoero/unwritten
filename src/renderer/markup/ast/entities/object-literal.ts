import { renderPropertyForDocumentation } from "./property.js";

import type { ObjectLiteral } from "unwritten:compiler:type-definitions/types.d.js";
import type { MarkupRenderContext, RenderedObjectLiteralType } from "unwritten:renderer:markup/types/renderer.js";


export function renderObjectLiteralType(ctx: MarkupRenderContext, obj: ObjectLiteral): RenderedObjectLiteralType {

  const description = obj.description;
  const example = obj.example;
  const properties = obj.properties.map(property => renderPropertyForDocumentation(ctx, property));

  return [
    description,
    example,
    [properties]
  ];

}
