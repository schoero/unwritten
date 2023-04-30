import { getDefaultConfig } from "unwritten:config/index.js";
import { BuiltInRenderers } from "unwritten:renderer:enums/renderer.js";
import jsonRenderer from "unwritten:renderer:json/index.js";
import htmlRenderer from "unwritten:renderer:markup/html/index.js";
import { override } from "unwritten:utils:override.js";

import type { JSONRenderContext } from "unwritten:renderer:json/type-definitions/renderer.js";
import type { HTMLRenderContext, MarkdownRenderContext } from "unwritten:renderer:markup/types-definitions/markup.js";
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

  if(rendererName === BuiltInRenderers.HTML){
    ctx.renderer = htmlRenderer;

    (ctx as HTMLRenderContext).indentation = 0;
    (ctx as HTMLRenderContext).size = 1;

  // } else if(rendererName === BuiltInRenderers.Markdown){
  //   renderer = markdownRenderer;
  } else {
    ctx.renderer = jsonRenderer;
  }

  return ctx;

}
