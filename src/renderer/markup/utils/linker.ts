import type { MarkupRenderContexts } from "../types-definitions/markup.js";


export type AnchorIdentifier = `${string}-${number}-${number}`;

export type LinkRegistry = {
  [name: string]: {
    [id: number]: string[];
  };
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


export function createAnchor(ctx: MarkupRenderContexts, name: string, id: number): AnchorIdentifier {

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


export function getAnchorIdentifier(ctx: MarkupRenderContexts, name: string, id: number, index: number = 0): AnchorIdentifier {
  return `${convertTextToAnchorId(name)}-${id}-${index}`;
}


export function getAnchorLink(ctx: MarkupRenderContexts, identifier: AnchorIdentifier): string | undefined {

  const registry = getRegistry(ctx);

  const [_, id, index] = identifier.split("-");

  for(const key of Object.keys(registry)){

    if(!(id in registry[key])){
      continue;
    }

    const anchors = Object.values(registry[key][+id]);
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    if(anchors[+index] !== undefined){
      return anchors[+index];
    }

  }

}

export function getAnchorText(ctx: MarkupRenderContexts, identifier: AnchorIdentifier): string | undefined {

  const registry = getRegistry(ctx);

  const [_, id, index] = identifier.split("-");

  for(const key of Object.keys(registry)){

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
