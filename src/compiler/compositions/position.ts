import { Declaration, Node, TypeNode } from "typescript";

import { Position } from "../../types/compositions.js";
import { CompilerContext } from "../../types/context.js";


export function getPositionByNode(ctx: CompilerContext, declaration: Node) {

  const sourceFile = declaration.getSourceFile();
  const position = declaration.getStart();
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


export function getPositionByDeclaration(ctx: CompilerContext, declaration: Declaration): Position {

  return getPositionByNode(ctx, declaration);
}

export function getPositionByTypeNode(ctx: CompilerContext, typeNode: TypeNode) {
  return getPositionByNode(ctx, typeNode);
}
