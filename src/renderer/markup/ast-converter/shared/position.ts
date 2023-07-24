import { getSourceFileById } from "unwritten:renderer/markup/registry/registry.js";
import { createLinkNode, createSmallNode } from "unwritten:renderer:markup/utils/nodes.js";
import { getTranslator } from "unwritten:renderer:markup/utils/translations.js";

import type { Position } from "unwritten:interpreter:type-definitions/shared.js";
import type { MarkupRenderContexts } from "unwritten:renderer:markup/types-definitions/markup.js";
import type { ConvertedPosition } from "unwritten:renderer:markup/types-definitions/renderer.js";


export function convertPosition(ctx: MarkupRenderContexts, position?: Position): ConvertedPosition {

  const { relative } = ctx.dependencies.path;

  if(!position){
    return "";
  }

  const translate = getTranslator(ctx);

  const sourceFile = getSourceFileById(ctx, ctx.currentFile!);
  const relativePosition = relative(sourceFile.path, ctx.config.outputDir);
  const link = `${relativePosition}#L${position.line}C${position.column}`;

  const linkLabel = relativePosition.replaceAll("../", "");

  const definedInTranslation = translate("defined-in", { capitalize: true });
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
