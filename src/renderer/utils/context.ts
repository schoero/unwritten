import { CompleteConfig } from "quickdoks:type-definitions/config.d..js";

import { DefaultContext, RenderContext } from "quickdoks:type-definitions/context.d.js";
import { Renderer } from "quickdoks:type-definitions/renderer.d.js";


export function createContext(defaultContext: DefaultContext, renderer: Renderer, config: CompleteConfig): RenderContext {
  return {
    config,
    renderer,
    ...defaultContext
  };
}
