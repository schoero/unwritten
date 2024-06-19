import type { BuiltInRenderers } from "unwritten:renderer/enums/renderer";
import type { RenderBrowserContext, RenderNodeContext } from "unwritten:type-definitions/context";
import type { Renderer } from "unwritten:type-definitions/renderer";


export interface JSONRenderer extends Renderer {
  fileExtension: ".json";
  name: BuiltInRenderers.JSON;
}

export interface JSONRenderNodeContext extends RenderNodeContext<JSONRenderer> {}
export interface JSONRenderBrowserContext extends RenderBrowserContext<JSONRenderer> {}
export type JSONRenderContext = JSONRenderBrowserContext | JSONRenderNodeContext;
