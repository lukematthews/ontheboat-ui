import Keycloak from 'keycloak-js';

// Setup Keycloak instance as needed
// Pass initialization options as required or leave blank to load from 'keycloak.json'

const keycloakInstance = new Keycloak({
  url: process.env.REACT_APP_EXTERNAL_IP + "/auth",
  clientId: "ontheboat-ui",
  realm: "ontheboat",
  redirect_uri: process.env.REACT_APP_LOGON_REDIRECT,
});

export default keycloakInstance;