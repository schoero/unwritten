import { renderEntity } from "unwritten:renderer/typescript/ast/index.js";
import { renderNewLine } from "unwritten:renderer/utils/new-line.js";
import { BuiltInRenderers } from "unwritten:renderer:enums/renderer.js";

import type { ExportableEntities } from "unwritten:interpreter:type-definitions/entities.js";
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

function withVerifiedContext(ctx: RenderContext<Renderer>, callback: (ctx: TypeScriptRenderContext) => string) {
  verifyContext(ctx);
  return callback(ctx);
}

const typescriptRenderer: TypeScriptRenderer = {

  fileExtension: ".ts",
  name: BuiltInRenderers.TypeScript,

  render: (ctx: RenderContext<Renderer>, entities: ExportableEntities[]) => withVerifiedContext(ctx, ctx => {

    ctx.indentation = 0;

    const renderedNewLine = renderNewLine(ctx);
    const renderedEmptyLine = renderedNewLine + renderedNewLine;

    const renderedEntities = entities.map(entity => {
      return renderEntity(ctx, entity);
    }).join(renderedEmptyLine);

    return renderedEntities;

  })

};

export default typescriptRenderer;
