import { getRenderConfig } from "unwritten:renderer/utils/config.js";
import { encapsulate } from "unwritten:renderer:markup/utils/renderer.js";
import { getTranslator } from "unwritten:renderer:markup/utils/translations.js";

import type { Rest } from "unwritten:interpreter/type-definitions/shared.js";
import type { MarkupRenderContexts } from "unwritten:renderer:markup/types-definitions/markup.js";
import type { ASTNodes } from "unwritten:renderer:markup/types-definitions/nodes.js";


export function convertRest(ctx: MarkupRenderContexts, entity: Rest): ASTNodes[] {

  const translate = getTranslator(ctx);
  const renderConfig = getRenderConfig(ctx);

  return entity.rest === true
    ? [encapsulate(translate("rest"), renderConfig.tagEncapsulation)]
    : [];

}
