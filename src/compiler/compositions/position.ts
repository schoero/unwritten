import { Declaration, Node, TypeNode } from "typescript";


export function getPositionByNode(declaration: Node) {

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


export function getPositionByDeclaration(declaration: Declaration) {
  return getPositionByNode(declaration);
}

export function getPositionByTypeNode(typeNode: TypeNode) {
  return getPositionByNode(typeNode);
}
