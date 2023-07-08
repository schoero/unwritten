import { convertType } from "unwritten:renderer:markup/ast-converter/shared/type.js";
import { assert } from "unwritten:utils/general.js";
import { txt } from "unwritten:utils/template.js";

import type { IndexedAccessType } from "unwritten:interpreter:type-definitions/types.js";
import type { MarkupRenderContexts } from "unwritten:renderer:markup/types-definitions/markup.js";
import type { ConvertedIndexedAccessTypeInline } from "unwritten:renderer:markup/types-definitions/renderer.js";


export function convertIndexedAccessType(ctx: MarkupRenderContexts, indexedAccessType: IndexedAccessType): ConvertedIndexedAccessTypeInline {

  assert(indexedAccessType.type, txt`
    Indexed access type does not have a valid type. Please report an issue with the type.
  `);

  const { inlineType } = convertType(ctx, indexedAccessType.type);
  return inlineType;

}
