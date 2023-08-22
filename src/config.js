export function getConfig() {
  return {
    domain: process.env.REACT_APP_AUTH_DOMAIN,
    clientId: process.env.REACT_APP_AUTH_CLIENT_ID,
    audience: process.env.REACT_APP_AUTH_AUDIENCE,
  };
}
