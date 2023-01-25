import type { CompleteConfig } from "quickdoks:type-definitions/config.js";
import type { DefaultContext, RenderContext } from "quickdoks:type-definitions/context.d.js";
import type { Renderer } from "quickdoks:type-definitions/renderer.js";


export function createContext<CustomRenderer extends Renderer>(defaultContext: DefaultContext, renderer: CustomRenderer, config: CompleteConfig): RenderContext<CustomRenderer> {
  return {
    config,
    renderer,
    ...defaultContext
  };
}
