import { RenderContext } from "../../../types/context.js";
import { ObjectLiteral } from "../../../types/types.js";
import { MarkupRenderer, RenderedObjectLiteralType } from "../types/renderer.js";
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
