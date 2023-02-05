import { renderType } from "unwritten:renderer/markup/ast/index.js";
import { renderDescription } from "unwritten:renderer:markup/shared/description.js";
import { getRenderConfig } from "unwritten:renderer:markup/utils/config.js";
import { encapsulate, spaceBetween } from "unwritten:renderer:markup/utils/renderer.js";

import type { TypeParameterEntity } from "unwritten:compiler:type-definitions/entities.js";
import type {
  MarkupRenderContext,
  RenderedTypeParameterForDocumentation,
  RenderedTypeParameterForSignature,
  RenderedTypeParametersForSignature
} from "unwritten:renderer:markup/types/renderer.js";


export function renderTypeParametersForSignature(ctx: MarkupRenderContext, typeParameterEntities: TypeParameterEntity[]): RenderedTypeParametersForSignature {
  return typeParameterEntities
    .map((parameter, index) => renderTypeParameterForSignature(ctx, parameter))
    .join(", ");
}


export function renderTypeParameterForDocumentation(ctx: MarkupRenderContext, typeParameterEntity: TypeParameterEntity): RenderedTypeParameterForDocumentation {

  const renderConfig = getRenderConfig(ctx);

  const description = renderDescription(ctx, typeParameterEntity.description) ?? "";
  const name = encapsulate(typeParameterEntity.name, renderConfig.typeParameterEncapsulation);

  const type = typeParameterEntity.constraint ? `${renderType(ctx, typeParameterEntity.constraint)}` : "";
  const initializer = typeParameterEntity.initializer !== undefined ? `Default: ${renderType(ctx, typeParameterEntity.initializer)}` : "";

  return `${name}: ${spaceBetween(type, description, initializer)}`;

}


function renderTypeParameterForSignature(ctx: MarkupRenderContext, typeParameterEntity: TypeParameterEntity): RenderedTypeParameterForSignature {
  return `${typeParameterEntity.name}`;
}
