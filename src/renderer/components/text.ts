import { RenderedElements, RenderedText, RenderKinds } from "../../types/renderer.js";

export function createRenderedText<Content extends RenderedElements | string>(text: Content): RenderedText<Content> {
  return {
    kind: RenderKinds.text,
    text
  };
}