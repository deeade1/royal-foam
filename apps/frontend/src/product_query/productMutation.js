import { gql } from "@apollo/client";

export const CREATE_PRODUCT_CATEGORY = gql`
  mutation CreateProductCategory(   // <-- Renamed here
    $name: String!, 
    $slug: String!, 
    $description: String!, 
    $parentId: ID, 
    $backgroundImageAlt: String
  ) {
    category_create(   // Ensure this matches your backend (snake_case)
      input: {
        name: $name,
        slug: $slug,
        description: $description,
        parent_id: $parentId,
        background_image_alt: $backgroundImageAlt
      }
    ) {
      success
      category_create {
        id
        name
        slug
        description
        parent {
          id
          name
        }
        backgroundImageAlt
        backgroundImage
      }
    }
  }
`;

export const CREATE_CATEGORY = gql`
  mutation CreateCategory(  // <-- Unique name
    $name: String!, 
    $slug: String!, 
    $description: String!, 
    $parent_id: ID, 
    $background_image_alt: String
  ) {
    category_create(
      input: {
        name: $name
        slug: $slug
        description: $description
        parent_id: $parent_id
        background_image_alt: $background_image_alt
      }
    ) {
      success
      category_create {
        id
        name
        slug
        description
        parent {
          id
          name
        }
        backgroundImageAlt
        backgroundImage
      }
    }
  }
`;




export const CREATE_PRODUCT = gql`
  mutation CreateProduct(
    $name: String!, 
    $slug: String!, 
    $description: String!, 
    $category: ID!, 
    $productType: ID, 
    $weight: Float, 
    $rating: Float, 
  ) {
    createProduct(
      input: {
        name: $name,
        slug: $slug,
        description: $description,
        category: $category,
        productType: $productType,
        weight: $weight,
        rating: $rating
      }
    ) {
      success
      product {
        id
        name
        slug
        description
        category {
          id
          name
        }
        productType {
          id
          name
        }
        weight
        rating
      }
      productImage {
        id
        image
      }
    }
  }
`;

