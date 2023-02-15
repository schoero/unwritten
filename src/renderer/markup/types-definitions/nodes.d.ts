import type { ASTNodeKinds } from "unwritten:renderer/markup/enums/nodes.js";


export type ASTNodes =
  | AnchorNode
  | ContainerNode
  | LinkNode
  | ListNode
  | ParagraphNode
  | SmallNode
  | TitleNode
  | string;

interface ASTNode<T extends ASTNodeKinds> {
  content: ASTNodes | ASTNodes[];
  kind: T;
}

export interface ContainerNode extends ASTNode<ASTNodeKinds.Container> {
}

export interface AnchorNode extends ASTNode<ASTNodeKinds.Anchor> {
  content: string;
  id: string;
}

export interface ListNode extends ASTNode<ASTNodeKinds.List> {
  content: ASTNodes[];
}

export interface ParagraphNode extends ASTNode<ASTNodeKinds.Paragraph> {
  content: string;
}

export interface TitleNode extends ASTNode<ASTNodeKinds.Title> {
  content: string;
  id?: string;
}

export interface LinkNode extends ASTNode<ASTNodeKinds.Link> {
  content: string;
  link: string;
}

export interface SmallNode extends ASTNode<ASTNodeKinds.Small> {
  content: string;
}
