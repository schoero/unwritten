import { BuiltInRenderers } from "unwritten:renderer/enums/renderer.js";
import { render } from "unwritten:renderer:markup/shared/index.js";

import * as helpers from "./helpers.js";

import type { ExportableEntities } from "unwritten:compiler/type-definitions/entities.js";
import type { HTMLRenderer } from "unwritten:renderer:markup/types/renderer.js";
import type { RenderContext } from "unwritten:type-definitions/context.js";
import type { Renderer } from "unwritten:type-definitions/renderer.js";


function verifyRenderer(renderer: Renderer): asserts renderer is HTMLRenderer {
  if(renderer.name !== BuiltInRenderers.Markdown){
    throw new Error(`Renderer '${renderer.name}' is not a Markdown renderer.`);
  }
}

function verifyContext(ctx: RenderContext): asserts ctx is RenderContext<HTMLRenderer> {
  verifyRenderer(ctx.renderer);
}

export const htmlRenderer: HTMLRenderer = {
  ...helpers,
  fileExtension: "html",
  name: BuiltInRenderers.HTML,
  render<CustomRenderer extends Renderer>(ctx: RenderContext<CustomRenderer>, entities: ExportableEntities[]) {
    verifyContext(ctx);
    return render(ctx, entities);
  }
};
