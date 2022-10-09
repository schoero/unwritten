import { Symbol } from "typescript";

import { parse } from "../../parser/index.js";
import { Namespace, TypeKind } from "../../types/types.js";
import { getIdBySymbol } from "../compositions/id.js";
import { getNameBySymbol } from "../compositions/name.js";


export function createNamespaceBySymbol(symbol: Symbol): Namespace {

  const exports = parse(symbol);
  const id = getIdBySymbol(symbol);
  const name = getNameBySymbol(symbol);
  const kind = TypeKind.Namespace;

  return {
    exports,
    id,
    kind,
    name
  };

}
