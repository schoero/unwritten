import type { MarkupRenderContexts } from "../types-definitions/markup.js";

import type { ID, Name } from "unwritten:interpreter/type-definitions/shared.js";


export interface AnchorLink {
  id: ID;
  name: Name;
}

export interface AnchorTarget {
  ids: ID[];
  name: Name;
}

export type LinkRegistry = Map<Name, ID[][]>;

export function convertTextToAnchorId(text: string): string {
  let link = text.toLowerCase();
  link = link.replace(/&(?:[A-Za-z]+|#\d+|#x[\dA-Fa-f]+);/g, "");
  link = link.replace(/[^\s\w-]/gi, "");
  link = link.replace(/[^\s_-\da-z]/gi, "");
  link = link.replace(/\s/g, "-");
  return link;
}

function createAnchor(name: Name, ids: ID[]) {
  return { ids, name } satisfies AnchorTarget;
}

export function getAnchorLink(ctx: MarkupRenderContexts, name: Name, id: ID): string | undefined {

  const ids = ctx.renderer.linkRegistry.get(name);
  const index = ids?.findIndex(nestedIds => nestedIds.includes(id));

  if(index === undefined || index === -1){
    return;
  }

  const anchorText = convertTextToAnchorId(name);
  const anchorLink = `${anchorText}${index === 0 ? "" : `-${index}`}`;

  return anchorLink;

}

export function hasAnchor(input: any): input is AnchorTarget {
  return typeof input === "object" &&
    "ids" in input &&
    "name" in input;
}

export function isAnchor(input: any): input is AnchorTarget {
  return hasAnchor(input) &&
    Object.keys(input).length === 2;
}

export function registerAnchor(ctx: MarkupRenderContexts, name: Name, ids: ID[]): AnchorTarget {

  if(ctx.renderer.linkRegistry.has(name)){
    const idArray = ctx.renderer.linkRegistry.get(name)!;
    if(!idArray.includes(ids)){
      idArray.push(ids);
    }
  } else {
    ctx.renderer.linkRegistry.set(name, [ids]);
  }

  return createAnchor(name, ids);

}
