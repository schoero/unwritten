import type { RenderedList, RenderedTitle } from "unwritten:renderer:markup/types/renderer.js";


export function convertTitlesToList(renderedTitle: RenderedTitle): RenderedList {
  return Object.entries(renderedTitle).reduce<RenderedList>((acc, [title, content]) => {
    acc[0].push(title, content);
    return acc;
  }, [[]]);
}
