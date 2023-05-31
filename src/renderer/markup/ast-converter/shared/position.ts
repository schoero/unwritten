import { relative } from "node:path";

import { createLinkNode, createSmallNode } from "unwritten:renderer/markup/utils/nodes.js";

import type { Position } from "unwritten:interpreter:type-definitions/shared.js";
import type { ConvertedPosition } from "unwritten:renderer/markup/types-definitions/renderer.js";
import type { MarkupRenderContexts } from "unwritten:renderer:markup/types-definitions/markup.js";


export function convertPosition(ctx: MarkupRenderContexts, position?: Position): ConvertedPosition {

  if(!position){
    return "";
  }

  const relativePosition = relative(ctx.config.outputDir, position.file);
  const link = `${relativePosition}#L${position.line}C${position.column}`;
  const label = relativePosition.replaceAll("../", "");

  return createSmallNode(
    createLinkNode(label, link)
  );

}
