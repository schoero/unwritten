import { renderType } from "unwritten:renderer:typescript/ast/index.js";

import type { UnionType } from "unwritten:interpreter:type-definitions/types.js";
import type { TypeScriptRenderContext } from "unwritten:renderer:typescript/type-definitions/renderer.js";


export function renderUnionType(ctx: TypeScriptRenderContext, unionType: UnionType): string {
  return unionType.types.map(type => renderType(ctx, type)).join(" | ");
}
