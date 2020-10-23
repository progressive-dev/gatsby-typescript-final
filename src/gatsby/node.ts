import path from 'path';
import { createFilePath } from 'gatsby-source-filesystem';
import { GatsbyNode } from 'gatsby';
import { MarkdownRemark } from '../entities/markdown-remark';

export const onCreateNode: GatsbyNode['onCreateNode'] = ({ node, getNode, actions }) => {
  const { createNodeField } = actions
  if (node.internal.type === `MarkdownRemark`) {
    const slug = createFilePath({ node, getNode, basePath: `pages` })
    createNodeField({
      node,
      name: `slug`,
      value: slug,
    })
  }
}

type ResultData = {
    allMarkdownRemark: {
        edges: {
            node: Partial<MarkdownRemark>
        } []
    }
}

export const createPages: GatsbyNode['createPages'] = async ({ graphql, actions }) => {
    const { createPage } = actions
    const result = await graphql<ResultData>(`
      query {
        allMarkdownRemark {
          edges {
            node {
              fields {
                slug
              }
            }
          }
        }
      }
    `)

    if (!result.data) {
        throw new Error('Failed fetching blog posts');
    }

    result.data.allMarkdownRemark.edges.forEach(({ node }) => {
        if (!node?.fields) {
            return;
        }
        createPage({
            path: node.fields.slug,
            component: path.resolve(`./src/templates/blog-post.tsx`),
            context: {
            // Data passed to context is available
            // in page queries as GraphQL variables.
            slug: node.fields.slug,
            },
        })
    })
  }