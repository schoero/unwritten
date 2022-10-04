import { RenderedElements, RenderedTitle, RenderKinds } from "../../types/renderer.js";

export function createRenderedTitle<
  Title extends RenderedElements,
  Content extends RenderedElements | undefined = undefined
>(title: Title, content?: Content): RenderedTitle<Title, Content> {
  return {
    content,
    kind: RenderKinds.Title,
    title
  };
}