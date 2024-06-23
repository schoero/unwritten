import type { RenderOutput } from "unwritten:type-definitions/renderer";


export enum DiagnosticSeverity {
  Error = "error",
  Warning = "warning"
}

export interface DiagnosticMessage {
  code: number;
  message: string;
  severity: DiagnosticSeverity;
  column?: number;
  end?: number;
  line?: number;
  path?: string;
  start?: number;
}

export interface UnwrittenOutput {
  compilerDiagnostics: DiagnosticMessage[];
  rendered: RenderOutput;
  paths?: string[];
}
