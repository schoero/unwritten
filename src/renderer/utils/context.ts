import type { CompleteConfig } from "unwritten:type-definitions/config.js";
import type { DefaultContext, RenderContext } from "unwritten:type-definitions/context.js";
import type { Renderer } from "unwritten:type-definitions/renderer.js";


export function createContext<CustomRenderer extends Renderer>(
  defaultContext: DefaultContext,
  renderer: CustomRenderer,
  config: CompleteConfig
): RenderContext<CustomRenderer> {
  const ctx: RenderContext<CustomRenderer> = {
    config,
    renderer,
    ...defaultContext
  };
  return ctx;
}
