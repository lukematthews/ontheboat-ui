import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import store from "./store";
import { CookiesProvider } from "react-cookie";
import { AuthProvider } from "react-oidc-context";

const root = ReactDOM.createRoot(document.getElementById("root"));

const oidcConfig = {
  authority: "/auth/realms/ontheboat",
  client_id: "ontheboat-ui",
  redirect_uri: "http://localhost:3000/"
};

root.render(
  <React.StrictMode>
    <CookiesProvider>
      <Provider store={store}>
        <AuthProvider {...oidcConfig}>
          <App />
        </AuthProvider>
      </Provider>
    </CookiesProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
