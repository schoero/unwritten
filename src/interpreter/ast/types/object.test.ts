import { expect, it } from "vitest";

import { createObjectLikeType } from "unwritten:interpreter:ast/types/index";
import { isObjectType } from "unwritten:interpreter:typeguards/types";
import { createTypeAliasEntity } from "unwritten:interpreter/ast/entities/index";
import { TypeKind } from "unwritten:interpreter/enums/type";
import { compile } from "unwritten:tests:utils/compile";
import { scope } from "unwritten:tests:utils/scope";
import { assert } from "unwritten:utils/general";
import { ts } from "unwritten:utils/template";


scope("Interpreter", TypeKind.Object, () => {

  {

    const testFileContent = ts`
      export type TypeLiteralType = { [key: string]: string; };
      export type ObjectLiteralType = { [key: string]: string; };
      export type ObjectType = { [key: string]: string; };
      export type InterfaceType = { [key: string]: string; };
      export type ClassType = { [key: string]: string; };
    `;

    const { ctx, exportedSymbols } = compile(testFileContent);

    const typeLiteralSymbol = exportedSymbols.find(s => s.name === "TypeLiteralType")!;
    const objectLiteralSymbol = exportedSymbols.find(s => s.name === "ObjectLiteralType")!;
    const objectTypeSymbol = exportedSymbols.find(s => s.name === "ObjectType")!;
    const interfaceTypeSymbol = exportedSymbols.find(s => s.name === "InterfaceType")!;
    const classTypeSymbol = exportedSymbols.find(s => s.name === "ClassType")!;

    const typeLiteralType = ctx.checker.getTypeAtLocation(typeLiteralSymbol.declarations![0]);
    const objectLiteralType = ctx.checker.getTypeAtLocation(objectLiteralSymbol.declarations![0]);
    const objectType = ctx.checker.getTypeAtLocation(objectTypeSymbol.declarations![0]);
    const interfaceType = ctx.checker.getTypeAtLocation(interfaceTypeSymbol.declarations![0]);
    const classType = ctx.checker.getTypeAtLocation(classTypeSymbol.declarations![0]);

    assert(isObjectType(ctx, typeLiteralType), "typeLiteralType is not an object type");
    assert(isObjectType(ctx, objectLiteralType), "objectLiteralType is not an object type");
    assert(isObjectType(ctx, objectType), "objectType is not an object type");
    assert(isObjectType(ctx, interfaceType), "interfaceType is not an object type");
    assert(isObjectType(ctx, classType), "classType is not an object type");


    it("should be able to create object types", () => {
      expect(createObjectLikeType(ctx, typeLiteralType, TypeKind.TypeLiteral).kind).toBe(TypeKind.TypeLiteral);
      expect(createObjectLikeType(ctx, objectLiteralType, TypeKind.ObjectLiteral).kind).toBe(TypeKind.ObjectLiteral);
      expect(createObjectLikeType(ctx, objectType, TypeKind.Object).kind).toBe(TypeKind.Object);
      expect(createObjectLikeType(ctx, interfaceType, TypeKind.Interface).kind).toBe(TypeKind.Interface);
      expect(createObjectLikeType(ctx, classType, TypeKind.Class).kind).toBe(TypeKind.Class);
    });

  }

  {

    const testFileContent = ts`
      type Test = string;
      export type TypeLiteral = {
        prop: string;
        ref: Test;
      };
    `;

    const { ctx, exportedSymbols } = compile(testFileContent);

    const exportedTypeAliasSymbol = exportedSymbols.find(s => s.name === "TypeLiteral")!;
    const exportedTypeAlias = createTypeAliasEntity(ctx, exportedTypeAliasSymbol);

    it("should resolve types correctly in object types", () => {
      assert(exportedTypeAlias.type.kind === TypeKind.TypeLiteral);
      expect(exportedTypeAlias.type.properties).toHaveLength(2);
      expect(exportedTypeAlias.type.properties[0].type.kind).toBe(TypeKind.String);
      expect(exportedTypeAlias.type.properties[1].type.kind).toBe(TypeKind.TypeReference);
    });

  }

});
