import { convertType } from "unwritten:renderer:markup/ast-converter/shared/type";

import type { IndexedAccessType } from "unwritten:interpreter:type-definitions/types";
import type { MarkupRenderContext } from "unwritten:renderer:markup/types-definitions/markup";
import type {
  ConvertedIndexedAccessTypeInline,
  ConvertedIndexedAccessTypeMultiline
} from "unwritten:renderer:markup/types-definitions/renderer";


export function convertIndexedAccessTypeInline(ctx: MarkupRenderContext, indexedAccessType: IndexedAccessType): ConvertedIndexedAccessTypeInline {
  if(indexedAccessType.type){
    return convertType(ctx, indexedAccessType.type).inlineType;
  }
  throw new Error("IndexedAccessType must have a type");
}

export function convertIndexedAccessTypeMultiline(ctx: MarkupRenderContext, indexedAccessType: IndexedAccessType): ConvertedIndexedAccessTypeMultiline | undefined {
  if(indexedAccessType.type){
    return convertType(ctx, indexedAccessType.type).multilineType;
  }
  throw new Error("IndexedAccessType must have a type");
}
