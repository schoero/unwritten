import { getRenderConfig } from "unwritten:renderer/utils/config.js";
import { convertType } from "unwritten:renderer:markup/ast-converter/shared/type.js";
import { createListNode, createTitleNode } from "unwritten:renderer:markup/utils/nodes.js";
import { encapsulate, spaceBetween } from "unwritten:renderer:markup/utils/renderer.js";
import { getTranslator } from "unwritten:renderer:markup/utils/translations.js";

import type { MappedType } from "unwritten:interpreter:type-definitions/types.js";
import type { MarkupRenderContexts } from "unwritten:renderer:markup/types-definitions/markup.js";
import type { ConvertedMappedType } from "unwritten:renderer:markup/types-definitions/renderer.js";


export function convertMappedTypeInline(ctx: MarkupRenderContexts, mappedType: MappedType): ConvertedMappedType {

  const renderConfig = getRenderConfig(ctx);
  const translate = getTranslator(ctx);

  const readonly = mappedType.readonly === true
    ? encapsulate(translate("readonly"), renderConfig.tagEncapsulation)
    : "";

  const optional = mappedType.optional === true
    ? encapsulate(translate("optional"), renderConfig.tagEncapsulation)
    : "";

  const convertedProperties = mappedType.properties.map(propertyEntity => {
    const name = propertyEntity.name;
    const { inlineType } = convertType(ctx, propertyEntity.type);
    return spaceBetween(name, inlineType, readonly, optional);
  });

  return createTitleNode(
    translate("property", { count: 99 }),
    createListNode(...convertedProperties)
  );

}
