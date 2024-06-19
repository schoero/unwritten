import { createGenericJSDocTag } from "unwritten:interpreter/ast/jsdoc/generic";
import { createJSDocLink } from "unwritten:interpreter/ast/jsdoc/link";
import { createJSDocSeeTag } from "unwritten:interpreter/ast/jsdoc/see";
import { createJSDocText } from "unwritten:interpreter/ast/jsdoc/text";
import { createJSDocThrowsTag } from "unwritten:interpreter/ast/jsdoc/throws";
import { JSDocKind } from "unwritten:interpreter/enums/jsdoc";
import {
  isJSDoc,
  isJSDocLink,
  isJSDocSeeTag,
  isJSDocText,
  isJSDocThrowsTag
} from "unwritten:interpreter/typeguards/jsdoc";

import type { Declaration, JSDoc, JSDocComment, JSDocTag as TSJSDocTag, NodeArray } from "typescript";

import type { JSDocProperties, JSDocTag, JSDocTags } from "unwritten:interpreter:type-definitions/jsdoc";
import type { InterpreterContext } from "unwritten:type-definitions/context";


export function getJSDocProperties(ctx: InterpreterContext, declaration: Declaration): JSDocProperties {
  const { ts } = ctx.dependencies;

  const jsdoc = ts.getJSDocCommentsAndTags(declaration);
  const jsdocTags = interpretJSDocOrJSDocTags(ctx, jsdoc);

  return extractJSDocProperties(ctx, jsdocTags);
}

function extractJSDocProperties(ctx: InterpreterContext, jsdocTags: JSDocTags): JSDocProperties {

  let currentObject: JSDocTags = <JSDocTags>[];

  const properties: JSDocProperties = {
    description: currentObject
  };

  for(const jsdocTag of jsdocTags){

    if(
      jsdocTag.kind === JSDocKind.See ||
      jsdocTag.kind === JSDocKind.Throws
    ){
      properties[jsdocTag.kind] ??= [];
      currentObject = properties[jsdocTag.kind]!;
    } else if(jsdocTag.kind === JSDocKind.Generic){

      const tag = jsdocTag.tag;

      if(tag === "eventProperty"){
        properties[tag] ??= true;
        currentObject = [];
      } else {
        properties[tag] ??= [];
        currentObject = properties[tag]!;
      }

    }

    currentObject.push(jsdocTag);

  }

  properties.description?.length === 0 && delete properties.description;

  return properties;

}

export function interpretJSDocOrJSDocTags(ctx: InterpreterContext, jsdoc: readonly (JSDoc | TSJSDocTag)[]): JSDocTags {
  return jsdoc.map(jsdoc => interpretJSDocOrJSDocTag(ctx, jsdoc)).flat();
}

export function interpretJSDocOrJSDocTag(ctx: InterpreterContext, jsdoc: JSDoc | TSJSDocTag): JSDocTag | JSDocTags {
  if(isJSDoc(ctx, jsdoc)){
    return interpretJSDoc(ctx, jsdoc);
  } else {
    return interpretJSDocTag(ctx, jsdoc);
  }
}

function interpretJSDoc(ctx: InterpreterContext, jsdoc: JSDoc) {

  const comments = jsdoc.comment ? interpretJSDocComments(ctx, jsdoc.comment) : [];
  const tags = jsdoc.tags ? interpretJSDocTags(ctx, jsdoc.tags) : [];

  return [
    ...comments,
    ...tags
  ];

}

function interpretJSDocTags(ctx: InterpreterContext, jsdocTags: NodeArray<TSJSDocTag>) {
  return jsdocTags.map(jsdoc => interpretJSDocTag(ctx, jsdoc));
}

function interpretJSDocTag(ctx: InterpreterContext, jsdocTag: TSJSDocTag): JSDocTag {
  if(isJSDocSeeTag(ctx, jsdocTag)){
    return createJSDocSeeTag(ctx, jsdocTag);
  } else if(isJSDocThrowsTag(ctx, jsdocTag)){
    return createJSDocThrowsTag(ctx, jsdocTag);
  } else {
    return createGenericJSDocTag(ctx, jsdocTag);
  }
}

export function interpretJSDocComments(ctx: InterpreterContext, jsdocComments: NodeArray<JSDocComment> | string): JSDocTags {

  if(typeof jsdocComments === "string"){
    return [
      createJSDocText(ctx, jsdocComments)
    ];
  }

  return jsdocComments.map(jsdocComment => interpretJSDocComment(ctx, jsdocComment));
}

function interpretJSDocComment(ctx: InterpreterContext, jsdocNode: JSDocComment): JSDocTag {

  if(isJSDocText(ctx, jsdocNode)){
    return createJSDocText(ctx, jsdocNode);
  } else if(isJSDocLink(ctx, jsdocNode)){
    return createJSDocLink(ctx, jsdocNode);
  }

  throw new Error(`Unknown JSDoc node: ${jsdocNode.kind}`);

}
