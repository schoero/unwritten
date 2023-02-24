import type { BigIntLiteralType } from "unwritten:compiler:type-definitions/types.js";
import type { TypeScriptRenderContext } from "unwritten:renderer/typescript/type-definitions/renderer.js";


export function renderBigIntLiteralType(ctx: TypeScriptRenderContext, bigIntType: BigIntLiteralType): string {
  const value = bigIntType.value.toString();
  return value;
}
