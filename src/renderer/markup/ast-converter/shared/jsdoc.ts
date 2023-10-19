import { renderNode } from "unwritten:renderer/index.js";
import {
  convertJSDocGenericTag,
  convertJSDocLink,
  convertJSDocReference,
  convertJSDocSeeTag,
  convertJSDocThrowsTag,
  convertJSDocType
} from "unwritten:renderer/markup/ast-converter/jsdoc/index.js";
import { convertJSDocText } from "unwritten:renderer/markup/ast-converter/jsdoc/text.js";
import { RenderableJSDocKeyTags, RenderableJSDocValueTags } from "unwritten:renderer:markup/enums/jsdoc.js";
import { encapsulate, spaceBetween } from "unwritten:renderer:markup/utils/renderer.js";
import {
  isJSDocGenericTag,
  isJSDocLink,
  isJSDocReference,
  isJSDocSeeTag,
  isJSDocText,
  isJSDocThrowsTag,
  isJSDocType
} from "unwritten:typeguards/jsdoc.js";

import type { JSDocProperties, JSDocTags } from "unwritten:interpreter/type-definitions/jsdoc";
import type { MarkupRenderContexts } from "unwritten:renderer:markup/types-definitions/markup.js";
import type { ASTNode } from "unwritten:renderer:markup/types-definitions/nodes.js";


export function convertJSDocNodes(ctx: MarkupRenderContexts, jsdocTags: JSDocTags): ASTNode[] {

  return jsdocTags.map(jsdocTag => {

    if(isJSDocText(jsdocTag)){
      return convertJSDocText(ctx, jsdocTag);
    } else if(isJSDocReference(jsdocTag)){
      return convertJSDocReference(ctx, jsdocTag);
    } else if(isJSDocGenericTag(jsdocTag)){
      return convertJSDocGenericTag(ctx, jsdocTag);
    } else if(isJSDocSeeTag(jsdocTag)){
      return convertJSDocSeeTag(ctx, jsdocTag);
    } else if(isJSDocThrowsTag(jsdocTag)){
      return convertJSDocThrowsTag(ctx, jsdocTag);
    } else if(isJSDocType(jsdocTag)){
      return convertJSDocType(ctx, jsdocTag);
    } else if(isJSDocLink(jsdocTag)){
      return convertJSDocLink(ctx, jsdocTag);
    }

  });

}

export function convertJSDocTags(ctx: MarkupRenderContexts, entityWithTags: JSDocProperties): ASTNode[] {

  const jsdocKeyTagNames = Object.values(RenderableJSDocKeyTags);
  const jsdocValueTagNames = Object.values(RenderableJSDocValueTags);

  const convertedKeyTags = Object.keys(entityWithTags)
    .filter(key => jsdocKeyTagNames.includes(key as RenderableJSDocKeyTags))
    .map(key => encapsulate(key, ctx.config.renderConfig[ctx.renderer.name].tagEncapsulation));

  const convertedValueTags = Object.entries(entityWithTags)
    .filter(([key]) => jsdocValueTagNames.includes(key as RenderableJSDocValueTags))
    .map(([_, value]) => encapsulate(renderNode(ctx, convertJSDocNodes(ctx, value)), ctx.config.renderConfig[ctx.renderer.name].tagEncapsulation));

  return spaceBetween(...convertedKeyTags, ...convertedValueTags);

}

export function hasRenderableJSDocKeyTags(jsdocTags: JSDocProperties): boolean {
  return Object.keys(jsdocTags)
    .some(isRenderableJSDocKeyTag);
}


export function isRenderableJSDocKeyTag(jsdocTagName: string): boolean {
  const jsdocTagNames = Object.values(RenderableJSDocKeyTags);
  return jsdocTagNames.includes(jsdocTagName as RenderableJSDocKeyTags);
}


export function isRenderableJSDocValueTag(jsdocTagName: string): boolean {
  const jsdocTagNames = Object.values(RenderableJSDocKeyTags);
  return jsdocTagNames.includes(jsdocTagName as RenderableJSDocKeyTags);
}
