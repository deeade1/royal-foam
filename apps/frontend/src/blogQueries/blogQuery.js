import { gql } from '@apollo/client';

export const GET_ALL_POSTS = gql`
  query GetAllPosts($first: Int!) {
    allPosts(first: $first) {
      edges {
        node {
          title
          subtitle
          slug
          body
          dateCreated
          media
          author {
            id
            firstName
            isStaff
          }
          tags(first: $first) {
            edges {
              node {
                id
                name
              }
            }
          }
          category {
            id
            name
          }
          comments(first: $first) {
            edges {
              node {
                id
                name
                body
                createdAt
              }
            }
          }
        }
      }
    }
  }
`;

export const GET_POST = gql`
  query GetPost($slug: String!) {
  postBySlug(slug: $slug) {
    id
    title
    subtitle
    body
    media {
      image
    }
    dateCreated
    author {
      firstName
    }
  }
}
`;



export const GET_ALL_TESTIMONIALS = gql`
  query GetAllTestimonials($first: Int!) {
    allTestimonials(first: $first) {
      edges {
        node {
          id
          title
          body
          dateCreated
          author {
            username
          }
          media
        }
      }
    }
  }
`;

export const GET_TESTIMONIAL_BY_ID = gql`
  query GetTestimonial($id: ID!) {
    testimonial(id: $id) {
      id
      title
      body
      dateCreated
      author {
        username
      }
      media
    }
  }
`;



