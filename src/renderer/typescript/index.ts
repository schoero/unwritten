import { BuiltInRenderers } from "unwritten:renderer/enums/renderer.js";

import type { ExportableEntities } from "unwritten:compiler/type-definitions/entities.js";
import type { TypeScriptRenderContext, TypeScriptRenderer } from "unwritten:renderer:ts/type-definitions/renderer.js";
import type { RenderContext } from "unwritten:type-definitions/context.js";
import type { Renderer } from "unwritten:type-definitions/renderer.js";


export function isTypeScriptRenderer(renderer: Renderer): renderer is TypeScriptRenderer {
  return renderer.name === BuiltInRenderers.TypeScript;
}

function verifyRenderer(renderer: Renderer): asserts renderer is TypeScriptRenderer {
  if(!isTypeScriptRenderer(renderer)){
    throw new Error(`Renderer '${renderer.name}' is not a TypeScript renderer.`);
  }
}

function verifyContext(ctx: RenderContext<Renderer>): asserts ctx is TypeScriptRenderContext {
  verifyRenderer(ctx.renderer);
}

const typescriptRenderer: TypeScriptRenderer = {
  fileExtension: ".ts",
  name: BuiltInRenderers.TypeScript,

  render(ctx: RenderContext<Renderer>, entities: ExportableEntities[]) {


    //-- Initialize the context

    verifyContext(ctx);

    ctx.indentation = 0;


    //-- Render

    const markupAST = convertToMarkupAST(ctx, entities);
    return renderContainerNode(ctx, markupAST);

  }

};

export default typescriptRenderer;
