import ts, { Declaration, ParameterDeclaration, Symbol } from "typescript";

import { getContext } from "../context/index.js";


//-- Description

export function getDescriptionByDeclaration(declaration: Declaration): string | undefined {
  // TODO: Find official way to get to the jsDoc comment
  //@ts-expect-error
  const comment = declaration.jsDoc?.[0]?.comment;
  return comment === undefined ? undefined : comment.replace(/\r/g, "");
}


export function getDescriptionBySymbol(symbol: Symbol): string | undefined {
  const comment = symbol.getDocumentationComment(getContext().checker);
  return comment.length === 0 ? undefined : ts.displayPartsToString(comment);
}


/** @deprecated */
export function getDescriptionByType(type: ts.Type): string | undefined {
  const symbol = type.getSymbol();
  return symbol ? getDescriptionBySymbol(symbol) : undefined;
}


export function getParameterDescription(declaration: ParameterDeclaration): string | undefined {
  const parameterTags = ts.getJSDocParameterTags(declaration);
  return parameterTags.map(tag => tag.comment?.toString())[0];
}


export function getReturnTypeDescription(declaration: Declaration): string | undefined {
  const returnsTag = ts.getJSDocReturnTag(declaration);
  return returnsTag ? returnsTag.comment?.toString() : undefined;
}


//-- Example

export function getExampleByDeclaration(declaration: Declaration): string | undefined {
  const exampleTag = ts.getJSDocTags(declaration).find(tag => tag.tagName.text === "example");
  return exampleTag ? exampleTag.comment?.toString() : undefined;
}

export function getExampleBySymbol(symbol: Symbol): string | undefined {
  const comment = symbol.getJsDocTags(getContext().checker).find(tag => tag.name === "example");
  return comment?.text === undefined ? undefined : ts.displayPartsToString(comment.text);
}


//-- Remarks

export function getRemarksByDeclaration(declaration: Declaration): string | undefined {
  const remarksTag = ts.getJSDocTags(declaration).find(tag => tag.tagName.text === "remarks");
  return remarksTag ? remarksTag.comment?.toString() : undefined;
}

export function getRemarksBySymbol(symbol: Symbol): string | undefined {
  const comment = symbol.getJsDocTags(getContext().checker).find(tag => tag.name === "remarks");
  return comment?.text === undefined ? undefined : ts.displayPartsToString(comment.text);
}