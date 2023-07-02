import ts from "typescript";

import { EOL } from "unwritten:utils/system.js";
import { findCommonIndentation, removeCommonIndentation } from "unwritten:utils/template.js";

import type { DefaultContext } from "unwritten:type-definitions/context.js";


export function getDefaultCompilerOptions(): ts.CompilerOptions {
  return {
    ...ts.getDefaultCompilerOptions(),
    allowJs: true
  };
}

export function reportCompilerDiagnostics(ctx: DefaultContext, diagnostics: readonly ts.Diagnostic[], eol = EOL) {

  if(diagnostics.length <= 0){
    return;
  }

  if(ctx.logger === undefined){
    return;
  }

  diagnostics.forEach(diagnostic => {

    const message: string = ts.flattenDiagnosticMessageText(diagnostic.messageText, eol);

    if(diagnostic.file){

      const location: ts.LineAndCharacter = diagnostic.file.getLineAndCharacterOfPosition(diagnostic.start!);

      const sourceFile = diagnostic.file.text.split(eol);
      const minLine = Math.max(location.line - 2, 0);
      const maxLine = Math.min(location.line + 3, sourceFile.length);
      const maxLineNumberLength = (maxLine + 1).toString().length;
      const linesAround = sourceFile.slice(minLine, maxLine);
      const commonIndentation = findCommonIndentation(linesAround.join(eol), eol);
      const cleanedLinesAround = linesAround.map(line => {
        return removeCommonIndentation(line, commonIndentation);
      });

      const sourceCode = cleanedLinesAround.reduce<string[]>((acc, line, index) => {

        const lineNumber = minLine + 1 + index;
        const lineIndicator = `${lineNumber.toString().padStart(maxLineNumberLength)}| `;
        const tabCount = linesAround[index].substring(0, location.character + 1).match(/\t/g)?.length ?? 0;
        const tabCorrectedCharacter = location.character - tabCount + tabCount * 4;
        const tabCorrectedLine = line.replace(/\t/g, "    ");

        acc.push(ctx.logger!.gray(`${lineIndicator}${tabCorrectedLine}`));

        if(lineNumber === location.line + 1){
          acc.push(ctx.logger!.yellow(`${" ".repeat(lineIndicator.length + tabCorrectedCharacter - commonIndentation)}^`));
        }

        return acc;

      }, []);

      ctx.logger?.warn(
        `${diagnostic
          .file.fileName}:${location.line + 1}:${location.character + 1}`,
        "TypeScript",
        [
          ctx.logger.yellow(message),
          "",
          ...sourceCode
        ]
      );
    } else {
      ctx.logger?.warn(message, "TypeScript", []);
    }

  });

}
