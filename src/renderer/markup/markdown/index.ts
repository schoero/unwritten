import { render } from "../index.js";
import { MarkupRenderer } from "../types/renderer.js";
import { markdownRenderer as _markdownRenderer } from "./renderer.js";

export const markdownRenderer: MarkupRenderer = {
  fileExtension: _markdownRenderer.fileExtension,
  name: _markdownRenderer.name,
  render,
  renderAnchorLink: _markdownRenderer.renderAnchorLink,
  renderBoldText: _markdownRenderer.renderBoldText,
  renderCode: _markdownRenderer.renderCode,
  renderHorizontalRule: _markdownRenderer.renderHorizontalRule,
  renderHyperLink: _markdownRenderer.renderHyperLink,
  renderItalicText: _markdownRenderer.renderItalicText,
  renderLineBreak: _markdownRenderer.renderLineBreak,
  renderList: _markdownRenderer.renderList,
  renderListEnd: _markdownRenderer.renderListEnd,
  renderListItem: _markdownRenderer.renderListItem,
  renderListStart: _markdownRenderer.renderListStart,
  renderNewLine: _markdownRenderer.renderNewLine,
  renderParagraph: _markdownRenderer.renderParagraph,
  renderSmallText: _markdownRenderer.renderSmallText,
  renderSourceCodeLink: _markdownRenderer.renderSourceCodeLink,
  renderStrikeThroughText: _markdownRenderer.renderStrikeThroughText,
  renderTitle: _markdownRenderer.renderTitle,
  renderUnderlineText: _markdownRenderer.renderUnderlineText,
  renderWarning: _markdownRenderer.renderWarning
};

export default markdownRenderer;