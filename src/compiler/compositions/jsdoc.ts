import ts, { Declaration, ParameterDeclaration, Symbol } from "typescript";

import { Description, Example } from "../../types/compositions.js";
import { CompilerContext } from "../../types/context.js";


//-- Description

export function getDescriptionByDeclaration(ctx: CompilerContext, declaration: Declaration): Description | undefined {
  // TODO: Find official way to get to the jsDoc comment
  // @ts-expect-error - Internal API
  const comment = declaration.jsDoc?.[0]?.comment;
  console.log("comment", comment);
  return typeof comment !== "string" ? undefined : comment.replace(/\r/g, "");
}


export function getDescriptionBySymbol(ctx: CompilerContext, symbol: Symbol): Description | undefined {
  const comment = symbol.getDocumentationComment(ctx.checker);
  return comment.length === 0 ? undefined : ts.displayPartsToString(comment);
}


export function getDescriptionByType(ctx: CompilerContext, type: ts.Type): Description | undefined {
  const symbol = type.getSymbol();
  return symbol ? getDescriptionBySymbol(ctx, symbol) : undefined;
}


export function getParameterDescription(ctx: CompilerContext, declaration: ParameterDeclaration): Description | undefined {
  const parameterTags = ts.getJSDocParameterTags(declaration);
  return parameterTags.map(tag => tag.comment?.toString())[0];
}


export function getReturnTypeDescription(ctx: CompilerContext, declaration: Declaration): Description | undefined {
  const returnsTag = ts.getJSDocReturnTag(declaration);
  return returnsTag ? returnsTag.comment?.toString() : undefined;
}


//-- Example

export function getExampleByDeclaration(ctx: CompilerContext, declaration: Declaration): Example | undefined {
  const exampleTag = ts.getJSDocTags(declaration).find(tag => tag.tagName.text === "example");
  return exampleTag ? exampleTag.comment?.toString() : undefined;
}

export function getExampleBySymbol(ctx: CompilerContext, symbol: Symbol): Example | undefined {
  const comment = symbol.getJsDocTags(ctx.checker).find(tag => tag.name === "example");
  return comment?.text === undefined ? undefined : ts.displayPartsToString(comment.text);
}


//-- Remarks

export function getRemarksByDeclaration(ctx: CompilerContext, declaration: Declaration): string | undefined {
  const remarksTag = ts.getJSDocTags(declaration).find(tag => tag.tagName.text === "remarks");
  return remarksTag ? remarksTag.comment?.toString() : undefined;
}

export function getRemarksBySymbol(ctx: CompilerContext, symbol: Symbol): string | undefined {
  const comment = symbol.getJsDocTags(ctx.checker).find(tag => tag.name === "remarks");
  return comment?.text === undefined ? undefined : ts.displayPartsToString(comment.text);
}
