import { CompleteConfig } from "quickdoks:types:config.js";
import { RenderContext } from "quickdoks:types:context.js";
import { Renderer } from "quickdoks:types:renderer.js";


export function createContext(renderer: Renderer, config: CompleteConfig): RenderContext {
  return {
    config,
    renderer
  };
}
