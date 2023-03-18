import { getRenderConfig } from "unwritten:renderer:markup/utils/config.js";
import { encapsulate } from "unwritten:renderer:markup/utils/renderer.js";

import type { ClassType } from "unwritten:interpreter/type-definitions/types.js";
import type { MarkupRenderContexts } from "unwritten:renderer/markup/types-definitions/markup.d.js";
import type { ConvertedClassType } from "unwritten:renderer/markup/types-definitions/renderer.js";


export function convertClassType(ctx: MarkupRenderContexts, classType: ClassType): ConvertedClassType {

  const renderConfig = getRenderConfig(ctx);

  const name = classType.name;
  const encapsulatedName = encapsulate(name, renderConfig.typeEncapsulation);

  return encapsulatedName;

}
