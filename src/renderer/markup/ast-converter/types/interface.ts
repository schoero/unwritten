import { convertObjectType } from "unwritten:renderer/markup/ast-converter/types/index.js";
import { getRenderConfig } from "unwritten:renderer/markup/utils/config.js";
import { encapsulate } from "unwritten:renderer/markup/utils/renderer.js";

import type { InterfaceType } from "unwritten:interpreter:type-definitions/types.js";
import type { MarkupRenderContexts } from "unwritten:renderer:markup/types-definitions/markup.d.js";
import type { ConvertedInterfaceType } from "unwritten:renderer:markup/types-definitions/renderer.js";


export function convertInterfaceType(ctx: MarkupRenderContexts, interfaceType: InterfaceType): ConvertedInterfaceType {

  const renderConfig = getRenderConfig(ctx);

  const typeName = interfaceType.name;
  const encapsulatedTypeName = encapsulate(typeName, renderConfig.typeEncapsulation);

  return [
    encapsulatedTypeName,
    convertObjectType(ctx, interfaceType)
  ];

}
