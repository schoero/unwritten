import { Complete, Config } from "../../types/config.js";
import { RenderContext } from "../../types/context.js";
import { Renderer } from "../../types/renderer.js";


export function createContext(renderer: Renderer, config: Complete<Config>): RenderContext {
  return {
    config,
    renderer
  };
}