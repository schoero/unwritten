import { highlight as tinyHighlight } from "tinyhighlight";

import { findCommonIndentation, removeCommonIndentation } from "unwritten:utils/template";

import type { TokenColors } from "tinyhighlight";
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

      const filePath = `${logger.gray("at")} ${logger.filePath(`${diagnostic.file.fileName}:${startLocation.line + 1}:${startLocation.character + 1}`)}`;

      const sourceFile = highlight(ctx, diagnostic.file.text).split(lineEndings);
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
        const tabCorrectedEndCharacter = tabCorrectedStartCharacter + diagnostic.length!;
        const tabCorrectedLine = line.replace(/\t/g, "    ");
        const syntaxHighlightedLine = tabCorrectedLine;

        acc.push(logger.gray(`${lineIndicator}${syntaxHighlightedLine}`));

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


function highlight(ctx: DefaultContext, code: string) {

  const { logger } = ctx.dependencies;

  if(!logger){
    return code;
  }

  const colors = {
    bgRed: (code: string) => logger.bgRed(code),
    blue: (code: string) => logger.blue(code),
    bold: (code: string) => logger.bold(code),
    cyan: (code: string) => logger.cyan(code),
    gray: (code: string) => logger.gray(code),
    green: (code: string) => logger.green(code),
    magenta: (code: string) => logger.magenta(code),
    white: (code: string) => logger.white(code),
    yellow: (code: string) => logger.yellow(code)
  };

  const tokenColors: TokenColors = {
    IdentifierCallable: colors.blue,
    IdentifierCapitalized: colors.yellow,
    Invalid: (text: string) => colors.white(colors.bgRed(colors.bold(text))),
    JSXIdentifier: colors.yellow,
    JSXInvalid: (text: string) => colors.white(colors.bgRed(colors.bold(text))),
    JSXPunctuator: colors.yellow,
    JSXString: colors.green,
    Keyword: colors.magenta,
    MultiLineComment: colors.gray,
    NoSubstitutionTemplate: colors.green,
    NumericLiteral: colors.blue,
    PrivateIdentifierCallable: text => `#${colors.blue(text.slice(1))}`,
    Punctuator: colors.yellow,
    RegularExpressionLiteral: colors.cyan,
    SingleLineComment: colors.gray,
    StringLiteral: colors.green,
    TemplateHead: text => colors.green(text.slice(0, -2)) + colors.cyan(text.slice(-2)),
    TemplateMiddle: text => colors.cyan(text.slice(0, 1)) + colors.green(text.slice(1, -2)) + colors.cyan(text.slice(-2)),
    TemplateTail: text => colors.cyan(text.slice(0, 1)) + colors.green(text.slice(1))
  };

  return tinyHighlight(code, {
    colors: tokenColors
  });

}
