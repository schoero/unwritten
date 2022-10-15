import { render } from "../index.js";
import { MarkupRenderer } from "../types/renderer.js";
import { plaintextRenderer as _plaintextRenderer } from "./renderer.js";

export const plaintextRenderer: MarkupRenderer = {
  fileExtension: _plaintextRenderer.fileExtension,
  name: _plaintextRenderer.name,
  render,
  renderAnchorLink: _plaintextRenderer.renderAnchorLink,
  renderBoldText: _plaintextRenderer.renderBoldText,
  renderCode: _plaintextRenderer.renderCode,
  renderHorizontalRule: _plaintextRenderer.renderHorizontalRule,
  renderHyperLink: _plaintextRenderer.renderHyperLink,
  renderItalicText: _plaintextRenderer.renderItalicText,
  renderLineBreak: _plaintextRenderer.renderLineBreak,
  renderList: _plaintextRenderer.renderList,
  renderListEnd: _plaintextRenderer.renderListEnd,
  renderListItem: _plaintextRenderer.renderListItem,
  renderListStart: _plaintextRenderer.renderListStart,
  renderNewLine: _plaintextRenderer.renderNewLine,
  renderParagraph: _plaintextRenderer.renderParagraph,
  renderSmallText: _plaintextRenderer.renderSmallText,
  renderSourceCodeLink: _plaintextRenderer.renderSourceCodeLink,
  renderStrikeThroughText: _plaintextRenderer.renderStrikeThroughText,
  renderTitle: _plaintextRenderer.renderTitle,
  renderUnderlineText: _plaintextRenderer.renderUnderlineText,
  renderWarning: _plaintextRenderer.renderWarning
};