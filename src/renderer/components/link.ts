import { RenderedElements, RenderedLink, RenderKinds } from "../../types/renderer.js";


export function createRenderedLink<Content extends RenderedElements>(content: Content, url: string): RenderedLink<Content> {
  return {
    content,
    kind: RenderKinds.link,
    url
  };
}