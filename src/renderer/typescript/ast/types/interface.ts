import type { InterfaceType } from "unwritten:compiler/type-definitions/types.js";
import type { TypeScriptRenderContext } from "unwritten:renderer/typescript/type-definitions/renderer.js";


export function renderInterfaceType(ctx: TypeScriptRenderContext, interfaceType: InterfaceType): string {
  return interfaceType.name;
}
