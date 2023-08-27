import type { Declaration, Symbol, Type, TypeNode } from "typescript";

import type { InterpreterContext } from "unwritten:type-definitions/context.js";


export function isAliasExcludesSymbol(ctx: InterpreterContext, symbol: Symbol): boolean {
  const { ts } = ctx.dependencies;
  return (symbol.getFlags() & ts.SymbolFlags.AliasExcludes) !== 0;
}

export function isAliasedSymbol(ctx: InterpreterContext, symbol: Symbol): boolean {
  const { ts } = ctx.dependencies;
  return (symbol.getFlags() & ts.SymbolFlags.Alias) !== 0;
}

export function isClassSymbol(ctx: InterpreterContext, symbol: Symbol): boolean {
  const { ts } = ctx.dependencies;
  return (symbol.getFlags() & ts.SymbolFlags.Class) !== 0;
}

export function isConstructorSymbol(ctx: InterpreterContext, symbol: Symbol): boolean {
  const { ts } = ctx.dependencies;
  return (symbol.getFlags() & ts.SymbolFlags.Constructor) !== 0;
}

export function isEnumMemberSymbol(ctx: InterpreterContext, symbol: Symbol): boolean {
  const { ts } = ctx.dependencies;
  return (symbol.getFlags() & ts.SymbolFlags.EnumMember) !== 0;
}

export function isEnumSymbol(ctx: InterpreterContext, symbol: Symbol): boolean {
  const { ts } = ctx.dependencies;
  return (symbol.getFlags() & ts.SymbolFlags.Enum) !== 0;
}

export function isExportAssignmentSymbol(ctx: InterpreterContext, symbol: Symbol): boolean {
  const { ts } = ctx.dependencies;
  return (symbol.getFlags() & ts.SymbolFlags.Property) !== 0 &&
    symbol.valueDeclaration?.kind === ts.SyntaxKind.ExportAssignment ||
    symbol.declarations?.[0]?.kind === ts.SyntaxKind.ExportAssignment;
}

export function isExportSpecifierSymbol(ctx: InterpreterContext, symbol: Symbol): boolean {
  const { ts } = ctx.dependencies;
  return (symbol.getFlags() & ts.SymbolFlags.ModuleMember) !== 0 &&
    symbol.valueDeclaration?.kind === ts.SyntaxKind.ExportSpecifier ||
    symbol.declarations?.[0]?.kind === ts.SyntaxKind.ExportSpecifier;
}

export function isFunctionLikeSymbol(ctx: InterpreterContext, symbol: Symbol): boolean {
  const { ts } = ctx.dependencies;
  return isFunctionSymbol(ctx, symbol) ||
    isConstructorSymbol(ctx, symbol) ||
    isMethodSymbol(ctx, symbol) ||
    isSetterSymbol(ctx, symbol);
}

export function isFunctionSymbol(ctx: InterpreterContext, symbol: Symbol): boolean {
  const { ts } = ctx.dependencies;
  return (symbol.getFlags() & ts.SymbolFlags.Function) !== 0;
}

export function isGetterSymbol(ctx: InterpreterContext, symbol: Symbol): boolean {
  const { ts } = ctx.dependencies;
  return (symbol.getFlags() & ts.SymbolFlags.GetAccessor) !== 0;
}

export function isImportSpecifierSymbol(ctx: InterpreterContext, symbol: Symbol): boolean {
  const { ts } = ctx.dependencies;
  return (symbol.getFlags() & ts.SymbolFlags.ModuleMember) !== 0 &&
    symbol.valueDeclaration?.kind === ts.SyntaxKind.ImportSpecifier ||
    symbol.declarations?.[0]?.kind === ts.SyntaxKind.ImportSpecifier;
}

export function isInterfaceSymbol(ctx: InterpreterContext, symbol: Symbol): boolean {
  const { ts } = ctx.dependencies;
  return (symbol.getFlags() & ts.SymbolFlags.Interface) !== 0;
}

export function isMethodSymbol(ctx: InterpreterContext, symbol: Symbol): boolean {
  const { ts } = ctx.dependencies;
  return (symbol.getFlags() & ts.SymbolFlags.Method) !== 0;
}

export function isModuleSymbol(ctx: InterpreterContext, symbol: Symbol): boolean {
  const { ts } = ctx.dependencies;
  return (symbol.getFlags() & ts.SymbolFlags.Module) !== 0;
}

export function isNamespaceExportSymbol(ctx: InterpreterContext, symbol: Symbol): boolean {
  const { ts } = ctx.dependencies;
  return (symbol.getFlags() & ts.SymbolFlags.ModuleMember) !== 0 &&
    symbol.valueDeclaration?.kind === ts.SyntaxKind.NamespaceExport ||
    symbol.declarations?.[0]?.kind === ts.SyntaxKind.NamespaceExport;
}

export function isNamespaceSymbol(ctx: InterpreterContext, symbol: Symbol): boolean {
  const { ts } = ctx.dependencies;
  return (symbol.getFlags() & ts.SymbolFlags.Namespace) !== 0 ||
    (symbol.getFlags() & ts.SymbolFlags.NamespaceModule) !== 0;
}

export function isObjectLiteralSymbol(ctx: InterpreterContext, symbol: Symbol): boolean {
  const { ts } = ctx.dependencies;
  return (symbol.getFlags() & ts.SymbolFlags.ObjectLiteral) !== 0;
}

export function isPropertySymbol(ctx: InterpreterContext, symbol: Symbol): boolean {
  const { ts } = ctx.dependencies;
  return (symbol.getFlags() & ts.SymbolFlags.Property) !== 0 &&
    !isMethodSymbol(ctx, symbol) &&
    !isGetterSymbol(ctx, symbol) &&
    !isSetterSymbol(ctx, symbol) &&
    !isPrototypeSymbol(ctx, symbol);
}

export function isPrototypeSymbol(ctx: InterpreterContext, symbol: Symbol): boolean {
  const { ts } = ctx.dependencies;
  return (symbol.getFlags() & ts.SymbolFlags.Prototype) !== 0;
}

export function isSetterSymbol(ctx: InterpreterContext, symbol: Symbol): boolean {
  const { ts } = ctx.dependencies;
  return (symbol.getFlags() & ts.SymbolFlags.SetAccessor) !== 0;
}

export function isSourceFileSymbol(ctx: InterpreterContext, symbol: Symbol): boolean {
  const { ts } = ctx.dependencies;
  return (symbol.getFlags() & ts.SymbolFlags.ValueModule) !== 0;
}

export function isSymbol(ctx: InterpreterContext, typeNodeOrSymbolOrDeclarationOrType: Declaration | Symbol | Type | TypeNode): typeNodeOrSymbolOrDeclarationOrType is Symbol {
  const { ts } = ctx.dependencies;
  return "getName" in typeNodeOrSymbolOrDeclarationOrType;
}

export function isTypeAliasSymbol(ctx: InterpreterContext, symbol: Symbol): boolean {
  const { ts } = ctx.dependencies;
  return (symbol.getFlags() & ts.SymbolFlags.TypeAlias) !== 0;
}

export function isTypeLiteralSymbol(ctx: InterpreterContext, symbol: Symbol): boolean {
  const { ts } = ctx.dependencies;
  return (symbol.getFlags() & ts.SymbolFlags.TypeLiteral) !== 0;
}

export function isTypeParameterSymbol(ctx: InterpreterContext, symbol: Symbol): boolean {
  const { ts } = ctx.dependencies;
  return (symbol.getFlags() & ts.SymbolFlags.TypeParameter) !== 0;
}

export function isTypeSymbol(ctx: InterpreterContext, symbol: Symbol): boolean {
  const { ts } = ctx.dependencies;
  return (symbol.getFlags() & ts.SymbolFlags.Type) !== 0;
}

export function isVariableSymbol(ctx: InterpreterContext, symbol: Symbol): boolean {
  const { ts } = ctx.dependencies;
  return (symbol.getFlags() & ts.SymbolFlags.Variable) !== 0;
}
