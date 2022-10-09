import { Symbol } from "typescript";

import { parse } from "../../parser/index.js";
import { Module, TypeKind } from "../../types/types.js";
import { getIdBySymbol } from "../compositions/id.js";
import { getNameBySymbol } from "../compositions/name.js";


export function createModuleBySymbol(symbol: Symbol): Module {

  const exports = parse(symbol);
  const id = getIdBySymbol(symbol);
  const name = getNameBySymbol(symbol);
  const kind = TypeKind.Module;

  return {
    exports,
    id,
    kind,
    name
  };

}
