import {
  RenderedList,
  RenderedMultilineContent,
  RenderedTitle,
  RenderObject
} from "../renderer/markup/types/renderer.js";


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
    (renderObject.length > 1 ||
      renderObject.length === 1 && typeof renderObject[0] !== "object" ||
      renderObject.length === 1 && typeof renderObject[0] === "object" && isRenderedList(renderObject[0])
    );
}


export function isRenderedTitle(renderObject: RenderObject): renderObject is RenderedTitle {
  return typeof renderObject === "object" && !Array.isArray(renderObject);
}
