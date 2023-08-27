function escapeString(text: string): string {
  const openingBracketRegex = /(?<!\\)(\[)(?!.*]*\([^)]*\))(?!\[*[ Xx]])/g;
  const closingBracketRegex = /(?<!\[[ Xx])(?<!\\)](?!\([^)]*\))/g;
  const escapedText = text
    .replace(openingBracketRegex, "\\[")
    .replace(closingBracketRegex, "\\]");

  return escapedText;
}

export function escapeCodeBlocks(text: string): string | false {

  const codeSpanRegex = /(.*?)(`)(.*?)(`)(.*?)/gms;
  const splittedCodeBlocks = Array.from(text.matchAll(codeSpanRegex));

  return splittedCodeBlocks.length > 0 && splittedCodeBlocks.map(([_, before, startBlock, codeBlock, endBlock, after]) => {
    return `${escapeString(before)}${startBlock}${codeBlock}${endBlock}${escapeString(after)}`;
  }).join("");

}

export function escapeCodeFences(text: string): string | false {

  const codeBlockRegex = /(.*?)(```\w*\s*\n)(.*?)(```\s*\n?)(.*?$)/gms;
  const splittedCodeFences = Array.from(text.matchAll(codeBlockRegex));

  return splittedCodeFences.length > 0 && splittedCodeFences.map(([_, before, startBlock, codeBlock, endBlock, after]) => {

    const escapedBefore = escapeCodeBlocks(before) || escapeString(before);
    const escapedAfter = escapeCodeBlocks(after) || escapeString(after);
    const escapedCodeBlock = startBlock.includes("```md") || startBlock.includes("```markdown")
      ? escapeMarkdown(codeBlock)
      : codeBlock;

    return `${escapedBefore}${startBlock}${escapedCodeBlock}${endBlock}${escapedAfter}`;

  }).join("");

}


export function escapeMarkdown(text: string): string {
  return escapeCodeFences(text) || escapeCodeBlocks(text) || escapeString(text);
}
