import { expect, it } from "vitest";

import { createTypeAliasEntity } from "unwritten:compiler:entities";
import { compile } from "unwritten:tests:utils/compile.js";
import { scope } from "unwritten:tests:utils/scope.js";
import { ts } from "unwritten:tests:utils/template.js";


scope("Compiler", "JSDoc", () => {

  {

    const testFileContent = ts`
      /**
       * Type description
       * @remarks This is a longer description.
       * @alpha This type is in alpha.
       * @beta This type is in beta.
       * @deprecated This type is deprecated.
       * @example type example
       */
      export type Test = true;
    `;

    const { exportedSymbols, ctx } = compile(testFileContent);

    const symbol = exportedSymbols.find(s => s.name === "Test")!;
    const exportedTypeAlias = createTypeAliasEntity(ctx, symbol);

    it("should have all matching JSDoc tags", () => {
      expect(exportedTypeAlias.description).to.equal("Type description");
      expect(exportedTypeAlias.remarks).to.equal("This is a longer description.");
      expect(exportedTypeAlias.alpha).to.equal("This type is in alpha.");
      expect(exportedTypeAlias.beta).to.equal("This type is in beta.");
      expect(exportedTypeAlias.deprecated).to.equal("This type is deprecated.");
      expect(exportedTypeAlias.example).to.equal("type example");
    });

  }

});
