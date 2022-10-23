import { CompleteConfig } from "../../types/config.js";
import { RenderContext } from "../../types/context.js";
import { Renderer } from "../../types/renderer.js";


export function createContext(renderer: Renderer, config: CompleteConfig): RenderContext {
  return {
    config,
    renderer
  };
}