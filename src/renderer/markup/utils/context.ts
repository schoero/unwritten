import { getRenderConfig } from "unwritten:renderer/utils/config.js";

import type { MarkupRenderContexts } from "unwritten:renderer/markup/types-definitions/markup.js";


export function isRenderParentNamesEnabled(ctx: MarkupRenderContexts, target: "documentation" | "tableOfContents"): boolean {
  const renderConfig = getRenderConfig(ctx);
  return renderConfig.renderParentNames === true || renderConfig.renderParentNames === target;
}

export function renderMemberContext(ctx: MarkupRenderContexts, target: "documentation" | "tableOfContents", name?: string): string {

  return isRenderParentNamesEnabled(ctx, target)
    ? [
      ...ctx.memberContext,
      ...name
        ? [name]
        : []
    ].join(".")
    : name ?? "";

}

export function withIndentation<RenderContext extends MarkupRenderContexts, ReturnType, Args>(ctx: RenderContext, callback: (ctx: RenderContext, ...args: Args[]) => ReturnType, ...args: Args[]): ReturnType {
  ctx.indentation++;
  const result = callback(ctx, ...args);
  ctx.indentation--;
  return result;
}

export function withMemberContext<RenderContext extends MarkupRenderContexts, ReturnType>(ctx: RenderContext, contextName: string, callback: (ctx: RenderContext) => ReturnType): ReturnType {
  ctx.memberContext.push(contextName);
  const result = callback(ctx);
  ctx.memberContext.pop();
  return result;
}

export function withNesting<RenderContext extends MarkupRenderContexts, ReturnType>(ctx: RenderContext, callback: (ctx: RenderContext) => ReturnType): ReturnType {
  const initialNesting = ctx.nesting;
  ctx.nesting++;
  const result = callback(ctx);
  initialNesting !== ctx.nesting && ctx.nesting--;
  return result;
}
