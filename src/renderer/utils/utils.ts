import type { RenderedTitle } from "unwritten:renderer/markup/types/renderer.js";


export function unTitle(renderedTitle: RenderedTitle) {
  const title = Object.keys(renderedTitle)[0];
  const content = renderedTitle[title];
  return { content, title };
}