import { assert } from "unwritten:utils:general.js";

import type { Renderer } from "unwritten:type-definitions/renderer.d.js";


export async function getRenderer(renderer?: Renderer | string): Promise<Renderer> {

  if(renderer === undefined || renderer === "markdown"){
    // const { default: markdownRenderer } = await import("unwritten:renderer:markup/markdown/index.js");
    // renderer = markdownRenderer;
  } else if(renderer === "html"){
    const { default: htmlRenderer } = await import("unwritten:renderer:markup/html/index.js");
    renderer = htmlRenderer;
  } else if(typeof renderer === "string"){
    const { default: importedRenderer } = await import(renderer);
    renderer = importedRenderer;
  }

  validateRenderer(renderer);

  return renderer;

}


function validateRenderer(renderer: unknown): asserts renderer is Renderer {
  assert(isObject(renderer), "Renderer must be an object that implements the `Renderer` interface");
  assert(typeof renderer.name === "string", "Renderer must have a `name` property of type `string`");
  assert(typeof renderer.fileExtension === "string", "Renderer must have a `fileExtension` property of type `string`");
  assert(typeof renderer.render === "function", "Renderer must have a `render` property of type `function`");
}

function isObject(value: unknown): value is { [key: string]: any; } {
  return typeof value === "object" && value !== null;
}
