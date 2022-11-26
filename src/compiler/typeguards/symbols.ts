import ts, { Declaration, Type, TypeNode } from "typescript";


export function isAliasExcludesSymbol(symbol: ts.Symbol): boolean {
  return (symbol.getFlags() & ts.SymbolFlags.AliasExcludes) !== 0;
}

export function isAliasedSymbol(symbol: ts.Symbol): boolean {
  return (symbol.getFlags() & ts.SymbolFlags.Alias) !== 0;
}

export function isClassSymbol(symbol: ts.Symbol): boolean {
  return (symbol.getFlags() & ts.SymbolFlags.Class) !== 0;
}

export function isConstructorSymbol(symbol: ts.Symbol): boolean {
  return (symbol.getFlags() & ts.SymbolFlags.Constructor) !== 0;
}

export function isEnumMemberSymbol(symbol: ts.Symbol): boolean {
  return (symbol.getFlags() & ts.SymbolFlags.EnumMember) !== 0;
}

export function isEnumSymbol(symbol: ts.Symbol): boolean {
  return (symbol.getFlags() & ts.SymbolFlags.Enum) !== 0;
}

export function isFunctionLikeSymbol(symbol: ts.Symbol): boolean {
  return isFunctionSymbol(symbol) ||
    isConstructorSymbol(symbol) ||
    isMethodSymbol(symbol) ||
    isSetterSymbol(symbol);
}

export function isFunctionSymbol(symbol: ts.Symbol): boolean {
  return (symbol.getFlags() & ts.SymbolFlags.Function) !== 0;
}

export function isGetterSymbol(symbol: ts.Symbol): boolean {
  return (symbol.getFlags() & ts.SymbolFlags.GetAccessor) !== 0;
}

export function isInterfaceSymbol(symbol: ts.Symbol): boolean {
  return (symbol.getFlags() & ts.SymbolFlags.Interface) !== 0;
}

export function isMethodSymbol(symbol: ts.Symbol): boolean {
  return (symbol.getFlags() & ts.SymbolFlags.Method) !== 0;
}

export function isModuleSymbol(symbol: ts.Symbol): boolean {
  return (symbol.getFlags() & ts.SymbolFlags.Module) !== 0;
}

export function isNamespaceSymbol(symbol: ts.Symbol): boolean {
  return (symbol.getFlags() & ts.SymbolFlags.Namespace) !== 0 ||
    (symbol.getFlags() & ts.SymbolFlags.NamespaceModule) !== 0;
}

export function isObjectLiteralSymbol(symbol: ts.Symbol): boolean {
  return (symbol.getFlags() & ts.SymbolFlags.ObjectLiteral) !== 0;
}

export function isPropertySymbol(symbol: ts.Symbol): boolean {
  return (symbol.getFlags() & ts.SymbolFlags.Property) !== 0 && !isMethodSymbol(symbol);
}

export function isSetterSymbol(symbol: ts.Symbol): boolean {
  return (symbol.getFlags() & ts.SymbolFlags.SetAccessor) !== 0;
}

export function isSourceFileSymbol(symbol: ts.Symbol): boolean {
  return (symbol.getFlags() & ts.SymbolFlags.ValueModule) !== 0;
}

export function isSymbol(typeNodeOrSymbolOrDeclarationOrType: Declaration | Symbol | Type | TypeNode): typeNodeOrSymbolOrDeclarationOrType is Symbol {
  return "getName" in typeNodeOrSymbolOrDeclarationOrType;
}

export function isTypeAliasSymbol(symbol: ts.Symbol): boolean {
  return (symbol.getFlags() & ts.SymbolFlags.TypeAlias) !== 0;
}

export function isTypeLiteralSymbol(symbol: ts.Symbol): boolean {
  return (symbol.getFlags() & ts.SymbolFlags.TypeLiteral) !== 0;
}

export function isTypeParameterSymbol(symbol: ts.Symbol): boolean {
  return (symbol.getFlags() & ts.SymbolFlags.TypeParameter) !== 0;
}

export function isTypeSymbol(symbol: ts.Symbol): boolean {
  return (symbol.getFlags() & ts.SymbolFlags.Type) !== 0;
}

export function isVariableSymbol(symbol: ts.Symbol): boolean {
  return (symbol.getFlags() & ts.SymbolFlags.Variable) !== 0;
}
