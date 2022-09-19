import { Symbol } from "typescript";

import { Export } from "../../types/types.js";
import { getIdBySymbol } from "../compositions/id.js";
import { getNameBySymbol } from "../compositions/name.js";


export function createExport(symbol: Symbol): Export {

  const name = getNameBySymbol(symbol);
  const id = getIdBySymbol(symbol);

}