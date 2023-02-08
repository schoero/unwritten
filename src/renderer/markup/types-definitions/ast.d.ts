import type { ASTKinds } from "unwritten:renderer:markup/enums/ast.js";


export type ASTElements =
  | ASTAnchor
  | ASTHeading
  | ASTLink
  | ASTList
  | ASTListItem
  | ASTParagraph
  | ASTText;

export type ASTRoot = {
  content: ASTElements[];
  kind: ASTKinds;
};

export type ASTElement<T extends ASTKinds> = {
  kind: T;
};

export type ASTAnchor = ASTElement<ASTKinds.Anchor> & {
  text: string;
};

export type ASTList = ASTElement<ASTKinds.List> & {
  content: ASTListItem[];
};

export type ASTListItem = ASTElement<ASTKinds.ListItem> & {
  text: string;
};

export type ASTParagraph = ASTElement<ASTKinds.Paragraph> & {
};

export type ASTHeading = ASTElement<ASTKinds.Heading> & {
  text: string;
};

export type ASTText = ASTElement<ASTKinds.Text> & {
  text: string;
};

export type ASTLink = ASTElement<ASTKinds.Link> & {
};

export type RenderedFunctionForDocumentation = ASTRoot & {
  content: RenderedSignatureForDocumentation[];
};

export type RenderedSignatureForDocumentation = ASTRoot & {
  content: [
    title: ASTHeading,
    tags: ASTText,
    parametersAndReturnType: ASTList,
    description: ASTParagraph,
    remarks: ASTParagraph,
    example: ASTParagraph
  ];
};
