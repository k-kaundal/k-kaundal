import { gql } from '@apollo/client';

export const GET_POSTS = gql`
  query GetPosts($first: Int = 10) {
    posts(first: $first, where: { status: PUBLISH }) {
      edges {
        node {
          id
          title
          excerpt
          content
          date
          slug
          featuredImage {
            node {
              sourceUrl
              altText
            }
          }
        }
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
`;

export const GET_POST_BY_SLUG = gql`
  query GetPostByID($id: ID!) {
    post(id: $id, idType: SLUG) {
      id
      title
      content
      date
      slug
      featuredImage {
        node {
          sourceUrl
          altText
        }
      }
    }
  }
`;