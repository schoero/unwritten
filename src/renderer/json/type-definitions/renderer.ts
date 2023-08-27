import type { BuiltInRenderers } from "unwritten:renderer/enums/renderer.js";
import type { RenderContext } from "unwritten:type-definitions/context.js";
import type { Renderer } from "unwritten:type-definitions/renderer.js";


export interface JSONRenderer extends Renderer {
  fileExtension: ".json";
  name: BuiltInRenderers.JSON;
}

export interface JSONRenderContext extends RenderContext<JSONRenderer> {
}
