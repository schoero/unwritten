import { RenderContext } from "../../../types/context.js";
import { Array } from "../../../types/types.js";
import { MarkupRenderer } from "../types/renderer.js";
import { renderType } from "./type.js";


// eslint-disable-next-line @typescript-eslint/array-type
export function renderArrayType(ctx: RenderContext<MarkupRenderer>, type: Array) {
  return `${renderType(ctx, type.type, false)}[]`;
}