import type { BigIntType } from "unwritten:compiler:type-definitions/types.js";
import type { TypeScriptRenderContext } from "unwritten:renderer/typescript/type-definitions/renderer.js";


export function renderBigIntType(ctx: TypeScriptRenderContext, bigIntType: BigIntType): string {
  const name = bigIntType.name;
  return name;
}
