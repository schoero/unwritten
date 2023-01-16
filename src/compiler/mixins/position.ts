import type { Declaration, Node, Symbol } from "typescript";

import type { Position } from "quickdoks:compiler:type-definitions/mixins.d.js";
import type { CompilerContext } from "quickdoks:type-definitions/context.d.js";


export function getPositionByNode(ctx: CompilerContext, node: Node): Position {

  const sourceFile = node.getSourceFile();
  const position = node.getStart();
  const start = sourceFile.getLineAndCharacterOfPosition(position);

  const file = sourceFile.fileName;
  const line = start.line + 1;
  const column = start.character;

  return {
    column,
    file,
    line
  };

}


export function getPositionBySymbol(ctx: CompilerContext, symbol: Symbol): Position | undefined {
  const declaration = symbol.valueDeclaration ?? symbol.declarations?.[0];
  return declaration && getPositionByDeclaration(ctx, declaration);
}


export function getPositionByDeclaration(ctx: CompilerContext, declaration: Declaration): Position {
  return getPositionByNode(ctx, declaration);
}