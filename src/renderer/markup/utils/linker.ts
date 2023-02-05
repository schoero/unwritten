import type { MarkupRenderContext } from "../types/renderer.js";


export type AnchorIdentifier = `${string}-${number}-${number}`;

export type LinkRegistry = {
  [name: string]: {
    [id: number]: string[];
  };
};

function attachRegistry(ctx: MarkupRenderContext) {
  if(ctx.renderer._linkRegistry !== undefined){
    return;
  }
  ctx.renderer._linkRegistry = {};
}

function getRegistry(ctx: MarkupRenderContext) {
  attachRegistry(ctx);
  return ctx.renderer._linkRegistry!;
}


export function createAnchor(ctx: MarkupRenderContext, name: string, id: number): AnchorIdentifier {

  const registry = getRegistry(ctx);

  if(!(name in registry)){
    registry[name] = {};
  }

  if(!(id in registry[name])){
    registry[name][id] = [];
  }

  const absoluteIndex = Object.values(registry[name]!).reduce((acc, idEntries) => acc + idEntries.length, 0);
  const relativeIndex = registry[name]![id].length;
  const anchorText = convertTextToAnchorId(name);
  const anchorIdentifier: AnchorIdentifier = `${anchorText}-${id}-${relativeIndex}`;
  const anchorLink = `${anchorText}${absoluteIndex === 0 ? "" : `-${absoluteIndex}`}`;

  registry[name]![id]!.push(anchorLink);

  return anchorIdentifier;

}


export function getAnchorLink(ctx: MarkupRenderContext, identifier: AnchorIdentifier): string | undefined {

  const registry = getRegistry(ctx);

  const [name, id, index] = identifier.split("-");

  return registry[name]![+id]![+index];

}


export function getAnchorText(ctx: MarkupRenderContext, identifier: AnchorIdentifier): string | undefined {

  const registry = getRegistry(ctx);

  const [_, id, index] = identifier.split("-");

  for(const key of Object.keys(registry)){
    if(key !== id){
      continue;
    }
    if(!(id in registry[key])){
      continue;
    }

    const anchors = Object.values(registry[key][+id]);
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    if(anchors[+index] !== undefined){
      return key;
    }

  }

}

export function convertTextToAnchorId(text: string): string {
  let link = text.toLowerCase();
  link = link.replace(/[^\d\sa-z-]/gi, "");
  link = link.replace(/\s/g, "-");
  return link;
}
