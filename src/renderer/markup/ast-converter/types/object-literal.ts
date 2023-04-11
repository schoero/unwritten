import { convertObjectType } from "unwritten:renderer/markup/ast-converter/types/index.js";

import type { ObjectLiteralType } from "unwritten:interpreter:type-definitions/types.js";
import type { MarkupRenderContexts } from "unwritten:renderer/markup/types-definitions/markup.js";
import type { ConvertedObjectLiteralType } from "unwritten:renderer/markup/types-definitions/renderer.js";


export function convertObjectLiteralType(ctx: MarkupRenderContexts, objectLiteralType: ObjectLiteralType): ConvertedObjectLiteralType {
  const [_,, ...convertedObjectLiteralType] = convertObjectType(ctx, objectLiteralType);
  return convertedObjectLiteralType;
}
