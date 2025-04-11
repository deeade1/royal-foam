import { gql } from "@apollo/client";

// ✅ Get a single ContactUs entry by ID
export const GET_CONTACT_US = gql`
  query GetContactUs($id: ID!) {
    contactUs(id: $id) {
      id
      fullName
      email
      subject
      message
      agree
    }
  }
`;

// ✅ Get all ContactUs entries with pagination
export const GET_ALL_CONTACT_US = gql`
  query GetAllContactUs($first: Int!) {
    allContactUs(first: $first) {
      edges {
        node {
          id
          fullName
          email
          subject
          message
          agree
        }
      }
    }
  }
`;

// ✅ Get a single Subscribe entry by ID
export const GET_SUBSCRIBE = gql`
  query GetSubscribe($id: ID!) {
    subscribe(id: $id) {
      id
      email
    }
  }
`;

// ✅ Get all Subscribe entries with pagination
export const GET_ALL_SUBSCRIBE = gql`
  query GetAllSubscribe($first: Int!) {
    allSubscribe(first: $first) {
      edges {
        node {
          id
          email
        }
      }
    }
  }
`;
