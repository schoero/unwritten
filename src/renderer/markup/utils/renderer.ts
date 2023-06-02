import { EntityKind } from "unwritten:interpreter/enums/entities.js";

import type { ExportableEntityKinds } from "unwritten:interpreter/type-definitions/entities.js";
import type { Encapsulation, MarkupRenderConfig } from "unwritten:renderer:markup/types-definitions/config.js";
import type { ASTNodes } from "unwritten:renderer:markup/types-definitions/nodes.js";
import type { Complete, TranslationWithoutSuffixes } from "unwritten:type-definitions/utils.js";


export function encapsulate(node: ASTNodes, encapsulation: Encapsulation | string[] | false | undefined) {

  if(encapsulation === undefined || encapsulation === false){
    return node;
  }

  return [
    encapsulation[0],
    node,
    encapsulation[1]
  ];

}

export function getCategoryName(entityKind: ExportableEntityKinds): keyof TranslationWithoutSuffixes<Complete<MarkupRenderConfig>["translations"]> {
  switch (entityKind){
    case EntityKind.Class:
      return "class";
    case EntityKind.Enum:
      return "enum";
    case EntityKind.Function:
      return "function";
    case EntityKind.Interface:
      return "interface";
    case EntityKind.Module:
      return "module";
    case EntityKind.Namespace:
      return "namespace";
    case EntityKind.TypeAlias:
      return "type-alias";
    case EntityKind.Variable:
      return "variable";
    case EntityKind.ExportAssignment:
      return "export-assignment";
  }
}

export function minMax(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

export function nodeFilter(node: ASTNodes) {
  return node !== "";
}

export function spaceBetween(...nodes: ASTNodes[]) {
  return nodes
    .filter(nodeFilter)
    .reduce<ASTNodes[]>((acc, node, index) => {
    if(index > 0){
      acc.push(" ", node);
    } else {
      acc.push(node);
    }
    return acc;
  }, []);
}
