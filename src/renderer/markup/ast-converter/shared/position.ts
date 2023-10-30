import {
  createLinkNode,
  createPaddedNode,
  createParagraphNode,
  createSmallNode
} from "unwritten:renderer:markup/utils/nodes";
import { getTranslator } from "unwritten:renderer:markup/utils/translations";

import type { Position } from "unwritten:interpreter:type-definitions/shared";
import type { MarkupRenderContexts } from "unwritten:renderer:markup/types-definitions/markup";
import type { ConvertedPosition } from "unwritten:renderer:markup/types-definitions/renderer";


export function convertPositionForDocumentation(ctx: MarkupRenderContexts, position?: Position): ConvertedPosition {

  const { relative } = ctx.dependencies.path;

  if(!position){
    return;
  }

  const translate = getTranslator(ctx);

  const relativePosition = relative(ctx.config.outputDir, position.file);
  const link = `${relativePosition}#L${position.line}C${position.column}`;

  const linkLabel = relativePosition.replaceAll("../", "");

  const definedInTranslation = translate("definedIn", { capitalize: true });
  const definedInLabel = definedInTranslation && `${definedInTranslation}: ` || "";

  const linkNode = createLinkNode(linkLabel, link);

  return createPaddedNode(
    createParagraphNode(
      createSmallNode(
        ...definedInLabel
          ? [
            definedInLabel,
            linkNode
          ]
          : [linkNode]
      )
    )
  );

}
