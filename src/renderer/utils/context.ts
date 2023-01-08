import type { CompleteConfig } from "quickdoks:compiler:type-definitions/config.d..js";
import type { Renderer } from "quickdoks:compiler:type-definitions/renderer.d.js";
import type { DefaultContext, RenderContext } from "quickdoks:type-definitions/context.d.js";


export function createContext(defaultContext: DefaultContext, renderer: Renderer, config: CompleteConfig): RenderContext {
  return {
    config,
    renderer,
    ...defaultContext
  };
}
