import { renderPropertyForDocumentation } from "./property.js";

import type { ObjectLiteral } from "unwritten:compiler:type-definitions/types.d.js";
import type { MarkupRenderer, RenderedObjectLiteralType } from "unwritten:renderer:markup/types/renderer.js";
import type { RenderContext } from "unwritten:type-definitions/context.d.js";


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
