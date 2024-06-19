import { assert } from "unwritten:utils/general";

import type { MarkupRenderContext } from "../types-definitions/markup";

import type { SourceFileEntity } from "unwritten:interpreter:type-definitions/entities";
import type { ID, Name } from "unwritten:interpreter:type-definitions/jsdoc";
import type { FilePath } from "unwritten:type-definitions/platform";


export const MAX_ANONYMOUS_ID = -10;
export interface AnchorLink {
  displayName: Name;
  id: ID;
  name: Name;
}

export interface AnchorTarget {
  ids: ID[];
  name: Name;
}

export type AnchorID = string;

export type ExportRegistry = Set<ID>;

export type SourceFile = {
  _anonymousId: ID;
  dst: FilePath;
  id: ID;
  links: Map<AnchorID, ID[][]>;
  name: Name;
  src: string;
};

export type LinkRegistry = SourceFile[];

function getAnonymousId(ctx: MarkupRenderContext): ID {
  return ctx.currentFile._anonymousId--;
}

export function registerAnchor(ctx: MarkupRenderContext, name: Name, id: ID | ID[]): AnchorTarget {

  const anchorId = convertTextToAnchorId(name);
  const ids = Array.isArray(id) ? id : [id];

  if(!ctx.currentFile.links.has(anchorId)){
    ctx.currentFile.links.set(anchorId, []);
  }

  if(
    !ctx.currentFile.links.get(anchorId)!
      .some(storedIds => storedIds.every(storedId => ids.includes(storedId)))
  ){
    ctx.currentFile.links.get(anchorId)!.push(ids);
  }

  return { ids, name };

}

export function unregisterAnchor(ctx: MarkupRenderContext, id: ID | ID[]): void {

  const ids = Array.isArray(id) ? id : [id];
  const anchor = findRegisteredAnchorData(ctx, id);

  if(anchor === undefined){
    return;
  }

  const newIds = anchor.sourceFile.links.get(anchor.anchorId)![anchor.index]
    .filter(storedId => !ids.includes(storedId));

  if(newIds.length === 0){
    void anchor.sourceFile.links.get(anchor.anchorId)!.splice(anchor.index, 1);
  } else {
    anchor.sourceFile.links.get(anchor.anchorId)![anchor.index] = newIds;
  }

  if(ctx.currentFile.links.get(anchor.anchorId)!.length === 0){
    void ctx.currentFile.links.delete(anchor.anchorId);
  }

}

export function registerAnonymousAnchor(ctx: MarkupRenderContext, name: Name): AnchorTarget {

  const anchorId = convertTextToAnchorId(name);

  if(!ctx.currentFile.links.has(anchorId)){
    ctx.currentFile.links.set(anchorId, []);
  }

  const id = getAnonymousId(ctx);
  const ids = [id];

  ctx.currentFile.links.get(anchorId)!.push(ids);

  return { ids, name };

}

export function getAnchorLink(ctx: MarkupRenderContext, id: ID | ID[]): string | undefined {

  const { relative } = ctx.dependencies.path;

  const ids = Array.isArray(id) ? id : [id];

  const anchor = findRegisteredAnchorData(ctx, ids);

  if(anchor === undefined){
    return;
  }

  const relativeDirectory = ctx.currentFile.id !== anchor.sourceFile.id
    ? relative(ctx.currentFile.dst, anchor.sourceFile.dst)
    : "";

  return `${relativeDirectory}#${anchor.anchorId}${anchor.index === 0 ? "" : `-${anchor.index}`}`;

}

export function getAnchorId(ctx: MarkupRenderContext, id: ID | ID[]): string | undefined {

  const ids = Array.isArray(id) ? id : [id];

  const anchor = findRegisteredAnchorData(ctx, ids);

  if(anchor === undefined){
    return;
  }

  return `${anchor.anchorId}${anchor.index === 0 ? "" : `-${anchor.index}`}`;

}

export function getSourceFileById(ctx: MarkupRenderContext, id: ID): SourceFile {
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
    "ids" in input &&
    "name" in input;
}

export function isAnchor(input: any): input is AnchorTarget {
  return hasAnchor(input) &&
    Object.keys(input).length === 2;
}

export function createCurrentSourceFile(ctx: MarkupRenderContext, sourceFileEntity: SourceFileEntity, destination: FilePath): void {

  // eslint-disable-next-line eslint-plugin-typescript/no-unnecessary-condition
  const index = ctx.links.findIndex(sourceFile => sourceFile.id === sourceFileEntity.symbolId);

  const sourceFile: SourceFile = {
    _anonymousId: MAX_ANONYMOUS_ID,
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

export function setCurrentSourceFile(ctx: MarkupRenderContext, sourceFileEntity: SourceFileEntity): void {

  // eslint-disable-next-line eslint-plugin-typescript/no-unnecessary-condition
  const index = ctx.links.findIndex(sourceFile => sourceFile.id === sourceFileEntity.symbolId);

  assert(index !== -1, `Source file ${sourceFileEntity.path} is not registered`);

  ctx.currentFile = ctx.links.at(index)!;

}

function findRegisteredAnchorData(ctx: MarkupRenderContext, id: ID | ID[]): { anchorId: AnchorID; index: number; sourceFile: SourceFile; } | undefined {

  const ids = Array.isArray(id) ? id : [id];

  const fromCurrentSourceFile = ids.some(id => id <= -10);

  for(const sourceFile of ctx.links){

    if(fromCurrentSourceFile && sourceFile.id !== ctx.currentFile.id){
      continue;
    }

    for(const [anchorId, linkIds] of sourceFile.links.entries()){
      const index = linkIds.findIndex(storedIds => storedIds.some(storedId => ids.includes(storedId)));
      if(index !== -1){
        return { anchorId, index, sourceFile };
      }
    }

  }

}
