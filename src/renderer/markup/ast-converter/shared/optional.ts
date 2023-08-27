import { getRenderConfig } from "unwritten:renderer/utils/config.js";
import { encapsulate } from "unwritten:renderer:markup/utils/renderer.js";
import { getTranslator } from "unwritten:renderer:markup/utils/translations.js";

import type { Optional } from "unwritten:interpreter/type-definitions/shared.js";
import type { MarkupRenderContexts } from "unwritten:renderer:markup/types-definitions/markup.js";
import type { ASTNode } from "unwritten:renderer:markup/types-definitions/nodes.js";


export function convertOptional(ctx: MarkupRenderContexts, entity: Optional): ASTNode[] {

  const translate = getTranslator(ctx);
  const renderConfig = getRenderConfig(ctx);

  return entity.optional === true
    ? [encapsulate(translate("optional"), renderConfig.tagEncapsulation)]
    : [];

}
