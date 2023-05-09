export function createTemplateTag(templateStrings: TemplateStringsArray, ...values: (boolean | number | string)[]) {
  const assembledTemplateString = assembleTemplateString(templateStrings, ...values);
  const contentWithoutSurroundingNewLines = removeSurroundingNewLines(assembledTemplateString);
  const minIndentation = findCommonIndentation(contentWithoutSurroundingNewLines);
  const contentWithoutCommonIndentation = removeCommonIndentation(contentWithoutSurroundingNewLines, minIndentation);
  return contentWithoutCommonIndentation;
}

export function css(htmlCode: TemplateStringsArray, ...values: (boolean | number | string)[]) {
  return createTemplateTag(htmlCode, ...values);
}

export function html(htmlCode: TemplateStringsArray, ...values: (boolean | number | string)[]) {
  return createTemplateTag(htmlCode, ...values);
}

export function js(javaScriptCode: TemplateStringsArray, ...values: (boolean | number | string)[]) {
  return createTemplateTag(javaScriptCode, ...values);
}

export function json(jsonContent: TemplateStringsArray, ...values: (boolean | number | string)[]) {
  return createTemplateTag(jsonContent, ...values);
}

export function md(htmlCode: TemplateStringsArray, ...values: (boolean | number | string)[]) {
  return createTemplateTag(htmlCode, ...values);
}

export function ts(typeScriptCode: TemplateStringsArray, ...values: (boolean | number | string)[]) {
  return createTemplateTag(typeScriptCode, ...values);
}

export function txt(text: TemplateStringsArray, ...values: (boolean | number | string)[]) {
  return createTemplateTag(text, ...values);
}

function assembleTemplateString(templateString: TemplateStringsArray, ...values: (boolean | number | string)[]) {
  return templateString.reduce((acc, str, i) => `${acc}${str}${values[i] ?? ""}`, "");
}

function findCommonIndentation(content: string) {
  const lines = content.split("\n");
  const indentations = lines.map(line => line.match(/^\s*/)?.[0].length ?? 0);
  const minIndentation = Math.min(...indentations);
  return minIndentation;
}

function removeCommonIndentation(content: string, minIndentation: number) {
  return content.replaceAll(new RegExp(`^\\s{${minIndentation}}`, "gm"), "");
}

function removeSurroundingNewLines(content: string) {
  return content.replace(/^\s*\n|\n\s*$/g, "");
}
