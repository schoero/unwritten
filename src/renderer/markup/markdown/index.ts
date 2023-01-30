import { BuiltInRenderers } from "unwritten:renderer/enums/renderer.js";
import { render } from "unwritten:renderer:markup/shared/index.js";

import * as helpers from "./helpers.js";

import type { ExportableEntities } from "unwritten:compiler/type-definitions/entities.js";
import type { MarkdownRenderer } from "unwritten:renderer:markup/types/renderer.js";
import type { RenderContext } from "unwritten:type-definitions/context.js";
import type { Renderer } from "unwritten:type-definitions/renderer.js";


function verifyRenderer(renderer: Renderer): asserts renderer is MarkdownRenderer {
  if(renderer.name !== BuiltInRenderers.Markdown){
    throw new Error(`Renderer '${renderer.name}' is not a Markdown renderer.`);
  }
}

function verifyContext(ctx: RenderContext): asserts ctx is RenderContext<MarkdownRenderer> {
  verifyRenderer(ctx.renderer);
}

export const markdownRenderer: MarkdownRenderer = {
  ...helpers,
  fileExtension: "md",
  name: BuiltInRenderers.Markdown,
  render<CustomRenderer extends Renderer>(ctx: RenderContext<CustomRenderer>, entities: ExportableEntities[]) {
    verifyContext(ctx);
    return render<MarkdownRenderer>(ctx, entities);
  }
};
