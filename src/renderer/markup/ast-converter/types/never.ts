import { TypeKind } from "unwritten:interpreter/enums/type";
import { getRenderConfig } from "unwritten:renderer/utils/config";
import { createLinkNode } from "unwritten:renderer:markup/utils/nodes";
import { encapsulate } from "unwritten:renderer:markup/utils/renderer";

import type { NeverType } from "unwritten:interpreter:type-definitions/types";
import type { MarkupRenderContext } from "unwritten:renderer:markup/types-definitions/markup";
import type { ConvertedNeverTypeInline } from "unwritten:renderer:markup/types-definitions/renderer";


export function convertNeverTypeInline(ctx: MarkupRenderContext, neverType: NeverType): ConvertedNeverTypeInline {

  const renderConfig = getRenderConfig(ctx);

  const name = neverType.name;
  const encapsulatedName = encapsulate(name, renderConfig.typeEncapsulation);
  const link = ctx.config.externalTypes[TypeKind.Never] && createLinkNode(encapsulatedName, ctx.config.externalTypes[TypeKind.Never]);

  return link || encapsulatedName;

}
