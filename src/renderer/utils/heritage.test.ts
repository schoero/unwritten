import { describe, expect, it } from "vitest";

import { createClassEntity, createInterfaceEntity } from "unwritten:interpreter/ast/entities/index";
import { TypeKind } from "unwritten:interpreter/enums/type";
import {
  extendClassEntityConstructorsWithHeritage,
  extendClassEntityEntitiesWithHeritage,
  extendInterfaceEntityPropertiesWithHeritage,
  extendInterfaceEntitySignaturesWithHeritage
} from "unwritten:renderer:utils/heritage";
import { compile } from "unwritten:tests:utils/compile";
import { scope } from "unwritten:tests:utils/scope";
import { assert } from "unwritten:utils/general";
import { ts } from "unwritten:utils/template";

import type { InterfaceEntity } from "unwritten:interpreter:type-definitions/entities";


scope("Renderer", "utils", () => {

  describe("interface heritage", () => {

    {

      const testFileContent = ts`
        interface InterfaceA {
          propA: string;
          methodA(): void;
        }
        export interface InterfaceB extends InterfaceA {
          propB: string;
          methodB(): void;
        }
      `;

      const { ctx: compilerContext, exportedSymbols } = compile(testFileContent);

      const symbol = exportedSymbols.find(s => s.name === "InterfaceB")!;
      const interfaceEntity = createInterfaceEntity(compilerContext, symbol);

      it("should inherit properties from parent interface", () => {
        const extendedInterfaceProperties = extendInterfaceEntityPropertiesWithHeritage(interfaceEntity as InterfaceEntity);
        expect(extendedInterfaceProperties).toHaveLength(2);
        expect(extendedInterfaceProperties[0].name).toBe("propA");
        expect(extendedInterfaceProperties[1].name).toBe("propB");
      });

      it("should inherit signatures from parent interface", () => {
        const extendedInterfaceProperties = extendInterfaceEntitySignaturesWithHeritage(interfaceEntity as InterfaceEntity, "methodSignatures");
        expect(extendedInterfaceProperties).toHaveLength(2);
        expect(extendedInterfaceProperties[0].name).toBe("methodA");
        expect(extendedInterfaceProperties[1].name).toBe("methodB");
      });

    }

    {

      const testFileContent = ts`
        interface InterfaceA {
          prop: string | number;
          method(): string | number ;
        }
        export interface InterfaceB extends InterfaceA {
          prop: string;
          method(): string;
        }
      `;

      const { ctx: compilerContext, exportedSymbols } = compile(testFileContent);

      const symbol = exportedSymbols.find(s => s.name === "InterfaceB")!;
      const interfaceEntity = createInterfaceEntity(compilerContext, symbol);

      it("should override properties from parent interface", () => {
        const extendedInterfaceProperties = extendInterfaceEntityPropertiesWithHeritage(interfaceEntity as InterfaceEntity);
        expect(extendedInterfaceProperties).toHaveLength(1);
        expect(extendedInterfaceProperties[0].name).toBe("prop");
        expect(extendedInterfaceProperties[0].type.kind).toBe(TypeKind.String);
      });

      it("should override signatures from parent interface", () => {
        const extendedInterfaceProperties = extendInterfaceEntitySignaturesWithHeritage(interfaceEntity as InterfaceEntity, "methodSignatures");
        expect(extendedInterfaceProperties).toHaveLength(1);
        expect(extendedInterfaceProperties[0].name).toBe("method");
        expect(extendedInterfaceProperties[0].returnType.kind).toBe(TypeKind.String);
      });

    }

  });

  describe("class heritage", () => {

    {

      const testFileContent = ts`
        class BaseClass {
          public instanceProperty: string | undefined;
          public static staticProperty: string | undefined;
        }

        export class Class extends BaseClass {
          declare public instanceProperty: undefined;
          declare public static staticProperty: undefined;
        }
      `;

      const { ctx: compilerContext, exportedSymbols } = compile(testFileContent);

      const symbol = exportedSymbols.find(s => s.name === "Class")!;
      const classEntity = createClassEntity(compilerContext, symbol);

      const extendedClassProperties = extendClassEntityEntitiesWithHeritage(classEntity, "properties");

      it("should inherit properties from parent interface", () => {

        expect(extendedClassProperties).toHaveLength(2);

        expect(extendedClassProperties[0].name).toBe("instanceProperty");
        expect(extendedClassProperties[0].type.kind).toBe(TypeKind.Undefined);
        expect(extendedClassProperties[0].modifiers).not.toContain("static");

        expect(extendedClassProperties[1].name).toBe("staticProperty");
        expect(extendedClassProperties[1].type.kind).toBe(TypeKind.Undefined);
        expect(extendedClassProperties[1].modifiers).toContain("static");

      });

    }

    {

      const testFileContent = ts`
        class BaseClass {
          constructor(param: string) {}
        }
        export class Class extends BaseClass {
        }
      `;

      const { ctx: compilerContext, exportedSymbols } = compile(testFileContent);

      const symbol = exportedSymbols.find(s => s.name === "Class")!;
      const classEntity = createClassEntity(compilerContext, symbol);

      const extendedClassConstructor = extendClassEntityConstructorsWithHeritage(classEntity);

      it("should inherit the constructor from parent class", () => {
        assert(extendedClassConstructor);
        expect(extendedClassConstructor.signatures).toHaveLength(1);
        expect(extendedClassConstructor.signatures[0].parameters).toHaveLength(1);
      });

    }

    {

      const testFileContent = ts`
        class BaseClass {
          constructor(param: string | number) {
          }
        }
        export class Class extends BaseClass {
          constructor(param: string) {
            super(param);
          }
        }
      `;

      const { ctx: compilerContext, exportedSymbols } = compile(testFileContent);

      const symbol = exportedSymbols.find(s => s.name === "Class")!;
      const classEntity = createClassEntity(compilerContext, symbol);

      const extendedClassConstructor = extendClassEntityConstructorsWithHeritage(classEntity);

      it("should be able to override the parent constructor", () => {

        assert(extendedClassConstructor);
        expect(extendedClassConstructor.signatures).toHaveLength(1);

        assert(extendedClassConstructor.signatures[0].parameters);

        expect(extendedClassConstructor.signatures[0].parameters).toHaveLength(1);
        expect(extendedClassConstructor.signatures[0].parameters[0].type.kind).toBe(TypeKind.String);

      });

    }

  });

});
