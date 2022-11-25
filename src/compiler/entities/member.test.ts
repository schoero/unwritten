import { expect, it } from "vitest";

import { compile } from "../../../tests/utils/compile.js";
import { scope } from "../../../tests/utils/scope.js";
import { ts } from "../../../tests/utils/template.js";
import { TypeKind } from "../../types/types.js";
import { createInterfaceBySymbol } from "./interface.js";


scope("Compiler", TypeKind.Member, () => {

  {

    const testFileContent = ts`
      export interface Interface {
        a: string;
      }
    `;

    const { exportedSymbols, ctx } = compile(testFileContent.trim());

    const symbol = exportedSymbols.find(s => s.name === "Interface")!;
    const exportedInterface = createInterfaceBySymbol(ctx, symbol);

    it("should be able to parse members", () => {
      expect(exportedInterface.kind).to.equal(TypeKind.Interface);
      expect(exportedInterface.members).to.not.equal(undefined);
    });

  }

  {

    const testFileContent = ts`
      export interface Interface {
        7: string;
      }
    `;

    const { exportedSymbols, ctx } = compile(testFileContent.trim());

    const symbol = exportedSymbols.find(s => s.name === "Interface")!;
    const exportedInterface = createInterfaceBySymbol(ctx, symbol);

    it("should be able to have numbers as keys", () => {
      expect(exportedInterface.kind).to.equal(TypeKind.Interface);
      expect(exportedInterface.members).to.not.equal(undefined);
    });

  }

  {

    const testFileContent = ts`
      /** 
       * Interface description 
       * @example Interface example
       */
      export interface Interface {
        /**
         * Member description
         * @example Member example
         */
        a: string;
        b: number;
      }
    `;

    const { exportedSymbols, ctx } = compile(testFileContent.trim());

    const symbol = exportedSymbols.find(s => s.name === "Interface")!;
    const exportedInterface = createInterfaceBySymbol(ctx, symbol);

    it("should have the correct amount of members", () => {
      expect(exportedInterface.members.length).to.equal(2);
    });

    const member1 = exportedInterface.members[0]!;
    const member2 = exportedInterface.members[1]!;

    it("should have matching names", () => {
      expect(member1.name).to.equal("a");
      expect(member2.name).to.equal("b");
    });

    it("should have matching types", () => {
      expect(member1.type.kind).to.equal(TypeKind.String);
      expect(member2.type.kind).to.equal(TypeKind.Number);
    });

    it("should have matching descriptions", () => {
      expect(member1.description).to.equal("Member description");
      expect(member2.description).to.equal(undefined);
    });

    it("should have matching examples", () => {
      expect(member1.example).to.equal("Member example");
      expect(member2.example).to.equal(undefined);
    });

    it("should have matching positions", () => {
      expect(member1.position).to.deep.equal({
        column: 8,
        file: "/file.ts",
        line: 10
      });
      expect(member2.position).to.deep.equal({
        column: 8,
        file: "/file.ts",
        line: 11
      });
    });

  }

});
