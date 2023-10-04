import { assert } from "unwritten:utils/general.js";

import type { MarkupRenderContexts } from "../types-definitions/markup.js";

import type { SourceFileEntity } from "unwritten:interpreter/type-definitions/entities.js";
import type { ID, Name } from "unwritten:interpreter/type-definitions/shared.js";
import type { FilePath } from "unwritten:type-definitions/file-system.js";


export interface AnchorLink {
  displayName: Name;
  id: ID;
  name: Name;
}

export interface AnchorTarget {
  id: ID;
  name: Name;
}

export type AnchorID = string;

export type ExportRegistry = Set<ID>;

export type SourceFile = {
  anonymousId: ID;
  dst: FilePath;
  id: ID;
  links: Map<AnchorID, ID[]>;
  name: Name;
  src: string;
};

export type LinkRegistry = SourceFile[];

function getAnonymousId(ctx: MarkupRenderContexts): ID {
  return ctx.currentFile.anonymousId--;
}

export function registerAnchor(ctx: MarkupRenderContexts, name: Name, id: ID): AnchorTarget {

  const anchorId = convertTextToAnchorId(name);

  if(!ctx.currentFile.links.has(anchorId)){
    ctx.currentFile.links.set(anchorId, []);
  }

  if(!ctx.currentFile.links.get(anchorId)!.includes(id)){
    ctx.currentFile.links.get(anchorId)!.push(id);
  }

  return { id, name };

}

export function registerAnonymousAnchor(ctx: MarkupRenderContexts, name: Name): AnchorTarget {

  const anchorId = convertTextToAnchorId(name);

  if(!ctx.currentFile.links.has(anchorId)){
    ctx.currentFile.links.set(anchorId, []);
  }

  const id = getAnonymousId(ctx);
  ctx.currentFile.links.get(anchorId)!.push(id);

  return { id, name };

}

export function getAnchorLink(ctx: MarkupRenderContexts, name: Name, id: ID): string | undefined {

  const anchorId = convertTextToAnchorId(name);

  const { relative } = ctx.dependencies.path;

  const sourceFile = ctx.links
    .find(sourceFile => isSymbolDocumentedFromSourceFile(sourceFile, id));

  if(sourceFile === undefined){
    return;
  }

  const index = sourceFile.links.get(anchorId)?.indexOf(id);

  if(index === -1){
    return;
  }

  const relativeDirectory = ctx.currentFile.id !== sourceFile.id
    ? relative(ctx.currentFile.dst, sourceFile.dst)
    : "";

  const anchorLink = `${relativeDirectory}#${anchorId}${index === 0 ? "" : `-${index}`}`;

  return anchorLink;

}


export function getAnchorId(ctx: MarkupRenderContexts, name: Name, id: ID): string | undefined {

  const anchorId = convertTextToAnchorId(name);

  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  const index = ctx.currentFile?.links.get(anchorId)?.indexOf(id) ?? -1;

  if(index === -1){
    return;
  }

  const anchorLink = `${anchorId}${index === 0 ? "" : `-${index}`}`;

  return anchorLink;

}

export function getSourceFileById(ctx: MarkupRenderContexts, id: ID): SourceFile {
  return ctx.links[id];
}

export function convertTextToAnchorId(text: string): AnchorID {
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

function isSymbolDocumentedFromSourceFile(sourceFile: SourceFile, symbolId: ID): boolean {
  return Array.from(sourceFile.links.values()).some(linkIds => linkIds.includes(symbolId));
}

export function createCurrentSourceFile(ctx: MarkupRenderContexts, sourceFileEntity: SourceFileEntity, destination: FilePath): void {

  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  const index = ctx.links.findIndex(sourceFile => sourceFile.id === sourceFileEntity.symbolId);

  const sourceFile = {
    anonymousId: 0,
    dst: destination,
    id: sourceFileEntity.symbolId,
    links: new Map(),
    name: sourceFileEntity.name,
    src: sourceFileEntity.path
  };

  if(index === -1){
    ctx.links = [...ctx.links, sourceFile];
  } else {
    ctx.links[index] = sourceFile;
  }

}

export function setCurrentSourceFile(ctx: MarkupRenderContexts, sourceFileEntity: SourceFileEntity): void {

  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  const index = ctx.links.findIndex(sourceFile => sourceFile.id === sourceFileEntity.symbolId);

  assert(index !== -1, `Source file ${sourceFileEntity.path} is not registered`);

  ctx.currentFile = ctx.links.at(index)!;

}
