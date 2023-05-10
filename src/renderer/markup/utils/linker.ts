import type { MarkupRenderContexts } from "../types-definitions/markup.js";

import type { ID, Name } from "unwritten:interpreter/type-definitions/shared.js";


export interface Anchor {
  id?: ID;
  name?: Name;
}

export type LinkRegistry = Map<Name, ID[]>;

function attachRegistry(ctx: MarkupRenderContexts): asserts ctx is MarkupRenderContexts & { renderer: { linkRegistry: LinkRegistry; }; } {
  ctx.renderer.linkRegistry ??= new Map();
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

  if(anchor.name === undefined || anchor.id === undefined){
    return;
  }

  const registry = getRegistry(ctx);

  const ids = registry.get(anchor.name);
  if(!ids?.includes(anchor.id)){
    return;
  }

  const index = ids.indexOf(anchor.id);
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

export function registerAnchor(ctx: MarkupRenderContexts, name: Name, id: ID): Anchor {

  const registry = getRegistry(ctx);

  if(registry.has(name)){
    const idArray = registry.get(name)!;
    if(!idArray.includes(id)){
      idArray.push(id);
    }
  } else {
    registry.set(name, [id]);
  }

  return createAnchor(name, id);

}
