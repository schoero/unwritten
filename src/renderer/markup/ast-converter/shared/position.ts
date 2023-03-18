import type { Position } from "unwritten:interpreter/type-definitions/shared.js";
import type { MarkupRenderContexts } from "unwritten:renderer/markup/types-definitions/markup.js";


export function convertPosition(ctx: MarkupRenderContexts, position: Position): string {
  return `${position.file}#L${position.line}C${position.column}`;
}
