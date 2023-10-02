import { convertType } from "unwritten:renderer:markup/ast-converter/shared/type.js";

import type { IndexedAccessType } from "unwritten:interpreter:type-definitions/types.js";
import type { MarkupRenderContexts } from "unwritten:renderer:markup/types-definitions/markup.js";
import type {
  ConvertedIndexedAccessTypeInline,
  ConvertedIndexedAccessTypeMultiline
} from "unwritten:renderer:markup/types-definitions/renderer.js";


export function convertIndexedAccessTypeInline(ctx: MarkupRenderContexts, indexedAccessType: IndexedAccessType): ConvertedIndexedAccessTypeInline {
  if(indexedAccessType.type){
    return convertType(ctx, indexedAccessType.type).inlineType;
  }
  throw new Error("IndexedAccessType must have a type");
}

export function convertIndexedAccessTypeMultiline(ctx: MarkupRenderContexts, indexedAccessType: IndexedAccessType): ConvertedIndexedAccessTypeMultiline | undefined {
  if(indexedAccessType.type){
    return convertType(ctx, indexedAccessType.type).multilineType;
  }
  throw new Error("IndexedAccessType must have a type");
}
