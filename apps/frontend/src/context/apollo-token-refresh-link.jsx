import { TokenRefreshLink } from "apollo-link-token-refresh";

import { getJwtToken, getRefreshToken, setJwtToken } from "./auth"
import { jwtDecode } from "jwt-decode";

export function makeTokenRefreshLink() {
    return new TokenRefreshLink({
        // Indicates the current state of access token expiration
        // If token not yet expired or user doesn't have a token (guest) true should be returned
        isTokenValidOrUndefined: () => {
            return new Promise((resolve) => {
                //console.log("isTokenValidOrUndefined");
                const token = getJwtToken();
        
                // If there is no token, the user is not logged in
                // We return true here, because there is no need to refresh the token
                if (!token) {
                    resolve(true);
                }
        
                // Otherwise, we check if the token is expired
                const claims = jwtDecode(token);
                const expirationTimeInSeconds = claims.exp * 1000;
                const now = new Date();
                const isValid = expirationTimeInSeconds >= now.getTime();
        
                // Return true if the token is still valid, otherwise false and trigger a token refresh
                resolve(isValid);
            });
        },
        
        
        fetchAccessToken: () => {
            const token = jwtDecode(getJwtToken())
            console.log("fetchAccessToken token:", token)
        
            const refreshToken = getRefreshToken()
            //const fingerprintHash = token?.["claims"]?.["X-User-Fingerprint"]
        
            return fetch('http://localhost:8000/graphql', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    query: `
                      query RefreshToken($refreshToken: String!) {
                        refreshToken(refreshToken: $refreshToken) {
                          token
                        }
                      }
                    `,
                    variables: {
                        refreshToken,
                    },
                }),
            }).then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch access token');
                }
                return response.json();
            }).then(result => {
                return result;
            });
        },
        
        handleFetch: (accessToken) => {
            const claims = jwtDecode(accessToken)
            console.log("handleFetch", { accessToken, claims })
            setJwtToken(accessToken)
        },
        handleResponse: (operation, accessTokenField) => (response) => {
            // here you can parse response, handle errors, prepare returned token to
            // further operations
            // returned object should be like this:
            // {
            //    access_token: 'token string here'
            // }
            console.log("handleResponse", { operation, accessTokenField, response })
            return { access_token: response.refreshToken.token }
        },
        handleError: (err) => {
            console.warn("Your refresh token is invalid. Try to reauthenticate.")
            console.error(err)
            // Remove invalid tokens
            localStorage.removeItem("token")
            localStorage.removeItem("refreshToken")
        },
    })
}