import type { MarkupRenderContexts } from "../types-definitions/markup.js";

import type { SourceFileEntity } from "unwritten:interpreter/type-definitions/entities.js";
import type { ID, Name } from "unwritten:interpreter/type-definitions/shared.js";
import type { FilePath } from "unwritten:type-definitions/file-system.js";


export interface AnchorLink {
  id: ID;
  name: Name;
}

export interface AnchorTarget {
  id: ID;
  name: Name;
}

export type ExportRegistry = Set<ID>;

export type SourceFile = {
  dst: FilePath;
  id: ID;
  links: {
    [linkName: Name]: ID[];
  };
  name: Name;
  src: string;
};

export type LinkRegistry = SourceFile[];


export function isSymbolExported(ctx: MarkupRenderContexts, symbolId: ID): boolean {
  return Object.values(ctx.links).some(sourceFile => isSymbolExportedFromSourceFile(sourceFile, symbolId));
}

export function registerAnchor(ctx: MarkupRenderContexts, name: Name, id: ID): AnchorTarget {

  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  ctx.currentFile.links[name] ??= [];

  if(!ctx.currentFile.links[name].includes(id)){
    ctx.currentFile.links[name].push(id);
  }

  return { id, name };

}

export function getAnchorLink(ctx: MarkupRenderContexts, name: Name, id: ID): string | undefined {

  const { relative } = ctx.dependencies.path;

  const sourceFile = ctx.links
    .find(sourceFile => isSymbolExportedFromSourceFile(sourceFile, id));

  if(sourceFile === undefined){
    return;
  }

  const index = sourceFile.links[name].indexOf(id);

  if(index === -1){
    return;
  }

  const relativeDirectory = ctx.currentFile.id !== sourceFile.id
    ? relative(ctx.currentFile.dst, sourceFile.dst)
    : "";

  const anchorText = convertTextToAnchorId(name);
  const anchorLink = `${relativeDirectory}#${anchorText}${index === 0 ? "" : `-${index}`}`;

  return anchorLink;

}


export function getAnchorId(ctx: MarkupRenderContexts, name: Name, id: ID): string | undefined {

  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  const index = ctx.currentFile?.links[name].indexOf(id) ?? -1;

  if(index === -1){
    return;
  }

  const anchorText = convertTextToAnchorId(name);
  const anchorLink = `${anchorText}${index === 0 ? "" : `-${index}`}`;

  return anchorLink;

}

export function getSourceFileById(ctx: MarkupRenderContexts, id: ID): SourceFile {
  return ctx.links[id];
}

export function convertTextToAnchorId(text: string): string {
  let link = text.toLowerCase();
  link = link.replace(/&(?:[A-Za-z]+|#\d+|#x[\dA-Fa-f]+);/g, "");
  link = link.replace(/[^\s\w-]/gi, "");
  link = link.replace(/[^\s_-\da-z]/gi, "");
  link = link.replace(/\s/g, "-");
  return link;
}

export function hasAnchor(input: any): input is AnchorTarget {
  return typeof input === "object" &&
    "id" in input &&
    "name" in input;
}

export function isAnchor(input: any): input is AnchorTarget {
  return hasAnchor(input) &&
    Object.keys(input).length === 2;
}

function isSymbolExportedFromSourceFile(sourceFile: SourceFile, symbolId: ID): boolean {
  return Object.values(sourceFile.links).some(linkIds => linkIds.includes(symbolId));
}

export function setCurrentSourceFile(ctx: MarkupRenderContexts, sourceFileEntity: SourceFileEntity, destination: FilePath): void {

  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  const index = ctx.links.findIndex(sourceFile => sourceFile.id === sourceFileEntity.symbolId);

  const sourceFile = {
    dst: destination,
    id: sourceFileEntity.symbolId,
    links: {},
    name: sourceFileEntity.name,
    src: sourceFileEntity.path
  };

  if(index === -1){
    ctx.links = [...ctx.links, sourceFile];
  } else {
    ctx.links[index] = sourceFile;
  }

  ctx.currentFile = ctx.links.at(-1)!;

}
