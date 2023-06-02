import { expect, it } from "vitest";

import { createClassEntity, createFunctionEntity } from "unwritten:interpreter:ast/entities/index.js";
import { EntityKind } from "unwritten:interpreter:enums/entities.js";
import { TypeKind } from "unwritten:interpreter:enums/types.js";
import { compile } from "unwritten:tests:utils/compile.js";
import { scope } from "unwritten:tests:utils/scope.js";
import { ts } from "unwritten:utils/template.js";

import { createInterfaceEntity } from "./interface.js";


scope("Interpreter", EntityKind.Signature, () => {

  {

    const testFileContent = ts`
      export function functionSymbol(): boolean {
        return true;
      }
    `;

    const { ctx, exportedSymbols } = compile(testFileContent);

    const symbol = exportedSymbols.find(s => s.name === "functionSymbol")!;
    const exportedFunction = createFunctionEntity(ctx, symbol);

    it("should be able to parse a signature", () => {
      expect(exportedFunction.kind).toBe(EntityKind.Function);
      expect(exportedFunction.signatures).toBeDefined();
      expect(exportedFunction.signatures).toHaveLength(1);
    });

  }

  {

    const testFileContent = ts`
      /**
       * Function description
       * @example Function example
       */
      export function functionSymbol(): boolean {
        return true;
      }
    `;

    const { ctx, exportedSymbols } = compile(testFileContent);

    const symbol = exportedSymbols.find(s => s.name === "functionSymbol")!;
    const exportedFunction = createFunctionEntity(ctx, symbol);

    it("should have one signature", () => {
      expect(exportedFunction.signatures).toHaveLength(1);
    });

    it("should have a matching kind", () => {
      expect(exportedFunction.signatures[0]!.kind).toBe(EntityKind.Signature);
    });

    it("should have a matching description", () => {
      expect(exportedFunction.signatures[0]!.description).toBe("Function description");
    });

    it("should have a matching example", () => {
      expect(exportedFunction.signatures[0]!.example).toBe("Function example");
    });

    it("should have a matching position", () => {
      expect(exportedFunction.signatures[0]!.position).to.deep.equal({
        column: 0,
        file: "/file.ts",
        line: 5
      });
    });

    it("should have a return type which is a boolean", () => {
      expect(exportedFunction.signatures[0]!.returnType.kind).toBe(TypeKind.Boolean);
    });

  }

  {

    const testFileContent = ts`
      export function functionSymbol(){}
      export interface InterfaceSymbol {
        (): void;
        new (): void;
        get getter(): void;
        methodSignature(): void;
        set setter(value: string);
      }
    `;

    const { ctx, exportedSymbols } = compile(testFileContent);

    const functionSymbol = exportedSymbols.find(s => s.name === "functionSymbol")!;
    const interfaceSymbol = exportedSymbols.find(s => s.name === "InterfaceSymbol")!;
    const exportedFunction = createFunctionEntity(ctx, functionSymbol);
    const exportedInterface = createInterfaceEntity(ctx, interfaceSymbol);

    it("should be able to handle all kinds of signatures", () => {
      expect(exportedFunction.signatures).toHaveLength(1);
      expect(exportedInterface.callSignatures).toHaveLength(1);
      expect(exportedInterface.constructSignatures).toHaveLength(1);
      expect(exportedInterface.methodSignatures).toHaveLength(1);
      expect(exportedInterface.getterSignatures).toHaveLength(1);
      expect(exportedInterface.setterSignatures).toHaveLength(1);
    });

  }

  {

    const testFileContent = ts`
      export function functionSymbol<T>(value: T): T {
        return value;
      }
    `;

    const { ctx, exportedSymbols } = compile(testFileContent);

    const symbol = exportedSymbols.find(s => s.name === "functionSymbol")!;
    const exportedFunction = createFunctionEntity(ctx, symbol);

    it("should be able to handle type parameters", () => {
      expect(exportedFunction.signatures[0]!.typeParameters).toHaveLength(1);
    });

  }

  {

    const testFileContent = ts`
      export class Class {
        public publicMethod() {}
        private privateMethod() {}
        static staticMethod() {}
        private static privateStaticMethod() {}
      }
    `;

    const { ctx, exportedSymbols } = compile(testFileContent);

    const symbol = exportedSymbols.find(s => s.name === "Class")!;
    const exportedClass = createClassEntity(ctx, symbol);

    const publicMethod = exportedClass.methods.find(m => m.name === "publicMethod")!;
    const privateMethod = exportedClass.methods.find(m => m.name === "privateMethod")!;
    const staticMethod = exportedClass.methods.find(m => m.name === "staticMethod")!;
    const privateStaticMethod = exportedClass.methods.find(m => m.name === "privateStaticMethod")!;

    it("should support modifiers", () => {
      expect(publicMethod.signatures.find(signature => signature.name === "publicMethod")!.modifiers).toContain("public");
      expect(privateMethod.signatures.find(signature => signature.name === "privateMethod")!.modifiers).toContain("private");
      expect(staticMethod.signatures.find(signature => signature.name === "staticMethod")!.modifiers).toContain("static");
      expect(privateStaticMethod.signatures.find(signature => signature.name === "privateStaticMethod")!.modifiers).toContain("private");
      expect(privateStaticMethod.signatures.find(signature => signature.name === "privateStaticMethod")!.modifiers).toContain("static");
    });

  }

});
