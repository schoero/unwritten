import type { StringLiteralType } from "unwritten:compiler/type-definitions/types.js";
import type { TypeScriptRenderContext } from "unwritten:renderer/typescript/type-definitions/renderer.js";


export function renderStringLiteralType(ctx: TypeScriptRenderContext, type: StringLiteralType): string {
  return `"${type.value}"`;
}
