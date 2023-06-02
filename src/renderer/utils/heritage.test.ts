import { describe, expect, it } from "vitest";

import { createClassEntity, createInterfaceEntity } from "unwritten:interpreter/ast/entities/index.js";
import { TypeKind } from "unwritten:interpreter:enums/types.js";
import {
  extendClassEntityConstructorsWithHeritage,
  extendClassEntityEntitiesWithHeritage,
  extendInterfaceEntityPropertiesWithHeritage,
  extendInterfaceEntitySignaturesWithHeritage
} from "unwritten:renderer:utils/heritage.js";
import { compile } from "unwritten:tests:utils/compile.js";
import { scope } from "unwritten:tests:utils/scope.js";
import { assert } from "unwritten:utils/general.js";
import { ts } from "unwritten:utils/template.js";

import type { InterfaceEntity } from "unwritten:interpreter:type-definitions/entities.js";


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
        expect(extendedInterfaceProperties).to.have.lengthOf(2);
        expect(extendedInterfaceProperties[0].name).to.equal("propA");
        expect(extendedInterfaceProperties[1].name).to.equal("propB");
      });

      it("should inherit signatures from parent interface", () => {
        const extendedInterfaceProperties = extendInterfaceEntitySignaturesWithHeritage(interfaceEntity as InterfaceEntity, "methodSignatures");
        expect(extendedInterfaceProperties).to.have.lengthOf(2);
        expect(extendedInterfaceProperties[0].name).to.equal("methodA");
        expect(extendedInterfaceProperties[1].name).to.equal("methodB");
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
        expect(extendedInterfaceProperties).to.have.lengthOf(1);
        expect(extendedInterfaceProperties[0].name).to.equal("prop");
        expect(extendedInterfaceProperties[0].type.kind).to.equal(TypeKind.String);
      });

      it("should override signatures from parent interface", () => {
        const extendedInterfaceProperties = extendInterfaceEntitySignaturesWithHeritage(interfaceEntity as InterfaceEntity, "methodSignatures");
        expect(extendedInterfaceProperties).to.have.lengthOf(1);
        expect(extendedInterfaceProperties[0].name).to.equal("method");
        expect(extendedInterfaceProperties[0].returnType.kind).to.equal(TypeKind.String);
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
          public override instanceProperty: undefined;
          public static override staticProperty: undefined;
        }
      `;

      const { ctx: compilerContext, exportedSymbols } = compile(testFileContent);

      const symbol = exportedSymbols.find(s => s.name === "Class")!;
      const classEntity = createClassEntity(compilerContext, symbol);

      const extendedClassProperties = extendClassEntityEntitiesWithHeritage(classEntity, "properties");

      it("should inherit properties from parent interface", () => {

        expect(extendedClassProperties).to.have.lengthOf(2);

        expect(extendedClassProperties[0].name).to.equal("instanceProperty");
        expect(extendedClassProperties[0].type.kind).to.equal(TypeKind.Undefined);
        expect(extendedClassProperties[0].modifiers).to.not.include("static");

        expect(extendedClassProperties[1].name).to.equal("staticProperty");
        expect(extendedClassProperties[1].type.kind).to.equal(TypeKind.Undefined);
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
        expect(extendedClassConstructor.signatures).to.have.lengthOf(1);
        expect(extendedClassConstructor.signatures[0].parameters).to.have.lengthOf(1);
      });

    }

    {

      const testFileContent = ts`
        class BaseClass {
        }
        export class Class extends BaseClass {
        }
      `;

      const { ctx: compilerContext, exportedSymbols } = compile(testFileContent);

      const symbol = exportedSymbols.find(s => s.name === "Class")!;
      const classEntity = createClassEntity(compilerContext, symbol);

      const extendedClassConstructor = extendClassEntityConstructorsWithHeritage(classEntity);

      it("should not extend automatically generated empty constructor", () => {
        expect(extendedClassConstructor).to.equal(undefined);
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
          }
        }
      `;

      const { ctx: compilerContext, exportedSymbols } = compile(testFileContent);

      const symbol = exportedSymbols.find(s => s.name === "Class")!;
      const classEntity = createClassEntity(compilerContext, symbol);

      const extendedClassConstructor = extendClassEntityConstructorsWithHeritage(classEntity);

      it("should be able to override the parent constructor", () => {

        assert(extendedClassConstructor);
        expect(extendedClassConstructor.signatures).to.have.lengthOf(1);

        assert(extendedClassConstructor.signatures[0].parameters);

        expect(extendedClassConstructor.signatures[0].parameters).to.have.lengthOf(1);
        expect(extendedClassConstructor.signatures[0].parameters[0].type?.kind).to.equal(TypeKind.String);

      });

    }

  });

});
