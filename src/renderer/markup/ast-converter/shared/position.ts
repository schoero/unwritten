import { createSmallNode } from "unwritten:renderer/markup/utils/nodes.js";

import type { Position } from "unwritten:interpreter:type-definitions/shared.js";
import type { ConvertedPosition } from "unwritten:renderer/markup/types-definitions/renderer.js";
import type { MarkupRenderContexts } from "unwritten:renderer:markup/types-definitions/markup.js";


export function convertPosition(ctx: MarkupRenderContexts, position?: Position): ConvertedPosition {
  return position
    ? createSmallNode(`${position.file}#L${position.line}C${position.column}`)
    : "";
}
