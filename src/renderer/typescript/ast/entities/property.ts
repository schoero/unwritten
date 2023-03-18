import { renderType } from "unwritten:renderer:ts/ast/index.js";

import type { PropertyEntity } from "unwritten:interpreter:type-definitions/entities.js";
import type { TypeScriptRenderContext } from "unwritten:renderer:ts/type-definitions/renderer.js";


export function renderPropertyEntity(ctx: TypeScriptRenderContext, propertyEntity: PropertyEntity): string {

  const type = renderType(ctx, propertyEntity.type);

  const initializer = propertyEntity.initializer
    ? ` = ${renderType(ctx, propertyEntity.initializer)}`
    : "";

  const optional = propertyEntity.optional === true
    ? "?"
    : "";

  return `${propertyEntity.name}${optional}: ${type}${initializer}`;

}
