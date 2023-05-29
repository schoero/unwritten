import { encapsulate } from "unwritten:renderer/markup/utils/renderer.js";
import { getTranslator } from "unwritten:renderer/markup/utils/translations.js";
import { getRenderConfig } from "unwritten:renderer/utils/config.js";

import type { Optional } from "unwritten:interpreter/type-definitions/shared.js";
import type { MarkupRenderContexts } from "unwritten:renderer/markup/types-definitions/markup.js";
import type { ASTNodes } from "unwritten:renderer/markup/types-definitions/nodes.js";


export function convertOptional(ctx: MarkupRenderContexts, entity: Optional): ASTNodes[] {

  const t = getTranslator(ctx);
  const renderConfig = getRenderConfig(ctx);

  return entity.optional === true
    ? [encapsulate(t("optional"), renderConfig.tagEncapsulation)]
    : [];

}
