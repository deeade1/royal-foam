import { gql } from '@apollo/client';


export const GET_PRODUCTS = gql`
  query GetProducts($first: Int!) {
    allProducts(first: $first) {
      edges {
        node {
          id
          name
          slug
          description
          createdAt
          rating
          productCategory {
          id
          name
        }
          media(first: 100) {
            edges {
              node {
                image
                alt
                type
              }
            }
          }
        }
      }
    }
  }
`;

export const GET_PRODUCT = gql`
  query GetProductBySlug($slug: String!) {
    productBySlug(slug: $slug) {
      name
      slug
      description
      createdAt
      rating
      productCategory {
        id
        name
        slug
        parent {
          id
          name
          slug
          parent {
            id
            name
            slug
          }
        }
      }
      media(first: 20) {
        edges {
          node {
            image
            alt
            type
          }
        }
      }
    }
  }
`;


export const SEARCH_PRODUCTS = gql`
  query SearchProducts($name: String!) {
    searchProducts(name: $name) {
      id
      name
      slug 
    }
  }
`;

export const GET_PRODUCT_MEDIA = gql`
  query GetProductMedia($first: Int!) {
    allProductMedia(first: $first) {
      edges {
        node {
          id
          image
          alt
          type
        }
      }
    }
  }
`;
