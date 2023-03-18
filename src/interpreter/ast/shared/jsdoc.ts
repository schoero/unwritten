import ts from "typescript";

import { JSDocTags } from "unwritten:interpreter:enums/jsdoc.js";

import type { Declaration, ParameterDeclaration, Symbol, Type, TypeParameterDeclaration } from "typescript";

import type { Description } from "unwritten:interpreter:type-definitions/shared.js";
import type { InterpreterContext } from "unwritten:type-definitions/context.d.js";


export function getDescriptionByDeclaration(ctx: InterpreterContext, declaration: Declaration): Description | undefined {
  // TODO: Find official way to get to the jsDoc comment
  // @ts-expect-error - Internal API
  const comment = declaration.jsDoc?.[0]?.comment;
  return typeof comment !== "string" ? undefined : comment.replace(/\r/g, "");
}

export function getDescriptionBySymbol(ctx: InterpreterContext, symbol: Symbol): Description | undefined {
  const comment = symbol.getDocumentationComment(ctx.checker);
  return comment.length === 0 ? undefined : ts.displayPartsToString(comment);
}

export function getDescriptionByType(ctx: InterpreterContext, type: Type): Description | undefined {
  const symbol = type.getSymbol();
  return symbol ? getDescriptionBySymbol(ctx, symbol) : undefined;
}

export function getJSDocTagsByDeclaration(ctx: InterpreterContext,
  declaration: Declaration,
  tags: JSDocTags | JSDocTags[] = Object.values(JSDocTags)): { [tag: string]: string | undefined; } | undefined {

  return ts.getJSDocTags(declaration).reduce<{ [tag: string]: string | undefined; }>((acc, tag) => {
    if((typeof tags === "string" ? [tags] : tags).includes(tag.tagName.text as JSDocTags)){
      acc[tag.tagName.text] = tag.comment?.toString();
    }
    return acc;
  }, {});
}

export function getJSDocTagsBySymbol(ctx: InterpreterContext,
  symbol: Symbol,
  tags: JSDocTags | JSDocTags[] = Object.values(JSDocTags)): { [tag: string]: string | undefined; } | undefined {

  return symbol.getJsDocTags(ctx.checker).reduce<{ [tag: string]: string | undefined; }>((acc, tag) => {
    if((typeof tags === "string" ? [tags] : tags).includes(tag.name as JSDocTags)){
      acc[tag.name] = ts.displayPartsToString(tag.text);
    }
    return acc;
  }, {});
}


export function getParameterDescription(ctx: InterpreterContext, declaration: ParameterDeclaration): Description | undefined {
  const parameterTags = ts.getJSDocParameterTags(declaration);
  return parameterTags.map(tag => tag.comment?.toString())[0];
}


export function getReturnTypeDescription(ctx: InterpreterContext, declaration: Declaration): Description | undefined {
  const returnsTag = ts.getJSDocReturnTag(declaration);
  return returnsTag ? returnsTag.comment?.toString() : undefined;
}


export function getTypeParameterDescription(ctx: InterpreterContext, declaration: TypeParameterDeclaration): Description | undefined {
  const typeParameterTags = ts.getJSDocTypeParameterTags(declaration);
  return typeParameterTags.map(tag => tag.comment?.toString())[0];
}
