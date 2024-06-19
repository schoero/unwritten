import { getRenderConfig } from "unwritten:renderer/utils/config";
import { encapsulate } from "unwritten:renderer:markup/utils/renderer";
import { getTranslator } from "unwritten:renderer:markup/utils/translations";

import type { Rest } from "unwritten:interpreter:type-definitions/shared";
import type { MarkupRenderContext } from "unwritten:renderer:markup/types-definitions/markup";
import type { ASTNode } from "unwritten:renderer:markup/types-definitions/nodes";


export function convertRest(ctx: MarkupRenderContext, entity: Rest): ASTNode[] {

  const translate = getTranslator(ctx);
  const renderConfig = getRenderConfig(ctx);

  return entity.rest === true
    ? [encapsulate(translate("rest"), renderConfig.tagEncapsulation)]
    : [];

}
