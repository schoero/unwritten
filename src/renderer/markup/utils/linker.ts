import type { MarkupRenderContexts } from "../types-definitions/markup.js";

import type { ID, Name } from "unwritten:interpreter/type-definitions/shared.js";


export interface Anchor {
  id?: ID;
  name?: Name;
}

export type LinkRegistry = {
  [name: Name]: ID[];
};

function attachRegistry(ctx: MarkupRenderContexts): asserts ctx is MarkupRenderContexts & { renderer: { linkRegistry: LinkRegistry; }; } {
  ctx.renderer.linkRegistry ??= {};
}

function getRegistry(ctx: MarkupRenderContexts) {
  attachRegistry(ctx);
  return ctx.renderer.linkRegistry;
}

export function convertTextToAnchorId(text: string): string {
  let link = text.toLowerCase();
  link = link.replace(/[^\d\sa-z-]/gi, "");
  link = link.replace(/\s/g, "-");
  return link;
}

export function createAnchor(name: Name, id: ID) {
  return { id, name } satisfies Anchor;
}

export function getAnchorLink(ctx: MarkupRenderContexts, anchor: Anchor): string | undefined {

  if(!anchor.name || !anchor.id){
    return;
  }

  const registry = getRegistry(ctx);

  if(!(anchor.name in registry)){
    return;
  }

  const index = registry[anchor.name].indexOf(anchor.id);

  if(index === -1){
    return;
  }

  const anchorText = convertTextToAnchorId(anchor.name);
  const anchorLink = `${anchorText}${index === 0 ? "" : `-${index}`}`;

  return anchorLink;

}

export function hasAnchor(input: any): input is Anchor {
  return typeof input === "object" &&
    "id" in input &&
    "name" in input;
}

export function isAnchor(input: any): input is Anchor {
  return hasAnchor(input) &&
    Object.keys(input).length === 2;
}


/**
 * Registers an anchor identifier for a symbol
 * @param ctx RenderContext
 * @param anchor Anchor
 * @modifies ctx.renderer.linkRegistry
 */
export function registerAnchorIdentifier(ctx: MarkupRenderContexts, anchor: Anchor): void {

  if(!anchor.name || !anchor.id){
    return;
  }

  const { name, id } = anchor;

  const registry = getRegistry(ctx);

  if(!(name in registry)){
    registry[name] = [id];
    return;
  }

  if(registry[name].includes(id)){
    return;
  }

  registry[name].push(id);

}
