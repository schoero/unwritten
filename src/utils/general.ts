
import minimatch from "minimatch";

import { Renderer } from "../types/renderer.js";


export function isPathExcluded(path: string, excludePaths: string[]): boolean {
  return excludePaths.some(excludePath => minimatch(path, excludePath));
}

export function validateRenderer(renderer: any): Renderer {

  if(typeof renderer !== "object"){
    throw new Error("Renderer must be an object that implements the `Renderer` interface");
  }
  if(typeof renderer.name !== "string"){
    throw new Error("Renderer must have a `name` property");
  }
  if(typeof renderer.fileExtension !== "string"){
    throw new Error("Renderer must have a `fileExtension` property");
  }
  if(typeof renderer.render !== "function"){
    throw new Error("Renderer must have a `render` function");
  }
  if(typeof renderer.render([]) !== "string"){
    throw new Error("Renderer `render` function must return a string");
  }

  return renderer;

}