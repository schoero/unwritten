import { convertType } from "unwritten:renderer/markup/ast-converter/index.js";
import { createLinkNode } from "unwritten:renderer/markup/utils/nodes.js";
import { getRenderConfig } from "unwritten:renderer:markup/utils/config.js";
import { encapsulate } from "unwritten:renderer:markup/utils/renderer.js";

import type { TypeReferenceType } from "unwritten:compiler:type-definitions/types.js";
import type { MarkupRenderContexts } from "unwritten:renderer/markup/types-definitions/markup.d.js";
import type { ConvertedTypeReferenceType } from "unwritten:renderer/markup/types-definitions/renderer.js";


export function convertTypeReferenceType(ctx: MarkupRenderContexts, typeReferenceType: TypeReferenceType): ConvertedTypeReferenceType {

  const renderConfig = getRenderConfig(ctx);

  const name = typeReferenceType.name ?? "";

  const encapsulatedTypeArguments = typeReferenceType.typeArguments?.map(
    typeArgument =>
      encapsulate(convertType(ctx, typeArgument), renderConfig.typeEncapsulation)
  );

  const link = typeReferenceType.type && createLinkNode(name, typeReferenceType.type.id);

  return link ?? name;

}
