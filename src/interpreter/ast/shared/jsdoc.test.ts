import { expect, it } from "vitest";

import { createTypeAliasEntity } from "unwritten:interpreter:ast/entities/index.js";
import { compile } from "unwritten:tests:utils/compile.js";
import { scope } from "unwritten:tests:utils/scope.js";
import { ts } from "unwritten:utils/template.js";


scope("Interpreter", "JSDoc", () => {

  {

    const testFileContent = ts`
      /**
       * Type description
       * 
       * @remarks This is a longer description.
       * @alpha This type is in alpha.
       * @beta This type is in beta.
       * @deprecated This type is deprecated.
       * @example type example
       */
      export type Test = true;
    `;

    const { ctx, exportedSymbols } = compile(testFileContent);

    const symbol = exportedSymbols.find(s => s.name === "Test")!;
    const exportedTypeAlias = createTypeAliasEntity(ctx, symbol);

    it("should have all matching JSDoc tags", () => {
      expect(exportedTypeAlias.description).toBe("Type description");
      expect(exportedTypeAlias.remarks).toBe("This is a longer description.");
      expect(exportedTypeAlias.alpha).toBe("This type is in alpha.");
      expect(exportedTypeAlias.beta).toBe("This type is in beta.");
      expect(exportedTypeAlias.deprecated).toBe("This type is deprecated.");
      expect(exportedTypeAlias.example).toBe("type example");
    });

  }

});
