import type { Declaration, Node, Symbol, Type } from "typescript";
import type { Position } from "unwritten:interpreter:type-definitions/shared";
import type { InterpreterContext } from "unwritten:type-definitions/context";


export function getPositionByNode(ctx: InterpreterContext, node: Node): Position {

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

// function getSourceFileOfNode(ctx: InterpreterContext, sourceFile: SourceFile, node: Node): SourceFile | undefined {

//   const sourceFileStart = sourceFile.getStart();
//   const sourceFileEnd = sourceFile.getEnd();

//   const start = node.getStart();
//   const end = node.getEnd();

//   const isPositionInReferencedFile = sourceFileStart <= start && end <= sourceFileEnd;

//   // In the case of triple slash directives, the source file is the file that is being imported
//   // and not the file that contains the import. So we need to get the file that contains the import.

//   if(sourceFile.isDeclarationFile && sourceFile.typeReferenceDirectives.length > 0){
//     for(const directive of sourceFile.typeReferenceDirectives){
//       const fileName = directive.fileName;
//       const resolvedName = sourceFile.resolvedTypeReferenceDirectiveNames?.get(fileName);
//       const resolvedFilePath = resolvedName?.resolvedTypeReferenceDirective?.resolvedFileName;
//       const referencedSource = ctx.program.getSourceFile(resolvedFilePath);

//       if(!referencedSource){
//         continue;
//       }

//       const actualSourceOfNode = getSourceFileOfNode(ctx, referencedSource, node);

//       if(actualSourceOfNode){
//         return actualSourceOfNode;
//       }
//     }
//   }

//   if(sourceFile.referencedFiles.length > 0){
//     for(const referencedFile of sourceFile.referencedFiles){
//       const referencedSource = ctx.program.getSourceFile(referencedFile.fileName);

//       if(!referencedSource){
//         continue;
//       }

//       const actualSourceOfNode = getSourceFileOfNode(ctx, referencedSource, node);

//       if(actualSourceOfNode){
//         return actualSourceOfNode;
//       }

//     }
//   }

//   if(isPositionInReferencedFile){
//     return sourceFile;
//   }


// }

export function getPositionBySymbol(ctx: InterpreterContext, symbol: Symbol): Position | undefined {
  const declaration = symbol.valueDeclaration ?? symbol.declarations?.[0];
  return declaration && getPositionByDeclaration(ctx, declaration);
}


export function getPositionByDeclaration(ctx: InterpreterContext, declaration: Declaration): Position {
  return getPositionByNode(ctx, declaration);
}


export function getPositionByType(ctx: InterpreterContext, type: Type): Position | undefined {
  const symbol = type.getSymbol();
  return symbol && getPositionBySymbol(ctx, symbol);
}
