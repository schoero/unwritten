import type {
  RenderedList,
  RenderedMultilineContent,
  RenderedParagraph,
  RenderedTitle,
  RenderObject
} from "unwritten:renderer/markup/types-definitions/renderer.js";


export function isRenderedList(renderObject: RenderObject): renderObject is RenderedList {
  return typeof renderObject === "object" &&
    Array.isArray(renderObject) &&
    renderObject.length === 1 &&
    typeof renderObject[0] === "object" &&
    Array.isArray(renderObject[0]);
}


export function isRenderedMultilineContent(renderObject: RenderObject): renderObject is RenderedMultilineContent {
  return typeof renderObject === "object" &&
    Array.isArray(renderObject) &&
    !isRenderedList(renderObject) &&
    (renderObject.length > 1 ||
      renderObject.length === 1 && typeof renderObject[0] === "object" && isRenderedList(renderObject[0])
    );
}


export function isRenderedParagraph(renderObject: RenderObject): renderObject is RenderedParagraph {
  return typeof renderObject === "object" &&
    Array.isArray(renderObject) &&
    renderObject.length === 1 &&
    typeof renderObject[0] === "string";
}


export function isRenderedTitle(renderObject: RenderObject): renderObject is RenderedTitle {
  return typeof renderObject === "object" && !Array.isArray(renderObject);
}
