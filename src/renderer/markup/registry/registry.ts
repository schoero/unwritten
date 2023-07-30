import { getOutputFilePath } from "unwritten:renderer/markup/utils/file.js";
import { isClassEntity, isInterfaceEntity, isModuleEntity, isNamespaceEntity } from "unwritten:typeguards/entities.js";
import { assert } from "unwritten:utils/general.js";

import type { MarkupRenderContexts } from "../types-definitions/markup.js";

import type { Entity, SourceFileEntity } from "unwritten:interpreter/type-definitions/entities.js";
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

export type LinkRegistry = {
  [linkName: Name]: ID[];
};

export type SourceFile = {
  dst: FilePath;
  exports: ExportRegistry;
  links: LinkRegistry;
  name: Name;
  src: string;
};

export type SourceRegistry = {
  [sourceFileId: ID]: SourceFile;
};


export function initializeRegistry(ctx: MarkupRenderContexts, sourceFileEntities: SourceFileEntity[]): void {

  ctx.sourceRegistry = {};

  sourceFileEntities.forEach(sourceFileEntity => {
    ctx.sourceRegistry![sourceFileEntity.symbolId] = {
      dst: getOutputFilePath(ctx, sourceFileEntity.path),
      exports: new Set(),
      links: {},
      name: sourceFileEntity.name,
      src: sourceFileEntity.path
    };

    addExports(ctx.sourceRegistry![sourceFileEntity.symbolId].exports, sourceFileEntity.exports);
  });

}

function addExports(set: Set<ID>, entities: Entity[]): void {

  for(const entity of entities){

    if("symbolId" in entity && entity.symbolId !== undefined){
      set.add(entity.symbolId);
    }

    if("typeParameters" in entity && entity.typeParameters !== undefined){
      addExports(set, entity.typeParameters);
    }

    if(isNamespaceEntity(entity) || isModuleEntity(entity)){
      addExports(set, entity.exports);
    }

    if(isClassEntity(entity)){
      addExports(set, entity.methods);
      addExports(set, entity.properties);
      addExports(set, entity.setters);
      addExports(set, entity.getters);
      entity.ctor && addExports(set, [entity.ctor]);
    }

    if(isInterfaceEntity(entity)){
      addExports(set, entity.properties);
      addExports(set, entity.callSignatures);
      addExports(set, entity.constructSignatures);
      addExports(set, entity.methodSignatures);
      addExports(set, entity.getterSignatures);
      addExports(set, entity.setterSignatures);
    }

  }

}

export const isSymbolExported = (ctx: MarkupRenderContexts, symbolId: ID): boolean => withInitializedSourceRegistry(ctx, ctx => {
  return Object.values(ctx.sourceRegistry).some(sourceFile => sourceFile.exports.has(symbolId));
});

export const registerAnchor = (ctx: MarkupRenderContexts, name: Name, id: ID): AnchorTarget => withInitializedSourceRegistry(ctx, ctx => {

  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  ctx.sourceRegistry[ctx.currentFile].links[name] ??= [];

  if(!ctx.sourceRegistry[ctx.currentFile].links[name].includes(id)){
    ctx.sourceRegistry[ctx.currentFile].links[name].push(id);
  }

  return { id, name };

});

export const getAnchorLink = (ctx: MarkupRenderContexts, name: Name, id: ID): string | undefined => withInitializedSourceRegistry(ctx, ctx => {

  const { relative } = ctx.dependencies.path;

  const sourceFile = Object.entries(ctx.sourceRegistry)
    .find(([sourceFileId, sourceFile]) => sourceFile.exports.has(id));

  if(sourceFile === undefined){
    return;
  }

  const [sourceFileId, sourceFileContent] = sourceFile;

  const index = ctx.sourceRegistry[+sourceFileId].links[name].indexOf(id);

  if(index === -1){
    return;
  }

  const relativeDirectory = ctx.currentFile !== +sourceFileId
    ? relative(ctx.sourceRegistry[ctx.currentFile].dst, sourceFileContent.dst)
    : "";

  const anchorText = convertTextToAnchorId(name);
  const anchorLink = `${relativeDirectory}#${anchorText}${index === 0 ? "" : `-${index}`}`;

  return anchorLink;

});


export const getAnchorId = (ctx: MarkupRenderContexts, name: Name, id: ID): string | undefined => withInitializedSourceRegistry(ctx, ctx => {

  const index = ctx.sourceRegistry[ctx.currentFile].links[name].indexOf(id);

  if(index === -1){
    return;
  }

  const anchorText = convertTextToAnchorId(name);
  const anchorLink = `${anchorText}${index === 0 ? "" : `-${index}`}`;

  return anchorLink;

});

export const getSourceFileById = (ctx: MarkupRenderContexts, id: ID): SourceFile => withInitializedSourceRegistry(ctx, ctx => {
  return ctx.sourceRegistry[id];
});

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

function withInitializedSourceRegistry<T>(ctx: MarkupRenderContexts, callback: (ctx: MarkupRenderContexts & { currentFile: ID; sourceRegistry: SourceRegistry; }) => T): T {
  sourceRegistryIsInitialized(ctx);
  return callback(ctx);
}

function sourceRegistryIsInitialized(ctx: MarkupRenderContexts): asserts ctx is MarkupRenderContexts & { currentFile: ID; sourceRegistry: SourceRegistry; } {
  assert(ctx.sourceRegistry !== undefined, "Source registry is not initialized");
  assert(ctx.currentFile !== undefined, "Current file is not set");
}
