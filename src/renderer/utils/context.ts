import type { CompleteBrowserConfig, CompleteConfig, CompleteNodeConfig } from "unwritten:type-definitions/config";
import type {
  DefaultBrowserContext,
  DefaultContext,
  DefaultNodeContext,
  RenderBrowserContext,
  RenderContext,
  RenderNodeContext
} from "unwritten:type-definitions/context";
import type { Renderer } from "unwritten:type-definitions/renderer";


export function createContext<CustomRenderer extends Renderer>(defaultContext: DefaultNodeContext, renderer: CustomRenderer, config: CompleteNodeConfig): RenderNodeContext<CustomRenderer>;
export function createContext<CustomRenderer extends Renderer>(defaultContext: DefaultBrowserContext, renderer: CustomRenderer, config: CompleteBrowserConfig): RenderBrowserContext<CustomRenderer>;
export function createContext<CustomRenderer extends Renderer>(defaultContext: DefaultContext, renderer: CustomRenderer, config: CompleteConfig): RenderContext<CustomRenderer> {
  const ctx: RenderContext<CustomRenderer> = {
    config,
    renderer,
    ...defaultContext
  };
  return ctx;
}
