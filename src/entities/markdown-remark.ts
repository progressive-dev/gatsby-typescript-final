export type MarkdownRemark = {
    id: string;
    frontmatter: {
      title: string;
      date: string;
    }
    excerpt: string;
    html: string;
    fields: {
      slug: string;
    }
  }