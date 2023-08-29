import { EntityKind } from "unwritten:interpreter/enums/entity.js";

import type { ExportableEntityKinds } from "unwritten:interpreter/type-definitions/entities.js";
import type { Encapsulation } from "unwritten:renderer:markup/types-definitions/config.js";
import type { ASTNode } from "unwritten:renderer:markup/types-definitions/nodes.js";


export function encapsulate(node: ASTNode, encapsulation: Encapsulation | string[] | false | undefined) {

  if(encapsulation === undefined || encapsulation === false){
    return node;
  }

  return [
    encapsulation[0],
    node,
    encapsulation[1]
  ];

}

export function getCategoryName(entityKind: ExportableEntityKinds) {
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
      return "typeAlias";
    case EntityKind.Variable:
      return "variable";
    case EntityKind.ExportAssignment:
      return "exportAssignment";
  }
}

export function minMax(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

export function spaceBetween(...nodes: ASTNode[]) {
  return nodes
    .filter(node => !!node)
    .reduce<ASTNode[]>((acc, node, index) => {
    if(index > 0){
      acc.push(" ", node);
    } else {
      acc.push(node);
    }
    return acc;
  }, []);
}
