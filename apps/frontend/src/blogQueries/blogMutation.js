import { gql } from "@apollo/client";
export const CREATE_TESTIMONIAL = gql`
  mutation CreateTestimonial($input: CreateTestimonialInput!) {
    createTestimonial(input: $input) {
      testimonial {
        id
        title
        body
        dateCreated
        media
      }
    }
  }
`;

export const UPDATE_TESTIMONIAL = gql`
  mutation UpdateTestimonial($input: UpdateTestimonialInput!) {
    updateTestimonial(input: $input) {
      testimonial {
        id
        title
        body
        media
      }
    }
  }
`;

export const DELETE_TESTIMONIAL = gql`
  mutation DeleteTestimonial($input: DeleteTestimonialInput!) {
    deleteTestimonial(input: $input) {
      success
    }
  }
`;


export const CREATE_TAG = gql`
  mutation CreateTag($name: String!) {
    createTag(name: $name) {
      tag {
        id
        name
      }
    }
  }
`;

import { gql } from '@apollo/client';

export const CREATE_REPLY = gql`
  mutation CreateReply($commentId: ID!, $name: String!, $body: String!) {
    createReply(commentId: $commentId, name: $name, body: $body) {
      reply {
        id
        name
        body
        createdAt
      }
    }
  }
`;


export const CREATE_CATEGORY = gql`
  mutation CreateCategory($name: String!, $slug: String, $description: String) {
    createCategory(name: $name, slug: $slug, description: $description) {
      category {
        id
        name
        slug
        description
      }
    }
  }
`;



export const CREATE_POST = gql`
  mutation CreatePost(
    $title: String!
    $subtitle: String
    $slug: String!
    $body: String!
    $categoryId: ID
    $authorId: ID!
    $tags: [String]
    $media: Upload!
  ) {
    createPost(
      title: $title
      subtitle: $subtitle
      slug: $slug
      body: $body
      categoryId: $categoryId
      authorId: $authorId
      tags: $tags
      media: $media
    ) {
      post {
        id
        title
        slug
        body
        category {
          id
          name
        }
        author {
          firstName
        }
        tags {
          edges {
            node {
              name
            }
          }
        }
        media
      }
    }
  }
`;



export const CREATE_COMMENT = gql`
  mutation CreateComment($postId: ID!, $name: String!, $body: String!) {
    createComment(postId: $postId, name: $name, body: $body) {
      comment {
        id
        name
        body
        createdAt
        post {
          id
          title
        }
      }
    }
  }
`;


