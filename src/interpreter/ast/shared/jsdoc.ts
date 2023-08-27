import { getTypeByTypeNode } from "unwritten:interpreter/ast/index.js";
import { JSDocTagNames } from "unwritten:interpreter/enums/jsdoc.js";
import { assert } from "unwritten:utils/general.js";

import type { Declaration, ParameterDeclaration, Symbol, Type, TypeParameterDeclaration } from "typescript";

import type { Description, JSDocTags } from "unwritten:interpreter:type-definitions/shared.js";
import type { InterpreterContext } from "unwritten:type-definitions/context.js";


export function getDescriptionByDeclaration(ctx: InterpreterContext, declaration: Declaration): Description {

  // TODO: Find official way to get to the jsDoc comment

  // @ts-expect-error - Internal API
  const comment = declaration.jsDoc?.[0]?.comment;

  return typeof comment !== "string"
    ? undefined
    : comment
      .replace(/\r/g, "");

}

export function getDescriptionBySymbol(ctx: InterpreterContext, symbol: Symbol): Description {

  const { ts } = ctx.dependencies;

  const comment = symbol.getDocumentationComment(ctx.checker);

  return comment.length === 0
    ? undefined
    : ts.displayPartsToString(comment)
      .replace(/\r/g, "");
}

export function getDescriptionByType(ctx: InterpreterContext, type: Type): Description {

  const symbol = type.getSymbol();

  return symbol
    ? getDescriptionBySymbol(ctx, symbol)
    : undefined;

}

export function getJSDocTagsByDeclaration(
  ctx: InterpreterContext,
  declaration: Declaration,
  tags: JSDocTagNames[] = Object.values(JSDocTagNames)
): JSDocTags {

  const { ts } = ctx.dependencies;

  return ts.getJSDocTags(declaration).reduce<JSDocTags>((acc, tag) => {

    if((typeof tags === "string" ? [tags] : tags).includes(tag.tagName.text as JSDocTagNames)){

      const tagName = tag.tagName.text as JSDocTagNames;
      const comment = tag.comment?.toString()
        .replace(/\r/g, "");

      if(tagName === JSDocTagNames.Throws){

        assert(ts.isJSDocThrowsTag(tag), "Tag is not a JSDocThrowsTag");

        const type = tag.typeExpression?.type && getTypeByTypeNode(ctx, tag.typeExpression.type);
        acc[tagName] ??= [];
        acc[tagName]!.push({
          description: comment,
          type
        });

      } else if(tagName === JSDocTagNames.Example || tagName === JSDocTagNames.Remarks){
        acc[tagName] ??= [];
        acc[tagName]!.push(comment);
      } else if(tagName === JSDocTagNames.EventProperty){
        acc[tagName] = true;
      } else {
        acc[tagName] = comment;
      }

    }
    return acc;
  }, {});
}

export function getParameterDescription(ctx: InterpreterContext, declaration: ParameterDeclaration): Description | undefined {
  const { ts } = ctx.dependencies;
  const parameterTags = ts.getJSDocParameterTags(declaration);
  return parameterTags.map(
    tag => tag.comment?.toString()
      .replace(/\r/g, "")
  )[0];
}


export function getReturnTypeDescription(ctx: InterpreterContext, declaration: Declaration): Description | undefined {

  const { ts } = ctx.dependencies;

  const returnsTag = ts.getJSDocReturnTag(declaration);

  return returnsTag?.comment?.toString()
    .replace(/\r/g, "");

}


export function getTypeParameterDescription(ctx: InterpreterContext, declaration: TypeParameterDeclaration): Description | undefined {

  const { ts } = ctx.dependencies;

  const typeParameterTags = ts.getJSDocTypeParameterTags(declaration);

  return typeParameterTags.map(
    tag => tag.comment?.toString()
      .replace(/\r/g, "")
  )[0];

}
