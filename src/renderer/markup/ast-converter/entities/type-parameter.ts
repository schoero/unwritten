import { convertType } from "unwritten:renderer/markup/ast-converter/index.js";
import { useTranslation } from "unwritten:renderer/markup/utils/translations.js";
import { getRenderConfig } from "unwritten:renderer:markup/utils/config.js";
import { encapsulate, spaceBetween } from "unwritten:renderer:markup/utils/renderer.js";

import type { TypeParameterEntity } from "unwritten:compiler:type-definitions/entities.js";
import type { MarkupRenderContexts } from "unwritten:renderer/markup/types-definitions/markup.d.js";
import type {
  ConvertedTypeParameterEntitiesForSignature,
  ConvertedTypeParameterEntityForDocumentation,
  ConvertedTypeParameterEntityForSignature
} from "unwritten:renderer/markup/types-definitions/renderer.js";


export function convertTypeParameterEntitiesForSignature(ctx: MarkupRenderContexts, typeParameterEntities: TypeParameterEntity[]): ConvertedTypeParameterEntitiesForSignature {
  const renderedTypeParameters = typeParameterEntities.flatMap((typeParameter, index) => {
    const convertedTypeParameter = convertTypeParameterEntityForSignature(ctx, typeParameter);
    if(index === 0){
      return [convertedTypeParameter];
    } else {
      return [", ", convertedTypeParameter];
    }
  });

  return renderedTypeParameters;
}


export function convertTypeParameterEntityForDocumentation(ctx: MarkupRenderContexts, typeParameterEntity: TypeParameterEntity): ConvertedTypeParameterEntityForDocumentation {

  const renderConfig = getRenderConfig(ctx);
  const t = useTranslation(ctx);

  const description = typeParameterEntity.description ?? "";
  const name = encapsulate(typeParameterEntity.name, renderConfig.typeParameterEncapsulation);

  const constraint = typeParameterEntity.constraint
    ? convertType(ctx, typeParameterEntity.constraint)
    : "";

  const initializer = typeParameterEntity.initializer !== undefined
    ? spaceBetween(
      `${t("default", { capitalize: true })}:`,
      convertType(ctx, typeParameterEntity.initializer)
    )
    : "";

  return spaceBetween(
    name,
    constraint,
    description,
    initializer
  );

}


function convertTypeParameterEntityForSignature(ctx: MarkupRenderContexts, typeParameterEntity: TypeParameterEntity): ConvertedTypeParameterEntityForSignature {
  const name = typeParameterEntity.name;
  return name;
}
