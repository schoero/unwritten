import { renderType } from "unwritten:renderer:typescript/ast/index.js";

import type { TypeParameterEntity } from "unwritten:interpreter:type-definitions/entities.js";
import type { TypeScriptRenderContext } from "unwritten:renderer:typescript/type-definitions/renderer.js";


export function renderTypeParameterEntity(ctx: TypeScriptRenderContext, typeParameterEntity: TypeParameterEntity): string {

  const renderedName = typeParameterEntity.name;

  const renderedConstraint = typeParameterEntity.constraint
    ? ` extends ${renderType(ctx, typeParameterEntity.constraint)}`
    : "";

  const renderedInitializer = typeParameterEntity.initializer
    ? ` = ${renderType(ctx, typeParameterEntity.initializer)}`
    : "";

  return `${renderedName}${renderedConstraint}${renderedInitializer}`;

}
