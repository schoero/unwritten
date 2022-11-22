import ts, {
  ArrayTypeNode,
  BigIntLiteralType,
  Declaration,
  FunctionLikeDeclaration,
  GenericType,
  InterfaceType,
  IntersectionType,
  LiteralType,
  NamedTupleMember,
  NumberLiteralType,
  ObjectType,
  StringLiteralType,
  Symbol,
  TupleType,
  TupleTypeNode,
  TupleTypeReference,
  Type,
  TypeNode,
  TypeParameter,
  TypeReference,
  TypeReferenceNode,
  UnionType
} from "typescript";


export function isSymbol(typeNodeOrSymbolOrDeclarationOrType: Declaration | Symbol | Type | TypeNode): typeNodeOrSymbolOrDeclarationOrType is Symbol {
  return "getName" in typeNodeOrSymbolOrDeclarationOrType;
}

export function isDeclaration(typeNodeOrSymbolOrDeclarationOrType: Declaration | Symbol | Type | TypeNode): typeNodeOrSymbolOrDeclarationOrType is Declaration {
  return "getText" in typeNodeOrSymbolOrDeclarationOrType && !isTypeNode(typeNodeOrSymbolOrDeclarationOrType);
}

export function isType(typeNodeOrSymbolOrDeclarationOrType: Declaration | Symbol | Type | TypeNode): typeNodeOrSymbolOrDeclarationOrType is Type {
  return !isSymbol(typeNodeOrSymbolOrDeclarationOrType) && !isDeclaration(typeNodeOrSymbolOrDeclarationOrType) && !isTypeNode(typeNodeOrSymbolOrDeclarationOrType);
}

export function isTypeNode(typeNodeOrSymbolOrDeclarationOrType: Declaration | Symbol | Type | TypeNode): typeNodeOrSymbolOrDeclarationOrType is TypeNode {
  return "kind" in typeNodeOrSymbolOrDeclarationOrType && ts.isTypeNode(typeNodeOrSymbolOrDeclarationOrType);
}


//-- Symbols

export function isFunctionSymbol(symbol: ts.Symbol): boolean {
  return (symbol.getFlags() & ts.SymbolFlags.Function) !== 0;
}

export function isConstructorSymbol(symbol: ts.Symbol): boolean {
  return (symbol.getFlags() & ts.SymbolFlags.Constructor) !== 0;
}

export function isMethodSymbol(symbol: ts.Symbol): boolean {
  return (symbol.getFlags() & ts.SymbolFlags.Method) !== 0;
}

export function isSetterSymbol(symbol: ts.Symbol): boolean {
  return (symbol.getFlags() & ts.SymbolFlags.SetAccessor) !== 0;
}

export function isGetterSymbol(symbol: ts.Symbol): boolean {
  return (symbol.getFlags() & ts.SymbolFlags.GetAccessor) !== 0;
}

export function isFunctionLikeSymbol(symbol: ts.Symbol): boolean {
  return isFunctionSymbol(symbol) || isConstructorSymbol(symbol) || isMethodSymbol(symbol) || isSetterSymbol(symbol);
}

export function isClassSymbol(symbol: ts.Symbol): boolean {
  return (symbol.getFlags() & ts.SymbolFlags.Class) !== 0;
}

export function isVariableSymbol(symbol: ts.Symbol): boolean {
  return (symbol.getFlags() & ts.SymbolFlags.Variable) !== 0;
}

export function isTypeSymbol(symbol: ts.Symbol): boolean {
  return (symbol.getFlags() & ts.SymbolFlags.Type) !== 0;
}

export function isTypeParameterSymbol(symbol: ts.Symbol): boolean {
  return (symbol.getFlags() & ts.SymbolFlags.TypeParameter) !== 0;
}

export function isInterfaceSymbol(symbol: ts.Symbol): boolean {
  return (symbol.getFlags() & ts.SymbolFlags.Interface) !== 0;
}

export function isEnumSymbol(symbol: ts.Symbol): boolean {
  return (symbol.getFlags() & ts.SymbolFlags.Enum) !== 0;
}

export function isTypeLiteralSymbol(symbol: ts.Symbol): boolean {
  return (symbol.getFlags() & ts.SymbolFlags.TypeLiteral) !== 0;
}

export function isTypeAliasSymbol(symbol: ts.Symbol): boolean {
  return (symbol.getFlags() & ts.SymbolFlags.TypeAlias) !== 0;
}

export function isPropertySymbol(symbol: ts.Symbol): boolean {
  return (symbol.getFlags() & ts.SymbolFlags.Property) !== 0;
}

export function isEnumMemberSymbol(symbol: ts.Symbol): boolean {
  return (symbol.getFlags() & ts.SymbolFlags.EnumMember) !== 0;
}

export function isNamespaceSymbol(symbol: ts.Symbol): boolean {
  return (symbol.getFlags() & ts.SymbolFlags.Namespace) !== 0 || (symbol.getFlags() & ts.SymbolFlags.NamespaceModule) !== 0;
}

export function isModuleSymbol(symbol: ts.Symbol): boolean {
  return (symbol.getFlags() & ts.SymbolFlags.Module) !== 0;
}

export function isSourceFileSymbol(symbol: ts.Symbol): boolean {
  return (symbol.getFlags() & ts.SymbolFlags.ValueModule) !== 0;
}

export function isObjectLiteralSymbol(symbol: ts.Symbol): boolean {
  return (symbol.getFlags() & ts.SymbolFlags.ObjectLiteral) !== 0;
}

export function isAliasedSymbol(symbol: ts.Symbol): boolean {
  return (symbol.getFlags() & ts.SymbolFlags.Alias) !== 0;
}

export function isAliasExcludesSymbol(symbol: ts.Symbol): boolean {
  return (symbol.getFlags() & ts.SymbolFlags.AliasExcludes) !== 0;
}


//-- Declarations

export function isFunctionDeclaration(declaration: Declaration): declaration is ts.FunctionDeclaration {
  return ts.isFunctionDeclaration(declaration);
}

export function isFunctionLikeDeclaration(declaration: Declaration): declaration is FunctionLikeDeclaration {
  return isFunctionDeclaration(declaration) ||
    isMethodDeclaration(declaration) ||
    isConstructorDeclaration(declaration) ||
    isGetterDeclaration(declaration) ||
    isSetterDeclaration(declaration) ||
    isArrowFunctionDeclaration(declaration) ||
    ts.isFunctionExpression(declaration);
}

export function isClassDeclaration(declaration: Declaration): declaration is ts.ClassDeclaration {
  return ts.isClassDeclaration(declaration);
}

export function isVariableDeclaration(declaration: Declaration): declaration is ts.VariableDeclaration {
  return ts.isVariableDeclaration(declaration);
}

export function isPropertySignature(declaration: Declaration): declaration is ts.PropertySignature {
  return ts.isPropertySignature(declaration);
}

export function isTypeAliasDeclaration(declaration: Declaration): declaration is ts.TypeAliasDeclaration {
  return ts.isTypeAliasDeclaration(declaration);
}

export function isTypeParameterDeclaration(declaration: Declaration): declaration is ts.TypeParameterDeclaration {
  return ts.isTypeParameterDeclaration(declaration);
}

export function isInterfaceDeclaration(declaration: Declaration): declaration is ts.InterfaceDeclaration {
  return ts.isInterfaceDeclaration(declaration);
}

export function isEnumDeclaration(declaration: Declaration): declaration is ts.EnumDeclaration {
  return ts.isEnumDeclaration(declaration);
}

export function isTypeLiteralDeclaration(declaration: Declaration): declaration is ts.TypeLiteralNode {
  return ts.isTypeLiteralNode(declaration);
}

export function isConstructorDeclaration(declaration: Declaration): declaration is ts.ConstructorDeclaration {
  return ts.isConstructorDeclaration(declaration);
}

export function isMethodDeclaration(declaration: Declaration): declaration is ts.MethodDeclaration {
  return ts.isMethodDeclaration(declaration);
}

export function isSetterDeclaration(declaration: Declaration): declaration is ts.SetAccessorDeclaration {
  return ts.isSetAccessorDeclaration(declaration);
}

export function isGetterDeclaration(declaration: Declaration): declaration is ts.GetAccessorDeclaration {
  return ts.isGetAccessorDeclaration(declaration);
}

export function isPropertyDeclaration(declaration: Declaration): declaration is ts.PropertyDeclaration {
  return ts.isPropertyDeclaration(declaration);
}

export function isPropertyAssignment(declaration: Declaration): declaration is ts.PropertyAssignment {
  return ts.isPropertyAssignment(declaration);
}

export function isEnumMemberDeclaration(declaration: Declaration): declaration is ts.EnumMember {
  return ts.isEnumMember(declaration);
}

export function isTypeElement(declaration: Declaration): declaration is ts.TypeElement {
  return ts.isTypeElement(declaration);
}

export function isArrowFunctionDeclaration(declaration: Declaration): declaration is ts.ArrowFunction {
  return ts.isArrowFunction(declaration);
}

export function isObjectTypeDeclaration(declaration: ts.Declaration): declaration is ts.ObjectTypeDeclaration {
  return ts.isClassDeclaration(declaration) || isInterfaceDeclaration(declaration) || ts.isTypeLiteralNode(declaration);
}

export function isNamespaceDeclaration(declaration: ts.Declaration): declaration is ts.NamespaceDeclaration {
  return ts.isNamespaceExport(declaration);
}

export function isModuleDeclaration(declaration: ts.Declaration): declaration is ts.ModuleDeclaration {
  return ts.isModuleDeclaration(declaration);
}

export function isSourceFileDeclaration(declaration: ts.Declaration): declaration is ts.SourceFile {
  return ts.isSourceFile(declaration);
}

export function isParameterDeclaration(declaration: ts.Declaration): declaration is ts.ParameterDeclaration {
  return ts.isParameter(declaration);
}

export function isObjectLiteralExpression(declaration: ts.Declaration): declaration is ts.ObjectLiteralExpression {
  return ts.isObjectLiteralExpression(declaration);
}


//-- Types


//-- Types

export function isUnionType(type: Type): type is UnionType {
  return (type.flags & ts.TypeFlags.Union) !== 0;
}

export function isEnumType(type: Type): boolean {
  return (type.flags & ts.TypeFlags.Enum) !== 0;
}

export function isIntersectionType(type: Type): type is IntersectionType {
  return (type.flags & ts.TypeFlags.Intersection) !== 0;
}

export function isLiteralType(type: Type): type is LiteralType {
  return (type.flags & (ts.TypeFlags.StringOrNumberLiteral | ts.TypeFlags.BigIntLiteral | ts.TypeFlags.BooleanLiteral)) !== 0;
}

export function isNullType(type: Type) {
  return (type.flags & ts.TypeFlags.Null) !== 0;
}

export function isUndefinedType(type: Type) {
  return (type.flags & ts.TypeFlags.Undefined) !== 0;
}

export function isNeverType(type: Type) {
  return (type.flags & ts.TypeFlags.Never) !== 0;
}

export function isUnknownType(type: Type) {
  return (type.flags & ts.TypeFlags.Unknown) !== 0;
}

export function isVoidType(type: Type) {
  return (type.flags & ts.TypeFlags.Void) !== 0;
}

export function isAnyType(type: Type) {
  return (type.flags & ts.TypeFlags.Any) !== 0;
}

export function isNumberType(type: Type): boolean {
  return (type.flags & ts.TypeFlags.Number) !== 0;
}

export function isNumberLiteralType(type: Type): type is NumberLiteralType {
  return (type.flags & ts.TypeFlags.NumberLiteral) !== 0;
}

export function isBigIntType(type: Type): boolean {
  return (type.flags & ts.TypeFlags.BigInt) !== 0;
}

export function isBigIntLiteralType(type: Type): type is BigIntLiteralType {
  return (type.flags & ts.TypeFlags.BigIntLiteral) !== 0;
}

export function isStringType(type: Type): boolean {
  return (type.flags & ts.TypeFlags.String) !== 0;
}

export function isStringLiteralType(type: Type): type is StringLiteralType {
  return (type.flags & ts.TypeFlags.StringLiteral) !== 0;
}

export function isBooleanType(type: Type): boolean {
  return (type.flags & ts.TypeFlags.Boolean) !== 0;
}

export function isBooleanLiteralType(type: Type): boolean {
  return (type.flags & ts.TypeFlags.BooleanLiteral) !== 0;
}

export function isObjectType(type: Type): type is ObjectType {
  return (type.flags & ts.TypeFlags.Object) !== 0;
}

export function isTypeLiteralType(type: Type): type is ObjectType {
  return isObjectType(type) && type.symbol.getName() === "__type";
}

export function isObjectLiteralType(type: Type): type is ObjectType {
  return isObjectType(type) && type.symbol.getName() === "__object";
}

export function isFunctionLikeType(type: Type): boolean {
  return isObjectType(type) &&
    type.getCallSignatures().length > 0 &&
    type.getConstructSignatures().length === 0 &&
    type.getProperties().length === 0;
}

export function isClassType(type: Type): type is InterfaceType {
  return type.isClass();
}

export function isTupleType(type: Type): type is TupleType {
  return isObjectType(type) && (type.objectFlags & ts.ObjectFlags.Tuple) !== 0;
}

export function isTupleTypeNode(typeNode: TypeNode): typeNode is TupleTypeNode {
  return ts.isTupleTypeNode(typeNode);
}

export function isArrayTypeNode(typeNode: TypeNode): typeNode is ArrayTypeNode {
  return ts.isArrayTypeNode(typeNode);
}

export function isArrayTypeReferenceTypeNode(typeNode: TypeNode): typeNode is TypeReferenceNode {
  return isTypeReferenceNode(typeNode) && typeNode.typeName.getText() === "Array" && typeNode.typeArguments?.length === 1;
}

export function isArrayTypeReferenceType(type: Type): type is TypeReference {
  return isTypeReferenceType(type) && type.target.symbol.getName() === "Array" && type.target.typeParameters?.length === 1;
}
export function isNamedTupleMember(member: NamedTupleMember | TypeNode): member is NamedTupleMember {
  return ts.isNamedTupleMember(member);
}

export function isAnonymousType(type: Type) {
  return isObjectType(type) && (type.objectFlags & ts.ObjectFlags.Anonymous) !== 0;
}

export function isTupleTypeReferenceType(type: Type): type is TupleTypeReference {
  return isTypeReferenceType(type) && isTupleType(type.target);
}

export function isTypeReferenceType(type: Type): type is TypeReference {
  return isObjectType(type) && (type.objectFlags & ts.ObjectFlags.Reference) !== 0;
}

export function isTypeReferenceNode(typeNode: TypeNode): typeNode is TypeReferenceNode {
  return ts.isTypeReferenceNode(typeNode);
}

export function isGenericType(type: Type): type is GenericType {
  return isObjectType(type) &&
    (type.objectFlags & ts.ObjectFlags.ClassOrInterface) !== 0 &&
    (type.objectFlags & ts.ObjectFlags.Reference) !== 0;
}

export function isClassOrInterfaceType(type: Type): type is InterfaceType {
  return isObjectType(type) &&
    (type.objectFlags & ts.ObjectFlags.ClassOrInterface) !== 0;
}

export function isInterfaceType(type: Type): type is InterfaceType {
  return isObjectType(type) &&
    (type.objectFlags & ts.ObjectFlags.Interface) !== 0;
}

export function isThisType(type: Type): boolean {
  // @ts-expect-error - internal API
  return type.isThisType === true;
}

export function isThisTypeNode(typeNode: TypeNode): boolean {
  return ts.isThisTypeNode(typeNode);
}

export function isTypeParameterType(type: Type): type is TypeParameter {
  return (type.flags & ts.TypeFlags.TypeParameter) !== 0;
}

export function isPrimitiveType(type: Type): boolean {
  return isNumberType(type) ||
    isStringType(type) ||
    isBooleanType(type) ||
    isBigIntType(type) ||
    isNullType(type) ||
    isUndefinedType(type) ||
    isVoidType(type) ||
    isNeverType(type) ||
    isAnyType(type);
}

export function isInstanceType(type: Type): type is TypeReference {
  return isObjectType(type) && (type.objectFlags & ts.ObjectFlags.Reference) !== 0 && (type.objectFlags & ts.ObjectFlags.Class) !== 0;
}
