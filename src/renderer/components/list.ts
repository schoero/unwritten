import { RenderedElements, RenderedOrderedList, RenderedUnorderedList, RenderKinds } from "../../types/renderer.js";


export function createRenderedUnorderedList<Content extends RenderedElements>(content: Content): RenderedUnorderedList<Content> {
  return {
    content,
    kind: RenderKinds.UnorderedList
  };
}

export function createRenderedOrderedList<Content extends RenderedElements>(content: Content): RenderedOrderedList<Content> {
  return {
    content,
    kind: RenderKinds.OrderedList
  };
}