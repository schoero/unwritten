import { expect, it } from "vitest";

import { createClassEntity, createTypeAliasEntity, createVariableEntity } from "quickdoks:compiler:entities";
import { EntityKind } from "quickdoks:compiler:enums/entities.js";
import { TypeKind } from "quickdoks:compiler:enums/types.js";
import { compile } from "quickdoks:tests:utils/compile.js";
import { scope } from "quickdoks:tests:utils/scope.js";
import { ts } from "quickdoks:tests:utils/template.js";

import type { TypeLiteralType } from "quickdoks:compiler:type-definitions/types.d.js";


scope("Compiler", EntityKind.Property, () => {

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

    const { exportedSymbols, ctx } = compile(testFileContent);

    const typeAliasSymbol = exportedSymbols.find(s => s.name === "TypeAlias")!;
    const objectLiteralSymbol = exportedSymbols.find(s => s.name === "objectLiteral")!;
    const classSymbol = exportedSymbols.find(s => s.name === "Class")!;

    const exportedTypeAlias = createTypeAliasEntity(ctx, typeAliasSymbol);
    const exportedObjectLiteral = createVariableEntity(ctx, objectLiteralSymbol);
    const exportedClass = createClassEntity(ctx, classSymbol);

    it("should be able to parse a property from a TypeLiteral", () => {
      expect(exportedTypeAlias.kind).to.equal(EntityKind.TypeAlias);
      expect(exportedTypeAlias.type.kind).to.equal(TypeKind.TypeLiteral);
      expect((exportedTypeAlias.type as TypeLiteralType).properties).to.have.lengthOf(1);
    });

    it("should be able to parse a property from an ObjectLiteral", () => {
      expect(exportedObjectLiteral.kind).to.equal(EntityKind.Variable);
      expect(exportedObjectLiteral.type.kind).to.equal(TypeKind.ObjectLiteral);
      expect((exportedObjectLiteral.type as TypeLiteralType).properties).to.have.lengthOf(1);
    });

    it("should be able to parse a property from a Class", () => {
      expect(exportedClass.kind).to.equal(EntityKind.Class);
      expect(exportedClass.properties).to.have.lengthOf(1);
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
        property: "value"
      };
      export class Class {
        /** 
         * Property description 
         * @example Property example
         */
        property: string;
      }
    `;

    const { exportedSymbols, ctx } = compile(testFileContent);

    const typeAliasSymbol = exportedSymbols.find(s => s.name === "TypeAlias")!;
    const objectLiteralSymbol = exportedSymbols.find(s => s.name === "objectLiteral")!;
    const classSymbol = exportedSymbols.find(s => s.name === "Class")!;

    const exportedTypeAlias = createTypeAliasEntity(ctx, typeAliasSymbol);
    const exportedObjectLiteral = createVariableEntity(ctx, objectLiteralSymbol);
    const exportedClass = createClassEntity(ctx, classSymbol);

    it("should have a matching name", () => {
      expect((exportedTypeAlias.type as TypeLiteralType).properties[0]!.name).to.equal("property");
      expect((exportedObjectLiteral.type as TypeLiteralType).properties[0]!.name).to.equal("property");
      expect(exportedClass.properties[0].name).to.equal("property");
    });

    it("should have a matching description", () => {
      expect((exportedTypeAlias.type as TypeLiteralType).properties[0]!.description).to.equal("Property description");
      expect((exportedObjectLiteral.type as TypeLiteralType).properties[0]!.description).to.equal("Property description");
      expect(exportedClass.properties[0].description).to.equal("Property description");
    });

    it("should have a matching example", () => {
      expect((exportedTypeAlias.type as TypeLiteralType).properties[0]!.example).to.equal("Property example");
      expect((exportedObjectLiteral.type as TypeLiteralType).properties[0]!.example).to.equal("Property example");
      expect(exportedClass.properties[0].example).to.equal("Property example");
    });

    it("should have a matching type", () => {
      expect((exportedTypeAlias.type as TypeLiteralType).properties[0]!.type.kind).to.equal(TypeKind.String);
      expect((exportedObjectLiteral.type as TypeLiteralType).properties[0]!.type.kind).to.equal(TypeKind.String);
      expect(exportedClass.properties[0].type.kind).to.equal(TypeKind.String);
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

    const { exportedSymbols, ctx } = compile(testFileContent);

    const typeAliasSymbol = exportedSymbols.find(s => s.name === "TypeAlias")!;
    const classSymbol = exportedSymbols.find(s => s.name === "Class")!;

    const exportedTypeAlias = createTypeAliasEntity(ctx, typeAliasSymbol);
    const exportedClass = createClassEntity(ctx, classSymbol);

    it("should correctly flag optional properties", () => {
      expect((exportedTypeAlias.type as TypeLiteralType).properties[0].optional).to.equal(true);
      expect((exportedTypeAlias.type as TypeLiteralType).properties[1].optional).to.equal(false);
      expect(exportedClass.properties[0].optional).to.equal(true);
      expect(exportedClass.properties[1].optional).to.equal(false);
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

    const { exportedSymbols, ctx } = compile(testFileContent);

    const typeAliasSymbol = exportedSymbols.find(s => s.name === "TypeAlias")!;
    const classSymbol = exportedSymbols.find(s => s.name === "Class")!;
    const abstractClassSymbol = exportedSymbols.find(s => s.name === "AbstractClass")!;
    const extendedClassSymbol = exportedSymbols.find(s => s.name === "ExtendedClass")!;

    const exportedClass = createClassEntity(ctx, classSymbol);
    const exportedTypeAlias = createTypeAliasEntity(ctx, typeAliasSymbol);
    const exportedAbstractClass = createClassEntity(ctx, abstractClassSymbol);
    const exportedExtendedClass = createClassEntity(ctx, extendedClassSymbol);

    it("should support all relevant modifiers", () => {

      expect((exportedTypeAlias.type as TypeLiteralType).properties[0]!.modifiers).to.include("readonly");

      expect(exportedClass.properties.find(property => property.name === "publicProperty")!.modifiers).to.include("public");
      expect(exportedClass.properties.find(property => property.name === "privateProperty")!.modifiers).to.include("private");
      expect(exportedClass.properties.find(property => property.name === "staticProperty")!.modifiers).to.include("static");
      expect(exportedClass.properties.find(property => property.name === "readonlyProperty")!.modifiers).to.include("readonly");
      expect(exportedClass.properties.find(property => property.name === "accessorProperty")!.modifiers).to.include("accessor");
      expect(exportedClass.properties.find(property => property.name === "#nativePrivateProperty")!.modifiers).to.include("nativePrivate");

      expect(exportedAbstractClass.properties[0].modifiers).to.include("abstract");

      expect(exportedExtendedClass.properties[0].modifiers).to.include("override");

    });

  }

});
