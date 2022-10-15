import { render } from "../index.js";
import { MarkupRenderer } from "../types/renderer.js";
import { htmlRenderer as _htmlRenderer } from "./renderer.js";

export const htmlRenderer: MarkupRenderer = {
  fileExtension: _htmlRenderer.fileExtension,
  name: _htmlRenderer.name,
  render,
  renderAnchorLink: _htmlRenderer.renderAnchorLink,
  renderBoldText: _htmlRenderer.renderBoldText,
  renderCode: _htmlRenderer.renderCode,
  renderHorizontalRule: _htmlRenderer.renderHorizontalRule,
  renderHyperLink: _htmlRenderer.renderHyperLink,
  renderItalicText: _htmlRenderer.renderItalicText,
  renderLineBreak: _htmlRenderer.renderLineBreak,
  renderList: _htmlRenderer.renderList,
  renderListEnd: _htmlRenderer.renderListEnd,
  renderListItem: _htmlRenderer.renderListItem,
  renderListStart: _htmlRenderer.renderListStart,
  renderNewLine: _htmlRenderer.renderNewLine,
  renderParagraph: _htmlRenderer.renderParagraph,
  renderSmallText: _htmlRenderer.renderSmallText,
  renderSourceCodeLink: _htmlRenderer.renderSourceCodeLink,
  renderStrikeThroughText: _htmlRenderer.renderStrikeThroughText,
  renderTitle: _htmlRenderer.renderTitle,
  renderUnderlineText: _htmlRenderer.renderUnderlineText,
  renderWarning: _htmlRenderer.renderWarning
};