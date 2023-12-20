import { BuiltInRenderers } from "unwritten:renderer/enums/renderer";
import { isHTMLRenderContext, renderNode as renderNodeAsHTML } from "unwritten:renderer:markup/html/index";
import { renderNode as renderNodeAsMarkdown } from "unwritten:renderer:markup/markdown/index";
import { assert } from "unwritten:utils:general";

import type { MarkupRenderContext } from "unwritten:renderer:markup/types-definitions/markup";
import type { ASTNode } from "unwritten:renderer:markup/types-definitions/nodes";
import type { Renderer } from "unwritten:type-definitions/renderer";


export async function getRenderer(renderer?: Renderer | string): Promise<Renderer> {

  if(renderer === undefined || renderer === BuiltInRenderers.Markdown || renderer === "md"){
    const { default: markdownRenderer } = await import("unwritten:renderer:markup/markdown/index.js");
    renderer = markdownRenderer;
  } else if(renderer === BuiltInRenderers.HTML){
    const { default: htmlRenderer } = await import("unwritten:renderer:markup/html/index.js");
    renderer = htmlRenderer;
  } else if(renderer === BuiltInRenderers.JSON){
    const { default: jsonRenderer } = await import("unwritten:renderer:json:index.js");
    renderer = jsonRenderer;
  } else if(typeof renderer === "string"){
    const { default: importedRenderer } = await import(renderer);
    renderer = importedRenderer;
  }

  validateRenderer(renderer);

  return renderer;

}

export function renderNode(ctx: MarkupRenderContext, node: ASTNode): string {
  if(isHTMLRenderContext(ctx)){
    return renderNodeAsHTML(ctx, node);
  } else {
    return renderNodeAsMarkdown(ctx, node);
  }
}

/**
 * Validates that the given object is a valid renderer object.
 *
 * @param renderer The renderer object to validate.
 * @throws {Error} If the given object is not a valid renderer object.
 */
function validateRenderer(renderer: unknown): asserts renderer is Renderer {
  assert(isObject(renderer), "Renderer must be an object that implements the `Renderer` interface");
  assert(typeof renderer.name === "string", "Renderer must have a `name` property of type `string`");
  assert(typeof renderer.fileExtension === "string", "Renderer must have a `fileExtension` property of type `string`");
  assert(typeof renderer.render === "function", "Renderer must have a `render` property of type `function`");
}

function isObject(value: unknown): value is { [key: string]: any; } {
  return typeof value === "object" && value !== null;
}
