import { renderType } from "unwritten:renderer/markup/entry-points/types.js";
import { renderDescription } from "unwritten:renderer/markup/mixins/description.js";
import { getRenderConfig } from "unwritten:renderer:markup/utils/config.js";
import { encapsulate, spaceBetween } from "unwritten:renderer:markup/utils/renderer.js";

import type { TypeParameterEntity } from "unwritten:compiler:type-definitions/entities.js";
import type {
  MarkupRenderer,
  RenderedTypeParameterForDocumentation,
  RenderedTypeParameterForSignature,
  RenderedTypeParametersForSignature
} from "unwritten:renderer:markup/types/renderer.js";
import type { RenderContext } from "unwritten:type-definitions/context.d.js";


export function renderTypeParametersForSignature(ctx: RenderContext<MarkupRenderer>, typeParameterEntities: TypeParameterEntity[]): RenderedTypeParametersForSignature {
  return typeParameterEntities
    .map((parameter, index) => renderTypeParameterForSignature(ctx, parameter))
    .join(", ");
}


export function renderTypeParameterForDocumentation(ctx: RenderContext<MarkupRenderer>, typeParameterEntity: TypeParameterEntity): RenderedTypeParameterForDocumentation {

  const renderConfig = getRenderConfig(ctx);

  const description = renderDescription(ctx, typeParameterEntity.description) ?? "";
  const name = encapsulate(typeParameterEntity.name, renderConfig.typeParameterEncapsulation);

  const type = typeParameterEntity.constraint ? `${renderType(ctx, typeParameterEntity.constraint)}` : "";
  const initializer = typeParameterEntity.initializer !== undefined ? `Default: ${renderType(ctx, typeParameterEntity.initializer)}` : "";

  return `${name}: ${spaceBetween(type, description, initializer)}`;

}


function renderTypeParameterForSignature(ctx: RenderContext<MarkupRenderer>, typeParameterEntity: TypeParameterEntity): RenderedTypeParameterForSignature {
  return `${typeParameterEntity.name}`;
}
