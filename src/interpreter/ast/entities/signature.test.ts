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

    const { exportedSymbols, ctx } = compile(testFileContent);

    const symbol = exportedSymbols.find(s => s.name === "functionSymbol")!;
    const exportedFunction = createFunctionEntity(ctx, symbol);

    it("should be able to parse a signature", () => {
      expect(exportedFunction.kind).to.equal(EntityKind.Function);
      expect(exportedFunction.signatures).to.not.equal(undefined);
      expect(exportedFunction.signatures).to.have.lengthOf(1);
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

    const { exportedSymbols, ctx } = compile(testFileContent);

    const symbol = exportedSymbols.find(s => s.name === "functionSymbol")!;
    const exportedFunction = createFunctionEntity(ctx, symbol);

    it("should have one signature", () => {
      expect(exportedFunction.signatures).to.have.lengthOf(1);
    });

    it("should have a matching kind", () => {
      expect(exportedFunction.signatures[0]!.kind).to.equal(EntityKind.Signature);
    });

    it("should have a matching description", () => {
      expect(exportedFunction.signatures[0]!.description).to.equal("Function description");
    });

    it("should have a matching example", () => {
      expect(exportedFunction.signatures[0]!.example).to.equal("Function example");
    });

    it("should have a matching position", () => {
      expect(exportedFunction.signatures[0]!.position).to.deep.equal({
        column: 0,
        file: "/file.ts",
        line: 5
      });
    });

    it("should have a return type which is a boolean", () => {
      expect(exportedFunction.signatures[0]!.returnType.kind).to.equal(TypeKind.Boolean);
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

    const { exportedSymbols, ctx } = compile(testFileContent);

    const functionSymbol = exportedSymbols.find(s => s.name === "functionSymbol")!;
    const interfaceSymbol = exportedSymbols.find(s => s.name === "InterfaceSymbol")!;
    const exportedFunction = createFunctionEntity(ctx, functionSymbol);
    const exportedInterface = createInterfaceEntity(ctx, interfaceSymbol);

    it("should be able to handle all kinds of signatures", () => {
      expect(exportedFunction.signatures).to.have.lengthOf(1);
      expect(exportedInterface.callSignatures).to.have.lengthOf(1);
      expect(exportedInterface.constructSignatures).to.have.lengthOf(1);
      expect(exportedInterface.methodSignatures).to.have.lengthOf(1);
      expect(exportedInterface.getterSignatures).to.have.lengthOf(1);
      expect(exportedInterface.setterSignatures).to.have.lengthOf(1);
    });

  }

  {

    const testFileContent = ts`
      export function functionSymbol<T>(value: T): T {
        return value;
      }
    `;

    const { exportedSymbols, ctx } = compile(testFileContent);

    const symbol = exportedSymbols.find(s => s.name === "functionSymbol")!;
    const exportedFunction = createFunctionEntity(ctx, symbol);

    it("should be able to handle type parameters", () => {
      expect(exportedFunction.signatures[0]!.typeParameters).to.have.lengthOf(1);
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

    const { exportedSymbols, ctx } = compile(testFileContent);

    const symbol = exportedSymbols.find(s => s.name === "Class")!;
    const exportedClass = createClassEntity(ctx, symbol);

    const publicMethod = exportedClass.methods.find(m => m.name === "publicMethod")!;
    const privateMethod = exportedClass.methods.find(m => m.name === "privateMethod")!;
    const staticMethod = exportedClass.methods.find(m => m.name === "staticMethod")!;
    const privateStaticMethod = exportedClass.methods.find(m => m.name === "privateStaticMethod")!;

    it("should support modifiers", () => {
      expect(publicMethod.signatures.find(signature => signature.name === "publicMethod")!.modifiers).to.contain("public");
      expect(privateMethod.signatures.find(signature => signature.name === "privateMethod")!.modifiers).to.contain("private");
      expect(staticMethod.signatures.find(signature => signature.name === "staticMethod")!.modifiers).to.contain("static");
      expect(privateStaticMethod.signatures.find(signature => signature.name === "privateStaticMethod")!.modifiers).to.contain("private");
      expect(privateStaticMethod.signatures.find(signature => signature.name === "privateStaticMethod")!.modifiers).to.contain("static");
    });

  }

});
