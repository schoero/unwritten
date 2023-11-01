import { createJSDocReference } from "unwritten:interpreter/ast/jsdoc/reference";
import { getNameBySymbol } from "unwritten:interpreter/ast/shared/name";
import { getPositionByNode } from "unwritten:interpreter/ast/shared/position";
import { interpretSymbol } from "unwritten:interpreter/ast/symbol";
import { JSDocKind } from "unwritten:interpreter/enums/jsdoc";
import { TypeKind } from "unwritten:interpreter/enums/type";

import type { EntityName, JSDocLink as TSJSDocLink, JSDocMemberName } from "typescript";

import type { JSDocLink } from "unwritten:interpreter/type-definitions/jsdoc";
import type { TypeReferenceType } from "unwritten:interpreter/type-definitions/types";
import type { InterpreterContext } from "unwritten:type-definitions/context";


export function createJSDocLink(ctx: InterpreterContext, jsdocLink: TSJSDocLink): JSDocLink {

  const reference = jsdocLink.name && createJSDocReference(ctx, jsdocLink.name);

  const linkName = jsdocLink.name?.getText() ?? "";
  const linkText = jsdocLink.text;

  const urlText = `${linkName}${linkText}`;
  const urlParts = urlText.split("|");

  const link = urlParts[0];
  const text = urlParts[1];

  const kind = JSDocKind.Link;

  return {
    kind,
    link,
    reference,
    text
  };

}


function createTypeReferenceBySymbol(ctx: InterpreterContext, identifier: EntityName | JSDocMemberName): Omit<TypeReferenceType, "typeId"> | undefined {

  const symbol = ctx.checker.getSymbolAtLocation(identifier);

  if(!symbol){
    return;
  }

  const position = getPositionByNode(ctx, identifier);
  const target = interpretSymbol(ctx, symbol);
  const name = getNameBySymbol(ctx, symbol);

  const kind = TypeKind.TypeReference;

  return {
    kind,
    name,
    position,
    target
  };

}
