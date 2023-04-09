import type { Modifiers } from "unwritten:interpreter:type-definitions/shared.js";


export function renderModifiers(modifiers: Modifiers[]): string {

  const transformedModifiers = modifiers.reduce<string[]>((acc, modifier) => {
    if(modifier === "accessor"){
      acc.push("get");
      acc.push("set");
    } else if(modifier === "nativePrivate"){
      acc.push("private");
    } else {
      acc.push(modifier);
    }
    return acc;
  }, []);

  const renderedModifiers = transformedModifiers.map(
    modifier => modifier
  ).join(" ");

  const renderedModifiersWithSpacing = renderedModifiers
    ? `${renderedModifiers} `
    : "";

  return renderedModifiersWithSpacing;

}
