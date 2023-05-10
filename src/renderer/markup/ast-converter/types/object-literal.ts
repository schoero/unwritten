import { convertObjectType } from "unwritten:renderer/markup/ast-converter/types/index.js";
import { encapsulate } from "unwritten:renderer/markup/utils/renderer.js";
import { getRenderConfig } from "unwritten:renderer/utils/config.js";

import type { ObjectLiteralType } from "unwritten:interpreter:type-definitions/types.js";
import type { MarkupRenderContexts } from "unwritten:renderer/markup/types-definitions/markup.js";
import type { ConvertedObjectLiteralType } from "unwritten:renderer/markup/types-definitions/renderer.js";


export function convertObjectLiteralType(ctx: MarkupRenderContexts, objectLiteralType: ObjectLiteralType): ConvertedObjectLiteralType {

  const renderConfig = getRenderConfig(ctx);

  const typeName = "object";
  const encapsulatedTypeName = encapsulate(typeName, renderConfig.typeEncapsulation);
  const members = convertObjectType(ctx, objectLiteralType);

  return [
    encapsulatedTypeName,
    members
  ];

}
