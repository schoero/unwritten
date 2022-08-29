import { FunctionLikeDeclaration } from "typescript";

export function functionOverloadDeclarationFilter(declaration: FunctionLikeDeclaration) {
  return declaration.body === undefined;
}

export function functionImplementationDeclarationFilter(declaration: FunctionLikeDeclaration) {
  return declaration.body !== undefined;
}

export function contentFilter(element: string | null | undefined): element is string {
  return element !== null && element !== undefined && element !== "";
}