import { convertObjectType } from "unwritten:renderer/markup/ast-converter/types/object.js";

import type { InterfaceType } from "unwritten:interpreter:type-definitions/types.js";
import type { MarkupRenderContexts } from "unwritten:renderer:markup/types-definitions/markup.d.js";
import type { ConvertedInterfaceType } from "unwritten:renderer:markup/types-definitions/renderer.js";


export function convertInterfaceType(ctx: MarkupRenderContexts, interfaceType: InterfaceType): ConvertedInterfaceType {
  return convertObjectType(ctx, interfaceType);
}
