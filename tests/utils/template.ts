export function ts(typeScriptCode: TemplateStringsArray, ...values: (boolean | number | string)[]) {
  return typeScriptCode.reduce((acc, str, i) => `${acc}${str}${values[i]}`, "");
}
