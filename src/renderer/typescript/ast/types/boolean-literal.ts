import type { BooleanLiteralType } from "unwritten:compiler:type-definitions/types.js";
import type { TypeScriptRenderContext } from "unwritten:renderer/typescript/type-definitions/renderer.js";


export function renderBooleanLiteralType(ctx: TypeScriptRenderContext, booleanType: BooleanLiteralType): string {
  return `${booleanType.value}`;

}
