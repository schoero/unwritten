import { getDefaultConfig } from "unwritten:config/index.js";
import markdownRenderer, { isMarkdownRenderContext } from "unwritten:renderer/markup/markdown/index.js";
import { minMax } from "unwritten:renderer/markup/utils/renderer.js";
import { BuiltInRenderers } from "unwritten:renderer:enums/renderer.js";
import jsonRenderer from "unwritten:renderer:json/index.js";
import htmlRenderer, { isHTMLRenderContext } from "unwritten:renderer:markup/html/index.js";
import { assert } from "unwritten:utils/general.js";
import { override } from "unwritten:utils:override.js";

import type { JSONRenderContext } from "unwritten:renderer:json/type-definitions/renderer.js";
import type {
  HTMLRenderContext,
  MarkdownRenderContext,
  MarkupRenderContexts
} from "unwritten:renderer:markup/types-definitions/markup.js";
import type { CompleteConfig } from "unwritten:type-definitions/config.js";
import type { RenderContext } from "unwritten:type-definitions/context.js";
import type { Renderer } from "unwritten:type-definitions/renderer.js";


const testConfig: CompleteConfig = override(getDefaultConfig(), {
  externalTypes: {},
  renderConfig: {
    html: {
      parameterEncapsulation: false,
      propertyEncapsulation: false,
      tagEncapsulation: false,
      typeEncapsulation: false,
      typeParameterEncapsulation: ["<", ">"]
    },
    ts: {
      renderEmptyFunctionBody: false
    }
  }
});


export function createRenderContext(rendererName?: BuiltInRenderers.HTML): HTMLRenderContext;
export function createRenderContext(rendererName: BuiltInRenderers.Markdown): MarkdownRenderContext;
export function createRenderContext(rendererName: BuiltInRenderers.JSON): JSONRenderContext;
export function createRenderContext(rendererName: BuiltInRenderers = BuiltInRenderers.HTML): RenderContext<Renderer> {

  const ctx: RenderContext<Renderer> = {
    config: JSON.parse(JSON.stringify(testConfig)),
    renderer: htmlRenderer
  };

  const attachAccessors = (ctx: MarkupRenderContexts) => {

    Object.defineProperty(ctx, "nesting", {
      get() {
        return ctx._nesting ?? 1;
      },
      set(level: number) {
        ctx._nesting = minMax(level, 0, 6);
      }
    });

    Object.defineProperty(ctx, "indentation", {
      get() {
        return ctx._indentation ?? 0;
      },
      set(level: number) {
        ctx._indentation = minMax(level, 0, Infinity);
      }
    });

  };

  if(rendererName === BuiltInRenderers.HTML){
    ctx.renderer = htmlRenderer;

    assert(isHTMLRenderContext(ctx));
    attachAccessors(ctx);

  } else if(rendererName === BuiltInRenderers.Markdown){
    ctx.renderer = markdownRenderer;

    assert(isMarkdownRenderContext(ctx));
    attachAccessors(ctx);

  } else {
    ctx.renderer = jsonRenderer;
  }

  return ctx;

}
