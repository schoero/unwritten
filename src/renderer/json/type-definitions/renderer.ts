import type { BuiltInRenderers } from "unwritten:renderer/enums/renderer";
import type { RenderContext } from "unwritten:type-definitions/context";
import type { Renderer } from "unwritten:type-definitions/renderer";


export interface JSONRenderer extends Renderer {
  fileExtension: ".json";
  name: BuiltInRenderers.JSON;
}

export interface JSONRenderContext extends RenderContext<JSONRenderer> {
}
