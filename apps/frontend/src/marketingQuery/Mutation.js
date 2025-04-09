import { gql } from "@apollo/client";

// Mutation for Contact Us
export const CREATE_CONTACT_US = gql`
  mutation CreateContactUs($input: CreateContactUsInput!) {
    createContactUs(input: $input) {
      contactUs {
        id
        fullName
        email
        subject
        message
        agree
      }
    }
  }
`;

// Mutation for Subscribe
export const CREATE_SUBSCRIBE = gql`
  mutation CreateSubscribe($input: CreateSubscribeInput!) {
    createSubscribe(input: $input) {
      subscribe {
        id
        email
      }
    }
  }
`;
