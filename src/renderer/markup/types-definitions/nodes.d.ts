import type { ASTNodeKinds } from "unwritten:renderer/markup/enums/nodes.js";


export type ASTNodes =
  | AnchorNode
  | ASTNodes[]
  | BoldNode
  | ContainerNode
  | ItalicNode
  | LinkNode
  | ListNode
  | ParagraphNode
  | SmallNode
  | StrikethroughNode
  | TitleNode
  | string;

interface ASTNode<T extends ASTNodeKinds> {
  children: ASTNodes | ASTNodes[];
  kind: T;
}

/** Container node children will be joined with new lines */
export interface ContainerNode extends ASTNode<ASTNodeKinds.Container> {
}

export interface AnchorNode extends ASTNode<ASTNodeKinds.Anchor> {
  id: string;
}

export interface ListNode<Children extends ASTNodes[] = ASTNodes[]> extends ASTNode<ASTNodeKinds.List> {
  children: Children;
}

export interface ParagraphNode extends ASTNode<ASTNodeKinds.Paragraph> {
}

export interface TitleNode<Children extends ASTNodes[] = ASTNodes[]> extends ASTNode<ASTNodeKinds.Title> {
  children: Children;
  title: string;
  id?: string;
}

export interface LinkNode extends ASTNode<ASTNodeKinds.Link> {
  children: string;
  link: string;
}

export interface SmallNode extends ASTNode<ASTNodeKinds.Small> {
}

export interface BoldNode extends ASTNode<ASTNodeKinds.Bold> {
}

export interface ItalicNode extends ASTNode<ASTNodeKinds.Italic> {
}

export interface StrikethroughNode extends ASTNode<ASTNodeKinds.Strikethrough> {
}
