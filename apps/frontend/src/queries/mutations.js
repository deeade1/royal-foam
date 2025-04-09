import { gql } from '@apollo/client';




export const SIGNUP = gql`
  mutation SignUpMutation($contact: String!, $password: String!) {
    signUp(input: { contact: $contact, password: $password }) {
      token
      user {
        id
        email
        phoneNumber
        photo
      }
    }
  }
`;


export const SIGNIN = gql`
  mutation SignInMutation($contact: String!, $password: String!) {
    signIn(input: { contact: $contact, password: $password }) {
      token
      refreshToken
      user {
        id
        email
        phoneNumber
        photo
        firstName
      }
    }
  }
 `;


export const UPDATE_USER = gql`
  mutation UpdateUser($input: UpdateUserInput!) {
    updateUser(input: $input) {
      user {
        id
        firstName
        lastName
        email
        addresses(first: 4) {
          edges {
            node {
              streetAddress1
              companyName
              city
              state
              country
            }
          }
        }
      }
      success
    }
  }
`;



export const VERIFYTOKEN = gql`
mutation VerifyTokenMutation{
  verifyToken(input: { token: $token }) {
    payload
  }
}
`;


export const REFRESHTOKEN = gql`
  mutation RefreshTokenMutation($refreshToken: String!) {
    refreshToken(input: { refreshToken: $refreshToken }) {
      token
      refreshToken
    }
  }
`;

export const REVOKETOKEN = gql`
  mutation RevokeTokenMutation($refreshToken: String!) {
    revokeToken(input: { refreshToken: $refreshToken }) {
      revoked
    }
  }
`;

export const LOGOUT = gql`
  mutation LogoutMutation($refreshToken: String!) {
    logout(input: { refreshToken: $refreshToken }) {
      success
    }
  }
`;

export const REVOKEALLTOKEN = gql`
  mutation RevokeAllTokenMutation {
    revokeAllTokensMutation(input: {}) {
      revokedTokens
    }
  }
`;

export const CREATE_ADDRESS = gql`
  mutation CreateAddressMutation( 
    $firstName: String!, 
    $lastName: String!, 
    $companyName: String!, 
    $streetAddress1: String!,
    $streetAddress2: String!,
    $city: String!,
    $cityArea: String!,
    $state: String!,
    $postalCode: String!,
    $country: String!,
    $countryArea: String!,
    $phone: String!,
    ) {
    addressMutation(input: {
      firstName: $firstName, 
      lastName: $lastName,
      companyName: $companyName, 
      streetAddress1: $streetAddress1,
      streetAddress2: $streetAddress2,
      city: $city,
      cityArea: $cityArea,
      state: $state,
      postalCode: $postalCode,
      country: $country,
      countryArea: $countryArea,
      phone: $phone,
    }) {
      address {
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
  }
`;



export const CREATE_POST = gql`
  mutation CreatePost($title: String!, $overview: String!, $content: String!, $featured: Boolean!) {
    createPost(input: {
      title: $title
      overview: $overview
      content: $content
      featured: $featured
    }) {
      post {
        id
        title
        overview
        content
        featured
        author {
          id
          email
          photo
        }
        categories(first: 10) {
          edges {
            node {
              id
              title
            }
          }
        }
      }
      success
    }
  }
`;
