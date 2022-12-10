import { CompleteConfig } from "quickdoks:types:config.js";
import { DefaultContext, RenderContext } from "quickdoks:types:context.js";
import { Renderer } from "quickdoks:types:renderer.js";


export function createContext(defaultContext: DefaultContext, renderer: Renderer, config: CompleteConfig): RenderContext {
  return {
    config,
    renderer,
    ...defaultContext
  };
}
