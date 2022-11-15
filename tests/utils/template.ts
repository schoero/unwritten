export function ts(templateStrings: TemplateStringsArray, ...values: (boolean | number | string)[]) {
  return templateStrings.reduce((acc, str, i) => `${acc}${str}${values[i]}`, "");
}
