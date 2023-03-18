import type { ASTNodeKinds } from "unwritten:renderer:markup/enums/nodes.js";


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
  children: ASTNodes[];
}

export interface TitleNode<Children extends ASTNodes[] = ASTNodes[]> extends ASTNode<ASTNodeKinds.Title> {
  children: Children;
  title: ASTNodes;
  /** Internal id of the entity */
  id?: number;
}

export interface LinkNode extends ASTNode<ASTNodeKinds.Link> {
  /** Internal id of the entity */
  id?: number;
  link?: string;
}

export interface SmallNode extends ASTNode<ASTNodeKinds.Small> {
  children: ASTNodes[];
}

export interface BoldNode extends ASTNode<ASTNodeKinds.Bold> {
  children: ASTNodes[];
}

export interface ItalicNode extends ASTNode<ASTNodeKinds.Italic> {
  children: ASTNodes[];
}

export interface StrikethroughNode extends ASTNode<ASTNodeKinds.Strikethrough> {
  children: ASTNodes[];
}
