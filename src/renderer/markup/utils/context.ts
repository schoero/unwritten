import type { MarkupRenderContexts } from "unwritten:renderer/markup/types-definitions/markup.js";


export function withIndentation<RenderContext extends MarkupRenderContexts, ReturnType, Args>(ctx: RenderContext, callback: (ctx: RenderContext, ...args: Args[]) => ReturnType, ...args: Args[]): ReturnType {
  ctx.indentation++;
  const result = callback(ctx, ...args);
  ctx.indentation--;
  return result;
}


export function withNesting<RenderContext extends MarkupRenderContexts, ReturnType>(ctx: RenderContext, callback: (ctx: RenderContext) => ReturnType): ReturnType {
  ctx.nesting++;
  const result = callback(ctx);
  ctx.nesting--;
  return result;
}
