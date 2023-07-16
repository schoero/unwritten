import { assert, expect, it } from "vitest";

import { EntityKind } from "unwritten:interpreter/enums/entity.js";
import { TypeKind } from "unwritten:interpreter/enums/type.js";
import {
  createClassEntity,
  createInterfaceEntity,
  createTypeAliasEntity,
  createVariableEntity
} from "unwritten:interpreter:ast/entities/index.js";
import { compile } from "unwritten:tests:utils/compile.js";
import { scope } from "unwritten:tests:utils/scope.js";
import { ts } from "unwritten:utils/template.js";


scope("Interpreter", EntityKind.Property, () => {

  {

    const testFileContent = ts`
      export type TypeAlias = {
        property: string;
      };
      export const objectLiteral = {
        property: "value"
      };
      export class Class {
        property: string;
      }
    `;

    const { ctx, exportedSymbols } = compile(testFileContent);

    const typeAliasSymbol = exportedSymbols.find(s => s.name === "TypeAlias")!;
    const objectLiteralSymbol = exportedSymbols.find(s => s.name === "objectLiteral")!;
    const classSymbol = exportedSymbols.find(s => s.name === "Class")!;

    const exportedTypeAlias = createTypeAliasEntity(ctx, typeAliasSymbol);
    const exportedObjectLiteral = createVariableEntity(ctx, objectLiteralSymbol);
    const exportedClass = createClassEntity(ctx, classSymbol);

    it("should be able to parse a property from a TypeLiteral", () => {
      assert(exportedTypeAlias.type.kind === TypeKind.TypeLiteral);
      expect(exportedTypeAlias.type.properties).toHaveLength(1);
    });

    it("should be able to parse a property from an ObjectLiteral", () => {
      assert(exportedObjectLiteral.type.kind === TypeKind.ObjectLiteral);
      expect(exportedObjectLiteral.type.properties).toHaveLength(1);
    });

    it("should be able to parse a property from a Class", () => {
      expect(exportedClass.kind).toBe(EntityKind.Class);
      expect(exportedClass.properties).toHaveLength(1);
    });

  }

  {

    const testFileContent = ts`
      export type TypeAlias = {
        /** 
         * Property description 
         * @example Property example
         */
        property: string;
      };
      export const objectLiteral = {
        /** 
         * Property description 
         * @example Property example
         */
        property: "value",
      };
      export class Class {
        /** 
         * Property description 
         * @example Property example
         */
        property: string = "test";
      }
    `;

    const { ctx, exportedSymbols } = compile(testFileContent);

    const typeAliasSymbol = exportedSymbols.find(s => s.name === "TypeAlias")!;
    const objectLiteralSymbol = exportedSymbols.find(s => s.name === "objectLiteral")!;
    const classSymbol = exportedSymbols.find(s => s.name === "Class")!;

    const exportedTypeAlias = createTypeAliasEntity(ctx, typeAliasSymbol);
    const exportedObjectLiteral = createVariableEntity(ctx, objectLiteralSymbol);
    const exportedClass = createClassEntity(ctx, classSymbol);

    it("should have a matching name", () => {
      assert(exportedTypeAlias.type.kind === TypeKind.TypeLiteral);
      expect(exportedTypeAlias.type.properties[0]!.name).toBe("property");

      assert(exportedObjectLiteral.type.kind === TypeKind.ObjectLiteral);
      expect(exportedObjectLiteral.type.properties[0]!.name).toBe("property");

      expect(exportedClass.properties[0].name).toBe("property");
    });

    it("should have a matching description", () => {
      assert(exportedTypeAlias.type.kind === TypeKind.TypeLiteral);
      expect(exportedTypeAlias.type.properties[0]!.description).toBe("Property description");

      assert(exportedObjectLiteral.type.kind === TypeKind.ObjectLiteral);
      expect(exportedObjectLiteral.type.properties[0]!.description).toBe("Property description");

      expect(exportedClass.properties[0].description).toBe("Property description");
    });

    it("should have a matching example", () => {
      assert(exportedTypeAlias.type.kind === TypeKind.TypeLiteral);
      expect(exportedTypeAlias.type.properties[0]!.example).toBe("Property example");

      assert(exportedObjectLiteral.type.kind === TypeKind.ObjectLiteral);
      expect(exportedObjectLiteral.type.properties[0]!.example).toBe("Property example");

      expect(exportedClass.properties[0].example).toBe("Property example");
    });

    it("should have a matching type", () => {
      assert(exportedTypeAlias.type.kind === TypeKind.TypeLiteral);
      expect(exportedTypeAlias.type.properties[0]!.type.kind).toBe(TypeKind.String);

      assert(exportedObjectLiteral.type.kind === TypeKind.ObjectLiteral);
      expect(exportedObjectLiteral.type.properties[0]!.type.kind).toBe(TypeKind.String);

      expect(exportedClass.properties[0].type.kind).toBe(TypeKind.String);
    });

  }

  {

    const testFileContent = ts`
      export type TypeAlias = {
        optional?: string;
        required: string;
      };
      export class Class {
        optional?: string;
        required: string;
      }
    `;

    const { ctx, exportedSymbols } = compile(testFileContent);

    const typeAliasSymbol = exportedSymbols.find(s => s.name === "TypeAlias")!;
    const classSymbol = exportedSymbols.find(s => s.name === "Class")!;

    const exportedTypeAlias = createTypeAliasEntity(ctx, typeAliasSymbol);
    const exportedClass = createClassEntity(ctx, classSymbol);

    it("should correctly flag optional properties", () => {
      assert(exportedTypeAlias.type.kind === TypeKind.TypeLiteral);
      expect(exportedTypeAlias.type.properties[0].optional).toBe(true);
      expect(exportedTypeAlias.type.properties[1].optional).toBe(false);
      expect(exportedClass.properties[0].optional).toBe(true);
      expect(exportedClass.properties[1].optional).toBe(false);
    });

  }

  {

    const testFileContent = ts`
      export type TypeAlias = {
        readonly property: undefined;
      };
      export class Class {
        public publicProperty: undefined;
        private privateProperty: undefined;
        static staticProperty: undefined;
        readonly readonlyProperty: undefined;
        accessor accessorProperty: undefined;
        #nativePrivateProperty: undefined;
      }
      export abstract class AbstractClass {
        abstract abstractProperty: undefined;
      }
      class BaseClass {
        property: undefined;
      }
      export class ExtendedClass extends BaseClass {
        override property: undefined;
      }
    `;

    const { ctx, exportedSymbols } = compile(testFileContent);

    const typeAliasSymbol = exportedSymbols.find(s => s.name === "TypeAlias")!;
    const classSymbol = exportedSymbols.find(s => s.name === "Class")!;
    const abstractClassSymbol = exportedSymbols.find(s => s.name === "AbstractClass")!;
    const extendedClassSymbol = exportedSymbols.find(s => s.name === "ExtendedClass")!;

    const exportedClass = createClassEntity(ctx, classSymbol);
    const exportedTypeAlias = createTypeAliasEntity(ctx, typeAliasSymbol);
    const exportedAbstractClass = createClassEntity(ctx, abstractClassSymbol);
    const exportedExtendedClass = createClassEntity(ctx, extendedClassSymbol);

    it("should support all relevant modifiers", () => {

      assert(exportedTypeAlias.type.kind === TypeKind.TypeLiteral);

      expect(exportedTypeAlias.type.properties[0]!.modifiers).toContain("readonly");

      expect(exportedClass.properties.find(property => property.name === "publicProperty")!.modifiers).toContain("public");
      expect(exportedClass.properties.find(property => property.name === "privateProperty")!.modifiers).toContain("private");
      expect(exportedClass.properties.find(property => property.name === "staticProperty")!.modifiers).toContain("static");
      expect(exportedClass.properties.find(property => property.name === "readonlyProperty")!.modifiers).toContain("readonly");
      expect(exportedClass.properties.find(property => property.name === "accessorProperty")!.modifiers).toContain("accessor");
      expect(exportedClass.properties.find(property => property.name === "#nativePrivateProperty")!.modifiers).toContain("nativePrivate");

      expect(exportedAbstractClass.properties[0].modifiers).toContain("abstract");

      expect(exportedExtendedClass.properties[0].modifiers).toContain("override");

    });

  }

  {

    const testFileContent = ts`
      type Test = string;
      interface Base<T extends string> {
        prop: T;
        test: Test;
      }
      export interface Interface extends Base<"hello"> {
      }
    `;

    const { ctx, exportedSymbols } = compile(testFileContent);

    const exportedInterfaceSymbol = exportedSymbols.find(s => s.name === "Interface")!;
    const exportedInterface = createInterfaceEntity(ctx, exportedInterfaceSymbol);

    it("should resolve instantiated types", () => {
      assert(exportedInterface.heritage![0]!.instanceType.kind === TypeKind.Object);
      expect(exportedInterface.heritage![0]!.instanceType.properties[0]!.type.kind).toBe(TypeKind.StringLiteral);
    });

    it("should not resolve not instantiated types", () => {
      assert(exportedInterface.heritage![0]!.instanceType.kind === TypeKind.Object);
      expect(exportedInterface.heritage![0]!.instanceType.properties[1]!.type.kind).toBe(TypeKind.TypeReference);
    });

  }

});
