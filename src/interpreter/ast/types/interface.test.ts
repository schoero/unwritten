import { assert, expect, it } from "vitest";

import { createTypeAliasEntity } from "unwritten:interpreter/ast/entities/index.js";
import { EntityKind } from "unwritten:interpreter/enums/entities.js";
import { TypeKind } from "unwritten:interpreter/enums/types.js";
import { compile } from "unwritten:tests:utils/compile.js";
import { scope } from "unwritten:tests:utils/scope.js";
import { ts } from "unwritten:tests:utils/template.js";


scope("Compiler", EntityKind.Interface, () => {

  {

    const testFileContent = ts`
      interface Interface {};
      export type InterfaceType = Interface;
    `;

    const { exportedSymbols, ctx } = compile(testFileContent);

    const symbol = exportedSymbols.find(s => s.name === "InterfaceType")!;
    const exportedTypeAlias = createTypeAliasEntity(ctx, symbol);

    it("should be able to parse an interface type", () => {
      expect(exportedTypeAlias.kind).to.equal(EntityKind.TypeAlias);
      assert(exportedTypeAlias.type.kind === TypeKind.TypeReference);
      expect(exportedTypeAlias.type.type?.kind).to.equal(TypeKind.Interface);
    });

  }

  {

    const testFileContent = ts`
      interface Interface {
        a: string;
      }
      export type InterfaceType = Interface;
    `;

    const { exportedSymbols, ctx } = compile(testFileContent);

    const symbol = exportedSymbols.find(s => s.name === "InterfaceType")!;
    const exportedTypeAlias = createTypeAliasEntity(ctx, symbol);

    assert(exportedTypeAlias.type.kind === TypeKind.TypeReference);
    assert(exportedTypeAlias.type.type?.kind === TypeKind.Interface);

    const interfaceType = exportedTypeAlias.type.type;

    it("should have a matching kind", () => {
      expect(interfaceType.kind).to.equal(TypeKind.Interface);
    });

    it("should have a matching name", () => {
      expect(interfaceType.name).to.equal("Interface");
    });

    it("should have the correct amount of members", () => {
      expect(interfaceType.properties).to.have.lengthOf(1);
    });

    it("should have a matching position", () => {
      expect(interfaceType.position).to.deep.equal({
        column: 0,
        file: "/file.ts",
        line: 1
      });
    });

  }

  {

    const testFileContent = ts`
      interface Interface {
        (): void;
        static staticProp: string;
        protected protectedProp: string; 
        new (): void;
        method(a: number): void;
        method(a: string): void;
        prop: string;
        funcProp: () => void;
        get getter(): string;
        set setter(value: string): void;
      }
      export type InterfaceType = Interface;
    `;

    const { exportedSymbols, ctx } = compile(testFileContent);

    const symbol = exportedSymbols.find(s => s.name === "InterfaceType")!;
    const exportedTypeAlias = createTypeAliasEntity(ctx, symbol);

    assert(exportedTypeAlias.type.kind === TypeKind.TypeReference);
    assert(exportedTypeAlias.type.type?.kind === TypeKind.Interface);

    const interfaceType = exportedTypeAlias.type.type;

    it("should be able to handle construct signatures", () => {
      expect(interfaceType.constructSignatures).to.have.lengthOf(1);
    });

    it("should be able to handle call signatures", () => {
      expect(interfaceType.callSignatures).to.have.lengthOf(1);
    });

    it("should be able to handle properties", () => {
      expect(interfaceType.properties).to.have.lengthOf(4);
    });

    it("should be able to handle static properties", () => {
      expect(interfaceType.properties.filter(prop =>
        prop.modifiers.includes("static"))).to.have.lengthOf(1);
    });

    it("should be able to handle instance properties", () => {
      expect(interfaceType.properties.filter(prop =>
        prop.modifiers.includes("protected"))).to.have.lengthOf(1);
    });

    it("should be able to handle overloaded methods", () => {
      expect(interfaceType.methods).to.have.lengthOf(1);
      expect(interfaceType.methods[0].signatures).to.have.lengthOf(2);
    });

    it("should differentiate between methods and function properties", () => {
      expect(interfaceType.methods.find(m => m.name === "method")).to.not.equal(undefined);
      expect(interfaceType.properties.find(p => p.name === "funcProp")).to.not.equal(undefined);
    });

    it("should be able to handle getters", () => {
      expect(interfaceType.getters).to.have.lengthOf(1);
    });

    it("should be able to handle setters", () => {
      expect(interfaceType.setters).to.have.lengthOf(1);
    });

  }

  {

    const testFileContent = ts`
      interface Interface {
        a: string;
      }
      interface Interface {
        b: number;
      }
      export type InterfaceType = Interface;
    `;

    const { exportedSymbols, ctx } = compile(testFileContent);

    const symbol = exportedSymbols.find(s => s.name === "InterfaceType")!;
    const exportedTypeAlias = createTypeAliasEntity(ctx, symbol);

    assert(exportedTypeAlias.type.kind === TypeKind.TypeReference);
    assert(exportedTypeAlias.type.type?.kind === TypeKind.Interface);

    const interfaceType = exportedTypeAlias.type.type;

    it("should merge multiple interfaces with the same name", () => {
      expect(interfaceType.properties).to.have.lengthOf(2);
    });

  }

  {

    const testFileContent = ts`
      interface InterfaceA {
        a: string;
      }
      interface InterfaceB extends InterfaceA {
        b: string;
      }
      interface InterfaceC extends InterfaceB {
        c: string;
      }
      export type InterfaceTypeB = InterfaceB;
      export type InterfaceTypeC = InterfaceC;
    `;

    const { exportedSymbols, ctx } = compile(testFileContent);

    const exportedTypeAliasBSymbol = exportedSymbols.find(s => s.name === "InterfaceTypeB")!;
    const exportedTypeAliasCSymbol = exportedSymbols.find(s => s.name === "InterfaceTypeC")!;
    const exportedTypeAliasB = createTypeAliasEntity(ctx, exportedTypeAliasBSymbol);
    const exportedTypeAliasC = createTypeAliasEntity(ctx, exportedTypeAliasCSymbol);

    assert(exportedTypeAliasB.type.kind === TypeKind.TypeReference);
    assert(exportedTypeAliasB.type.type?.kind === TypeKind.Interface);
    assert(exportedTypeAliasC.type.kind === TypeKind.TypeReference);
    assert(exportedTypeAliasC.type.type?.kind === TypeKind.Interface);

    const interfaceTypeB = exportedTypeAliasB.type.type;
    const interfaceTypeC = exportedTypeAliasC.type.type;

    it("should be able to parse inheritance", () => {

      expect(interfaceTypeB.properties).to.have.lengthOf(2);
      expect(interfaceTypeB.properties[0]!.name).to.equal("b");
      expect(interfaceTypeB.properties[1]!.name).to.equal("a");

      expect(interfaceTypeC.properties).to.have.lengthOf(3);
      expect(interfaceTypeC.properties[0]!.name).to.equal("c");
      expect(interfaceTypeC.properties[1]!.name).to.equal("b");
      expect(interfaceTypeC.properties[2]!.name).to.equal("a");

    });

  }

  {

    const testFileContent = ts`
      interface InterfaceA {
        a: string;
      }
      interface InterfaceB {
        b: string;
      }
      interface InterfaceC extends InterfaceA, InterfaceB {
        c: string;
      }
      export type InterfaceTypeC = InterfaceC;
    `;

    const { exportedSymbols, ctx } = compile(testFileContent);

    const exportedTypeAliasCSymbol = exportedSymbols.find(s => s.name === "InterfaceTypeC")!;
    const exportedTypeAliasC = createTypeAliasEntity(ctx, exportedTypeAliasCSymbol);

    assert(exportedTypeAliasC.type.kind === TypeKind.TypeReference);
    assert(exportedTypeAliasC.type.type?.kind === TypeKind.Interface);

    const interfaceTypeC = exportedTypeAliasC.type.type;

    it("should be able to handle multiple extended interfaces at the same time", () => {
      expect(interfaceTypeC.properties).to.have.lengthOf(3);
      expect(interfaceTypeC.properties[0]!.name).to.equal("c");
      expect(interfaceTypeC.properties[1]!.name).to.equal("a");
      expect(interfaceTypeC.properties[2]!.name).to.equal("b");
    });

  }

  {

    const testFileContent = ts`
      interface GenericInterface<T> {
        b: T;
      }
      export type GenericInterfaceType<T> = GenericInterface<T>;
    `;

    const { exportedSymbols, ctx } = compile(testFileContent);

    const exportedTypeAliasSymbol = exportedSymbols.find(s => s.name === "GenericInterfaceType")!;
    const exportedTypeAlias = createTypeAliasEntity(ctx, exportedTypeAliasSymbol);

    assert(exportedTypeAlias.type.kind === TypeKind.TypeReference);
    assert(exportedTypeAlias.type.type?.kind === TypeKind.Object);

    const interfaceType = exportedTypeAlias.type.type;

    it("should support generics in interfaces", () => {
      expect(interfaceType.properties).to.have.lengthOf(1);
      expect(interfaceType.properties[0]!.type.kind).to.equal(TypeKind.TypeParameter);

    });

  }

  {

    const testFileContent = ts`
      interface Interface<T extends string> {
        prop: T;
      }
      export type InterfaceType = Interface<"hello">;
    `;

    const { exportedSymbols, ctx } = compile(testFileContent);

    const symbol = exportedSymbols.find(s => s.name === "InterfaceType")!;
    const exportedTypeAlias = createTypeAliasEntity(ctx, symbol);

    assert(exportedTypeAlias.type.kind === TypeKind.TypeReference);
    assert(exportedTypeAlias.type.type?.kind === TypeKind.Object);

    const objectType = exportedTypeAlias.type.type;

    it("should support type arguments", () => {
      expect(objectType.properties).to.have.lengthOf(1);
      expect(objectType.properties[0]!.type.kind).to.equal(TypeKind.StringLiteral);
    });

  }

});
