import { JSDOC_END, JSDOC_START } from "unwritten:renderer/typescript/utils/jsdoc.js";


export function splitJSDocAndDeclaration(lines: string[]): [string[][], string[][]] {

  let jsdocLines: string[][] = [];
  let declarationLines: string[][] = [];

  let currentBuffer: string[] = [];

  for(const line of lines){
    if(line.endsWith(JSDOC_START)){
      if(currentBuffer.length > 0){
        declarationLines = [...declarationLines, currentBuffer];
        currentBuffer = [];
      }
    }

    currentBuffer = [...currentBuffer, line];

    if(line.endsWith(JSDOC_END)){
      if(currentBuffer.length > 0){
        jsdocLines = [...jsdocLines, currentBuffer];
        currentBuffer = [];
      }
    }
  }

  if(currentBuffer.length > 0){
    declarationLines = [...declarationLines, currentBuffer];
    currentBuffer = [];
  }

  return [jsdocLines, declarationLines];

}
