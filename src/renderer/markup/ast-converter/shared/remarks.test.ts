import { expect, it } from "vitest";

import { createTypeAliasEntity } from "unwritten:interpreter/ast/entities/index.js";
import { JSDocTagNames } from "unwritten:interpreter/enums/jsdoc.js";
import { convertRemarksForDocumentation } from "unwritten:renderer:markup/ast-converter/shared/remarks.js";
import { compile } from "unwritten:tests:utils/compile.js";
import { createRenderContext } from "unwritten:tests:utils/context.js";
import { scope } from "unwritten:tests:utils/scope.js";
import { assert } from "unwritten:utils/general.js";
import { ts } from "unwritten:utils/template.js";


scope("MarkupRenderer", JSDocTagNames.Remarks, () => {

  {

    const testFileContent = ts`
      /**
       * @remarks Line 1
       * Line 2
       */
      export type Test = true;
    `;

    const { ctx: compilerContext, exportedSymbols } = compile(testFileContent);

    const symbol = exportedSymbols.find(s => s.name === "Test")!;
    const typeAliasEntity = createTypeAliasEntity(compilerContext, symbol);
    const ctx = createRenderContext();

    assert(typeAliasEntity.remarks);

    const convertedRemark = convertRemarksForDocumentation(
      ctx,
      typeAliasEntity.remarks
    );

    assert(convertedRemark);

    const {
      children,
      title
    } = convertedRemark;

    it("should have a matching title", () => {
      expect(title).toBe("Remark");
    });

    it("should have a matching description", () => {
      expect(children).toHaveLength(1);
      expect(children[0].children[0]).toBe("Line 1\nLine 2");
    });

  }

  {

    const testFileContent = ts`
      /**
       * @remarks Line 1
       * Line 2
       * @remarks Line 3
       * Line 4
       */
      export type Test = true;
    `;

    const { ctx: compilerContext, exportedSymbols } = compile(testFileContent);

    const symbol = exportedSymbols.find(s => s.name === "Test")!;
    const typeAliasEntity = createTypeAliasEntity(compilerContext, symbol);
    const ctx = createRenderContext();

    assert(typeAliasEntity.remarks);

    const convertedRemark = convertRemarksForDocumentation(
      ctx,
      typeAliasEntity.remarks
    );

    assert(convertedRemark);

    const {
      children,
      title
    } = convertedRemark;

    it("should have a matching title", () => {
      expect(title).toBe("Remarks");
    });

    it("should have a matching description", () => {
      expect(children).toHaveLength(2);
      expect(children[0].children[0]).toBe("Line 1\nLine 2");
      expect(children[1].children[0]).toBe("Line 3\nLine 4");
    });

  }

});
