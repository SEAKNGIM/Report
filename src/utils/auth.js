import * as jwtDecode from 'jwt-decode';

export const isTokenValid = (token) => {
  try {
    const decodedToken = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    return decodedToken.exp >= currentTime;
  } catch (error) {
    console.error('Error decoding token:', error);
    return false;
  }
};