import { expect, it } from "vitest";

import { EntityKind } from "unwritten:compiler:enums/entities.js";
import { TypeKind } from "unwritten:compiler:enums/types.js";
import { BuiltInRenderers } from "unwritten:renderer/enums/renderer.js";
import { renderSignatureEntity } from "unwritten:renderer/typescript/ast/entities/signature.js";
import { createRenderContext } from "unwritten:tests:utils/context.js";
import { scope } from "unwritten:tests:utils/scope.js";

import type { SignatureEntity } from "unwritten:compiler:type-definitions/entities.js";
import type { Testable } from "unwritten:type-definitions/utils.js";


scope("TypeScriptRenderer", EntityKind.Signature, () => {

  {

    // #region Signature with all JSDoc tags

    const signatureEntity: Testable<SignatureEntity> = {
      beta: undefined,
      description: "Signature description",
      example: "Signature example",
      kind: EntityKind.Signature,
      name: "testSignature",
      parameters: [],
      position: {
        column: 4,
        file: "/file.ts",
        line: 9
      },
      remarks: "Signature remarks",
      returnType: {
        description: "Return type description",
        kind: TypeKind.Void,
        name: "void"
      },
      typeParameters: []
    };

    // #endregion

    const ctx = createRenderContext(BuiltInRenderers.TypeScript);

    const renderedSignature = renderSignatureEntity(ctx, signatureEntity as SignatureEntity);

    it("should render signatures correctly", () => {
      expect(renderedSignature).to.equal("testSignature(): void;");
    });

  }

});
