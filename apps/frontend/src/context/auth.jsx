
// Utility functions for token management
export function getJwtToken() {
    return localStorage.getItem('token');
}

export function setJwtToken(token) {
    localStorage.setItem('token', token); 
}

export function getRefreshToken() {
    return localStorage.getItem('refreshToken');
}

export function setRefreshToken(token) {
    localStorage.setItem('refreshToken', token); // Use localStorage instead of sessionStorage
}
