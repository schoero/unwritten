import type { BuiltInRenderers } from "unwritten:renderer/enums/renderer.js";
import type { RenderContext } from "unwritten:type-definitions/context.js";
import type { Renderer } from "unwritten:type-definitions/renderer.js";


export interface TypeScriptRenderer extends Renderer {
  fileExtension: ".ts";
  name: BuiltInRenderers.TypeScript;
}

export interface TypeScriptRenderContext extends RenderContext<TypeScriptRenderer> {
  indentation: number;
}
