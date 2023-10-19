import { assert, expect, it } from "vitest";

import { EntityKind } from "unwritten:interpreter/enums/entity.js";
import { TypeKind } from "unwritten:interpreter/enums/type.js";
import { createInterfaceEntity, createTypeAliasEntity } from "unwritten:interpreter:ast/entities/index.js";
import { compile } from "unwritten:tests:utils/compile.js";
import { scope } from "unwritten:tests:utils/scope.js";
import { isJSDocText } from "unwritten:typeguards/jsdoc.js";
import { ts } from "unwritten:utils/template.js";


scope("Interpreter", EntityKind.Interface, () => {

  {

    const testFileContent = ts`
      interface Interface {};
      export type InterfaceType = Interface;
    `;

    const { ctx, exportedSymbols } = compile(testFileContent);

    const symbol = exportedSymbols.find(s => s.name === "InterfaceType")!;
    const exportedTypeAlias = createTypeAliasEntity(ctx, symbol);

    it("should be able to parse an interface type", () => {
      expect(exportedTypeAlias.kind).toBe(EntityKind.TypeAlias);
      assert(exportedTypeAlias.type.kind === TypeKind.TypeReference);
      expect(exportedTypeAlias.type.type?.kind).toBe(TypeKind.Interface);
    });

  }

  {

    const testFileContent = ts`
      interface Interface {
        a: string;
      }
      export type InterfaceType = Interface;
    `;

    const { ctx, exportedSymbols } = compile(testFileContent);

    const symbol = exportedSymbols.find(s => s.name === "InterfaceType")!;
    const exportedTypeAlias = createTypeAliasEntity(ctx, symbol);

    assert(exportedTypeAlias.type.kind === TypeKind.TypeReference);
    assert(exportedTypeAlias.type.type?.kind === TypeKind.Interface);

    const interfaceType = exportedTypeAlias.type.type;

    it("should have a matching kind", () => {
      expect(interfaceType.kind).toBe(TypeKind.Interface);
    });

    it("should have a matching name", () => {
      expect(interfaceType.name).toBe("Interface");
    });

    it("should have the correct amount of members", () => {
      expect(interfaceType.properties).toHaveLength(1);
    });

    it("should have a matching position", () => {
      expect(interfaceType.position).toStrictEqual({
        column: 0,
        file: "/index.ts",
        line: 1
      });
    });

  }

  {

    const testFileContent = ts`
      interface Interface {
        (): void;
        new (): void;
        method(a: number): void;
        method(a: string): void;
        prop: string;
        funcProp: () => void;
        get getter(): string;
        set setter(value: string);
      }
      export type InterfaceType = Interface;
    `;

    const { ctx, exportedSymbols } = compile(testFileContent);

    const symbol = exportedSymbols.find(s => s.name === "InterfaceType")!;
    const exportedTypeAlias = createTypeAliasEntity(ctx, symbol);

    assert(exportedTypeAlias.type.kind === TypeKind.TypeReference);
    assert(exportedTypeAlias.type.type?.kind === TypeKind.Interface);

    const interfaceType = exportedTypeAlias.type.type;

    it("should be able to handle construct signatures", () => {
      expect(interfaceType.constructSignatures).toHaveLength(1);
    });

    it("should be able to handle call signatures", () => {
      expect(interfaceType.callSignatures).toHaveLength(1);
    });

    it("should be able to handle properties", () => {
      expect(interfaceType.properties).toHaveLength(2);
    });

    it("should be able to handle overloaded methods", () => {
      expect(interfaceType.methods).toHaveLength(1);
      expect(interfaceType.methods[0].signatures).toHaveLength(2);
    });

    it("should differentiate between methods and function properties", () => {
      expect(interfaceType.methods.find(m => m.name === "method")).toBeDefined();
      expect(interfaceType.properties.find(p => p.name === "funcProp")).toBeDefined();
    });

    it("should be able to handle getters", () => {
      expect(interfaceType.getters).toHaveLength(1);
    });

    it("should be able to handle setters", () => {
      expect(interfaceType.setters).toHaveLength(1);
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

    const { ctx, exportedSymbols } = compile(testFileContent);

    const symbol = exportedSymbols.find(s => s.name === "InterfaceType")!;
    const exportedTypeAlias = createTypeAliasEntity(ctx, symbol);

    assert(exportedTypeAlias.type.kind === TypeKind.TypeReference);
    assert(exportedTypeAlias.type.type?.kind === TypeKind.Interface);

    const interfaceType = exportedTypeAlias.type.type;

    it("should merge multiple interfaces with the same name", () => {
      expect(interfaceType.properties).toHaveLength(2);
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

    const { ctx, exportedSymbols } = compile(testFileContent);

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

      expect(interfaceTypeB.properties).toHaveLength(2);
      expect(interfaceTypeB.properties[0]!.name).toBe("b");
      expect(interfaceTypeB.properties[1]!.name).toBe("a");

      expect(interfaceTypeC.properties).toHaveLength(3);
      expect(interfaceTypeC.properties[0]!.name).toBe("c");
      expect(interfaceTypeC.properties[1]!.name).toBe("b");
      expect(interfaceTypeC.properties[2]!.name).toBe("a");

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

    const { ctx, exportedSymbols } = compile(testFileContent);

    const exportedTypeAliasCSymbol = exportedSymbols.find(s => s.name === "InterfaceTypeC")!;
    const exportedTypeAliasC = createTypeAliasEntity(ctx, exportedTypeAliasCSymbol);

    assert(exportedTypeAliasC.type.kind === TypeKind.TypeReference);
    assert(exportedTypeAliasC.type.type?.kind === TypeKind.Interface);

    const interfaceTypeC = exportedTypeAliasC.type.type;

    it("should be able to handle multiple extended interfaces at the same time", () => {
      expect(interfaceTypeC.properties).toHaveLength(3);
      expect(interfaceTypeC.properties[0]!.name).toBe("c");
      expect(interfaceTypeC.properties[1]!.name).toBe("a");
      expect(interfaceTypeC.properties[2]!.name).toBe("b");
    });

  }

  {

    const testFileContent = ts`
      export interface GenericInterface<T> {
        b: T;
      }
    `;

    const { ctx, exportedSymbols } = compile(testFileContent);

    const exportedInterfaceSymbol = exportedSymbols.find(s => s.name === "GenericInterface")!;
    const exportedInterface = createInterfaceEntity(ctx, exportedInterfaceSymbol);

    it("should support generics", () => {
      expect(exportedInterface.typeParameters).toHaveLength(1);
      expect(exportedInterface.typeParameters![0]!.name).toBe("T");

      expect(exportedInterface.properties).toHaveLength(1);
      assert(exportedInterface.properties[0]!.type.kind === TypeKind.TypeReference);
      expect(exportedInterface.properties[0]!.type.type?.kind).toBe(TypeKind.TypeParameter);
    });

  }

  {

    const testFileContent = ts`
      interface Interface {
        /**
         * Event description
         * @eventProperty
         */
        event;
      };
      export type InterfaceType = Interface;
    `;

    const { ctx, exportedSymbols } = compile(testFileContent);

    const symbol = exportedSymbols.find(s => s.name === "InterfaceType")!;
    const exportedTypeAlias = createTypeAliasEntity(ctx, symbol);

    it("should be able to parse an interface type", () => {
      expect(exportedTypeAlias.kind).toBe(EntityKind.TypeAlias);
      assert(exportedTypeAlias.type.kind === TypeKind.TypeReference);
      assert(exportedTypeAlias.type.type?.kind === TypeKind.Interface);

      expect(exportedTypeAlias.type.type.events).toBeDefined();
      expect(exportedTypeAlias.type.type.events).toHaveLength(1);
      expect(exportedTypeAlias.type.type.events[0].name).toBe("event");

      assert(isJSDocText(exportedTypeAlias.type.type.events[0].description![0]));
      expect(exportedTypeAlias.type.type.events[0].description![0].text).toBe("Event description");

      expect(exportedTypeAlias.type.type.properties).toHaveLength(0);
    });

  }

});
