import { renderType } from "quickdoks:renderer/markup/entry-points/types.js";
import { renderDescription } from "quickdoks:renderer/markup/mixins/description.js";
import { getRenderConfig } from "quickdoks:renderer:markup/utils/config.js";
import { encapsulate, spaceBetween } from "quickdoks:renderer:markup/utils/renderer.js";

import type { TypeParameterEntity } from "quickdoks:compiler:type-definitions/entities.js";
import type {
  MarkupRenderer,
  RenderedTypeParameterForDocumentation,
  RenderedTypeParameterForSignature,
  RenderedTypeParametersForSignature
} from "quickdoks:renderer:markup/types/renderer.js";
import type { RenderContext } from "quickdoks:type-definitions/context.d.js";


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
