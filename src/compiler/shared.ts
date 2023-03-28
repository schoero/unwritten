import ts from "typescript";

import type { DefaultContext } from "unwritten:type-definitions/context.js";


export function getDefaultCompilerOptions(): ts.CompilerOptions {
  return {
    ...ts.getDefaultCompilerOptions(),
    allowJs: true
  };
}

export function reportCompilerDiagnostics(ctx: DefaultContext, diagnostics: readonly ts.Diagnostic[], eol = "\n") {

  if(diagnostics.length > 0){
    for(const diagnostic of diagnostics){
      const message: string = ts.flattenDiagnosticMessageText(diagnostic.messageText, eol);
      if(diagnostic.file){
        const location: ts.LineAndCharacter = diagnostic.file.getLineAndCharacterOfPosition(diagnostic.start!);
        const formattedMessage: string =
          `${diagnostic.file.fileName}(${location.line + 1},${location.character + 1}):` +
          ` [TypeScript] ${message}`;

        ctx.logger?.warn(formattedMessage);
      } else {
        ctx.logger?.warn(message);
      }
    }
  }

}
