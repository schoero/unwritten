import type { CompleteConfig } from "unwritten:type-definitions/config";
import type { DefaultContext, RenderContext } from "unwritten:type-definitions/context";
import type { Renderer } from "unwritten:type-definitions/renderer";


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
