import { assert } from "quickdoks:utils:general.js";

import { Renderer } from "quickdoks:type-definitions/renderer.d.js";


export async function getRenderer(renderer?: Renderer | string) {

  if(renderer === undefined || renderer === "markdown"){
    renderer = (await import("quickdoks:renderer:markup/markdown/index.js")).default;
  } else if(renderer === "html"){
    renderer = (await import("quickdoks:renderer:markup/html/index.js")).default;
  } else if(typeof renderer === "string"){
    renderer = (await import(renderer)).default;
  }

  _validateRenderer(renderer);

  return renderer;
}


function _validateRenderer(renderer: unknown): asserts renderer is Renderer {
  assert(_isObject(renderer), "Renderer must be an object that implements the `Renderer` interface");
  assert(typeof renderer.name === "string", "Renderer must have a `name` property of type `string`");
  assert(typeof renderer.fileExtension === "string", "Renderer must have a `fileExtension` property of type `string`");
  assert(typeof renderer.render === "function", "Renderer must have a `render` property of type `function`");
}

function _isObject(value: unknown): value is { [key: string]: any; } {
  return typeof value === "object" && value !== null;
}
