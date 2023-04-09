import { convertObjectType } from "unwritten:renderer/markup/ast-converter/types/object.js";

import type { TypeLiteralType } from "unwritten:interpreter:type-definitions/types.js";
import type { MarkupRenderContexts } from "unwritten:renderer/markup/types-definitions/markup.js";
import type { ConvertedTypeLiteralType } from "unwritten:renderer/markup/types-definitions/renderer.js";


export function convertTypeLiteralType(ctx: MarkupRenderContexts, typeLiteralType: TypeLiteralType): ConvertedTypeLiteralType {
  return convertObjectType(ctx, typeLiteralType);
}
