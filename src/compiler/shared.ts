import { highlight as tinyHighlight } from "tinyhighlight";

import { DiagnosticSeverity } from "unwritten:type-definitions/unwritten";
import { findCommonIndentation, removeCommonIndentation } from "unwritten:utils/template";

import type { TokenColors } from "tinyhighlight";
import type { CompilerOptions, Diagnostic, DiagnosticMessageChain, SourceFile } from "typescript";

import type { DefaultContext } from "unwritten:type-definitions/context";
import type { DiagnosticMessage } from "unwritten:type-definitions/unwritten";


export function getDefaultCompilerOptions(ctx: DefaultContext): CompilerOptions {
  const { ts } = ctx.dependencies;
  return {
    ...ts.getDefaultCompilerOptions(),
    allowJs: true,
    checkJs: true,
    noEmit: true
  };
}

export function convertDiagnostics(ctx: DefaultContext, diagnostics: readonly Diagnostic[]): DiagnosticMessage[] {
  return diagnostics.map(diagnostic => {
    return {
      code: diagnostic.code,
      column: diagnostic.file && diagnostic.start
        ? getColumnFromPosition(ctx, diagnostic.file, diagnostic.start)
        : undefined,
      end: diagnostic.start && diagnostic.length
        ? diagnostic.start + diagnostic.length
        : undefined,
      line: diagnostic.file && diagnostic.start
        ? getLineFromPosition(ctx, diagnostic.file, diagnostic.start)
        : undefined,
      message: convertDiagnosticMessageTextToString(ctx, diagnostic.messageText),
      path: diagnostic.file?.fileName,
      severity: diagnostic.category === ctx.dependencies.ts.DiagnosticCategory.Error
        ? DiagnosticSeverity.Error
        : DiagnosticSeverity.Warning,
      start: diagnostic.start
    };
  });
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

    const message = `${color(`${category}: ${convertDiagnosticMessageTextToString(ctx, diagnostic.messageText)}`)} ${logger.gray(`ts(${diagnostic.code})`)}`;

    if(diagnostic.file){

      const line = getLineFromPosition(ctx, diagnostic.file, diagnostic.start!);
      const column = getColumnFromPosition(ctx, diagnostic.file, diagnostic.start!);

      const filePath = `${logger.gray("at")} ${logger.filePath(`${diagnostic.file.fileName}:${line}:${column}`)}`;

      const sourceFile = highlight(ctx, diagnostic.file.text).split(lineEndings);
      const minLine = Math.max(line - 2, 1);
      const maxLine = Math.min(line + 2, sourceFile.length);


      const maxLineNumberLength = maxLine.toString().length;
      const linesAround = sourceFile.slice(minLine - 1, maxLine);

      const commonIndentation = findCommonIndentation(linesAround.join(lineEndings), lineEndings);
      const cleanedLinesAround = linesAround.map(line => removeCommonIndentation(line, commonIndentation));

      const sourceCode = cleanedLinesAround.reduce<string[]>((acc, cleanedLine, index) => {

        const lineNumber = minLine + index;
        const lineIndicator = `${lineNumber.toString().padStart(maxLineNumberLength)}| `;

        const tabCount = linesAround[index].substring(0, column).match(/\t/g)?.length ?? 0;
        const tabCorrectedStartColumn = column - 1 - tabCount + tabCount * 4;
        const tabCorrectedEndColumn = tabCorrectedStartColumn + diagnostic.length!;
        const tabCorrectedLine = cleanedLine.replace(/\t/g, "    ");

        const syntaxHighlightedLine = tabCorrectedLine;

        acc.push(logger.gray(`${lineIndicator}${syntaxHighlightedLine}`));

        if(lineNumber === line){
          acc.push(logger.yellow(`${
            " ".repeat(lineIndicator.length + tabCorrectedStartColumn - commonIndentation)
          }${
            color("~".repeat(tabCorrectedEndColumn - tabCorrectedStartColumn))
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

function getLineFromPosition(ctx: DefaultContext, sourceFile: SourceFile, position: number): number {
  const { ts } = ctx.dependencies;
  return ts.getLineAndCharacterOfPosition(sourceFile, position).line + 1;
}

function getColumnFromPosition(ctx: DefaultContext, sourceFile: SourceFile, position: number): number {
  const { ts } = ctx.dependencies;
  return ts.getLineAndCharacterOfPosition(sourceFile, position).character + 1;
}

function convertDiagnosticMessageTextToString(ctx: DefaultContext, message: DiagnosticMessageChain | string): string {
  const { os, ts } = ctx.dependencies;
  return ts.flattenDiagnosticMessageText(message, os.lineEndings);
}
