import { convertParameterEntityForDocumentation } from "unwritten:renderer/markup/ast-converter/entities/index.js";
import { convertType } from "unwritten:renderer/markup/ast-converter/index.js";
import { getRenderConfig } from "unwritten:renderer/markup/utils/config.js";
import { createContainerNode, createListNode } from "unwritten:renderer/markup/utils/nodes.js";
import { encapsulate, spaceBetween } from "unwritten:renderer/markup/utils/renderer.js";
import { getTranslator } from "unwritten:renderer/markup/utils/translations.js";

import type { FunctionType } from "unwritten:interpreter:type-definitions/types.js";
import type { MarkupRenderContexts } from "unwritten:renderer:markup/types-definitions/markup.d.js";
import type { ConvertedFunctionType } from "unwritten:renderer:markup/types-definitions/renderer.js";


export function convertFunctionType(ctx: MarkupRenderContexts, functionType: FunctionType): ConvertedFunctionType {

  const translate = getTranslator(ctx);
  const renderConfig = getRenderConfig(ctx);

  const renderedType = encapsulate("Function", renderConfig.typeEncapsulation);

  const convertedSignatures = functionType.signatures.map(signatureEntity => {

    const convertedParameters = signatureEntity.parameters?.map(
      parameter => convertParameterEntityForDocumentation(ctx, parameter)
    ) ?? [];

    const returnType = convertType(ctx, signatureEntity.returnType);

    const renderedReturnType = spaceBetween(
      `${translate("returns", { capitalize: true })}:`,
      returnType
    );

    return createListNode(
      ...convertedParameters,
      renderedReturnType
    );

  });

  return createContainerNode(
    renderedType,
    convertedSignatures[0]
  );

}
