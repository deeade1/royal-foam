import { gql } from '@apollo/client';


// Query with hardcoded user id
/*export const GET_USER_PROFILE = gql`
  query {
    user(id: "VXNlck5vZGU6MQ==") {
      email
      firstName
      lastName
      group
    }
  }
`;*/

// Query with variable user id (commented out for now)

export const GET_USER = gql`
  query GetUser($userId: ID!) {
    user(id: $userId) {
      id
      email
      phoneNumber
      
    }
  }
`;


export const GET_ADDRESS = gql`
  query GetAddress ($addresId: ID!){
    address(id: $addressId) {
      id
      city
      state
      country
    }
  }
`;

export const GET_ALL_USERS = gql`
  query {
    allUsers(first: 3) {
      edges {
        node {
          id
          email
          firstName
          lastName
          groups 
          group
          addresses(first: 2) {
            edges {
              node {
                id
              }
            }
          }
        }
      }
    }
  }
`;

const GET_ADDRESS_BY_ID_QUERY = gql`
  query GetAddressById($id: ID!) {
    address(id: $id) {
      id
      firstName
      lastName
      companyName
      streetAddress1
      streetAddress2
      city
      cityArea
      state
      postalCode
      country
      countryArea
      phone
    }
  }
`;


