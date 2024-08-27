import {
  createLinkNode,
  createPaddedNode,
  createParagraphNode,
  createSmallNode
} from "unwritten:renderer:markup/utils/nodes";
import { getTranslator } from "unwritten:renderer:markup/utils/translations";
import { getRenderConfig } from "unwritten:renderer/utils/config.js";

import type { Position } from "unwritten:interpreter:type-definitions/shared";
import type { MarkupRenderContext } from "unwritten:renderer:markup/types-definitions/markup";
import type { ConvertedPosition } from "unwritten:renderer:markup/types-definitions/renderer";


export function convertPositionForDocumentation(ctx: MarkupRenderContext, position?: Position): ConvertedPosition {

  const renderConfig = getRenderConfig(ctx);

  if(renderConfig.renderSourceCodeLinks === false){
    return;
  }

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
