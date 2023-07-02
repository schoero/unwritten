import { relative } from "node:path/posix";

import { createLinkNode, createSmallNode } from "unwritten:renderer/markup/utils/nodes.js";
import { getTranslator } from "unwritten:renderer/markup/utils/translations.js";

import type { Position } from "unwritten:interpreter:type-definitions/shared.js";
import type { ConvertedPosition } from "unwritten:renderer/markup/types-definitions/renderer.js";
import type { MarkupRenderContexts } from "unwritten:renderer:markup/types-definitions/markup.js";


export function convertPosition(ctx: MarkupRenderContexts, position?: Position): ConvertedPosition {

  if(!position){
    return "";
  }

  const t = getTranslator(ctx);

  const relativePosition = relative(ctx.config.outputDir, position.file);
  const link = `${relativePosition}#L${position.line}C${position.column}`;

  const linkLabel = relativePosition.replaceAll("../", "");

  const definedInTranslation = t("defined-in", { capitalize: true });
  const definedInLabel = definedInTranslation && `${definedInTranslation}: ` || "";

  const linkNode = createLinkNode(linkLabel, link);

  return createSmallNode(
    ...definedInLabel
      ? [
        definedInLabel,
        linkNode
      ]
      : [linkNode]
  );

}
