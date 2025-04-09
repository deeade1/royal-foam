import { ApolloClient, InMemoryCache, ApolloLink, split, gql, fromPromise } from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import { setContext } from "@apollo/client/link/context";

import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { createClient } from "graphql-ws";
import { getMainDefinition } from "@apollo/client/utilities";
import { getAccessToken, getRefreshToken, setTokens, clearTokens } from "./auth";

// Load environment variables
const httpUri = import.meta.env.VITE_GRAPHQL_HTTP_URI;
const wsUri = import.meta.env.VITE_GRAPHQL_WS_URI;

// Token Refresh Mutation
const REFRESH_TOKEN_MUTATION = gql`
  mutation RefreshToken($refreshToken: String!) {
    refreshToken(refreshToken: $refreshToken) {
      accessToken
      refreshToken
    }
  }
`;

// Function to fetch a new access token
const fetchNewToken = async () => {
  const refreshToken = getRefreshToken();
  if (!refreshToken) return null;

  const tempClient = new ApolloClient({
    uri: httpUri,
    cache: new InMemoryCache(),
  });

  try {
    const { data } = await tempClient.mutate({
      mutation: REFRESH_TOKEN_MUTATION,
      variables: { refreshToken },
    });

    const { accessToken, refreshToken: newRefresh } = data.refreshToken;
    setTokens(accessToken, newRefresh);
    console.log("🔑 Token refreshed");
    return accessToken;
  } catch (err) {
    console.error("Token refresh failed:", err);
    clearTokens();
    window.location.href = "/login";
    return null;
  }
};

// Error Link
const errorLink = onError(({ graphQLErrors, networkError, operation, forward }) => {
  if (graphQLErrors) {
    for (let err of graphQLErrors) {
      console.error(`[GraphQL error]: ${err.message}`);
      if (err.message === "Signature has expired" || err.message.toLowerCase().includes("token")) {
        return fromPromise(
          fetchNewToken().then(newAccessToken => {
            if (!newAccessToken) return null;
            operation.setContext(({ headers = {} }) => ({
              headers: {
                ...headers,
                authorization: `Bearer ${newAccessToken}`,
              },
            }));
            return true;
          })
        ).flatMap(() => forward(operation));
      }
    }
  }
  if (networkError) {
    console.error(`[Network error]: ${networkError}`);
  }
});

// Auth Link
const authLink = setContext((_, { headers }) => {
  const token = getAccessToken();
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

// HTTP Link
// Add this to your Apollo client setup
const httpLink = createUploadLink({
  uri: httpUri,
  credentials: 'include',  // This is correct
  headers: {
    'X-CSRFToken': getCSRFToken(),  // You'll need to implement getCSRFToken()
  },
});

// Implement a simple CSRF token getter
function getCSRFToken() {
  // This matches the cookie name we set in Django settings
  return document.cookie.split('; ')
    .find(row => row.startsWith('csrftoken='))
    ?.split('=')[1];
}
// WebSocket Link
const wsLink = new GraphQLWsLink(
  createClient({
    url: wsUri,
    connectionParams: () => ({
      authToken: getAccessToken(),
    }),
    lazy: true,
    retryAttempts: 5,
  })
);

// Split Link
const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return definition.kind === "OperationDefinition" && definition.operation === "subscription";
  },
  wsLink,
  ApolloLink.from([errorLink, authLink, httpLink]) // Chain error & auth first
);

const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache(),
});

export default client;
