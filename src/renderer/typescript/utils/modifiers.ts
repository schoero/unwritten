import type { Modifiers } from "unwritten:interpreter/type-definitions/shared.js";


export function renderModifiers(modifiers: Modifiers[]): string {

  const renderedModifiers = modifiers.map(
    modifier => modifier
  ).join(" ");

  const renderedModifiersWithSpacing = renderedModifiers
    ? `${renderedModifiers} `
    : "";

  return renderedModifiersWithSpacing;

}
