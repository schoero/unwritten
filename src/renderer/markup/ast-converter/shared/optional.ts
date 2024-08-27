import { encapsulate } from "unwritten:renderer:markup/utils/renderer";
import { getTranslator } from "unwritten:renderer:markup/utils/translations";
import { getRenderConfig } from "unwritten:renderer/utils/config";

import type { Optional } from "unwritten:interpreter:type-definitions/shared";
import type { MarkupRenderContext } from "unwritten:renderer:markup/types-definitions/markup";
import type { ASTNode } from "unwritten:renderer:markup/types-definitions/nodes";


export function convertOptional(ctx: MarkupRenderContext, entity: Optional): ASTNode[] {

  const translate = getTranslator(ctx);
  const renderConfig = getRenderConfig(ctx);

  return entity.optional === true
    ? [encapsulate(translate("optional"), renderConfig.tagEncapsulation)]
    : [];

}
