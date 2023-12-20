import { findCommonIndentation, removeCommonIndentation } from "unwritten:utils/template";

import type { CompilerOptions, Diagnostic, LineAndCharacter } from "typescript";

import type { DefaultContext } from "unwritten:type-definitions/context";


export function getDefaultCompilerOptions(ctx: DefaultContext): CompilerOptions {
  const { ts } = ctx.dependencies;
  return {
    ...ts.getDefaultCompilerOptions(),
    allowJs: true,
    checkJs: true,
    noEmit: true
  };
}

export function reportCompilerDiagnostics(ctx: DefaultContext, diagnostics: readonly Diagnostic[]) {

  const { lineEndings } = ctx.dependencies.os;

  const ts = ctx.dependencies.ts;
  const logger = ctx.dependencies.logger;

  if(diagnostics.length <= 0){
    return;
  }

  if(logger === undefined){
    return;
  }

  diagnostics.filter(
    diagnostic => diagnostic.category === ts.DiagnosticCategory.Error ||
    diagnostic.category === ts.DiagnosticCategory.Warning
  ).forEach(diagnostic => {

    const color = diagnostic.category === ts.DiagnosticCategory.Error
      ? logger.red
      : logger.yellow;

    const category = diagnostic.category === ts.DiagnosticCategory.Error
      ? "Error"
      : "Warning";

    const title = diagnostic.category === ts.DiagnosticCategory.Error
      ? "The TypeScript compiler has reported an error"
      : "The TypeScript compiler has reported a warning";

    const message = `${color(`${category}: ${ts.flattenDiagnosticMessageText(diagnostic.messageText, lineEndings)}`)} ${logger.gray(`ts(${diagnostic.code})`)}`;

    if(diagnostic.file){

      const startLocation: LineAndCharacter = diagnostic.file.getLineAndCharacterOfPosition(diagnostic.start!);
      const endLocation: LineAndCharacter = diagnostic.file.getLineAndCharacterOfPosition(diagnostic.start! + diagnostic.length!);

      const filePath = `${logger.gray("at")} ${logger.filePath(`${diagnostic.file.fileName}:${startLocation.line + 1}:${startLocation.character + 1}`)}`;

      const sourceFile = diagnostic.file.text.split(lineEndings);
      const minLine = Math.max(startLocation.line - 2, 0);
      const maxLine = Math.min(startLocation.line + 3, sourceFile.length);
      const maxLineNumberLength = (maxLine + 1).toString().length;
      const linesAround = sourceFile.slice(minLine, maxLine);
      const commonIndentation = findCommonIndentation(linesAround.join(lineEndings), lineEndings);
      const cleanedLinesAround = linesAround.map(line => {
        return removeCommonIndentation(line, commonIndentation);
      });

      const sourceCode = cleanedLinesAround.reduce<string[]>((acc, line, index) => {

        const lineNumber = minLine + 1 + index;
        const lineIndicator = `${lineNumber.toString().padStart(maxLineNumberLength)}| `;
        const tabCount = linesAround[index].substring(0, startLocation.character + 1).match(/\t/g)?.length ?? 0;
        const tabCorrectedStartCharacter = startLocation.character - tabCount + tabCount * 4;
        const tabCorrectedEndCharacter = endLocation.character - tabCount + tabCount * 4;
        const tabCorrectedLine = line.replace(/\t/g, "    ");

        acc.push(logger.gray(`${lineIndicator}${tabCorrectedLine}`));

        if(lineNumber === startLocation.line + 1){
          acc.push(logger.yellow(`${
            " ".repeat(lineIndicator.length + tabCorrectedStartCharacter - commonIndentation)
          }${
            color("~".repeat(tabCorrectedEndCharacter - tabCorrectedStartCharacter))
          }`));
        }

        return acc;

      }, []);

      logger.warn(
        title,
        [
          filePath,
          "",
          message,
          "",
          ...sourceCode
        ]
      );
    } else {
      logger.warn(
        title,
        [
          message
        ]
      );
    }

  });

}
