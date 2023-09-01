import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import "./index.css";
import { Provider } from "react-redux";
import store from "./store";
import { CookiesProvider } from "react-cookie";
import { Auth0Provider } from "@auth0/auth0-react";
import history from "./utils/history";
import { getConfig } from "./config";

const onRedirectCallback = (appState) => {
  history.push(
    appState && appState.returnTo ? appState.returnTo : window.location.pathname
  );
};

const config = getConfig();

const providerConfig = {
  domain: config.domain,
  clientId: config.clientId,
  onRedirectCallback,
  authorizationParams: {
    redirect_uri: import.meta.env.VITE_LOGON_REDIRECT,
    ...(config.audience ? { audience: config.audience } : null),
    scope: "openid profile email"
  },
};



ReactDOM.createRoot(document.getElementById('root')).render(
  <CookiesProvider>
    <Auth0Provider {...providerConfig}>
      <Provider store={store}>
        <App />
      </Provider>
    </Auth0Provider>
  </CookiesProvider>,
)
