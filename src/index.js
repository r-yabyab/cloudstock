import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { HashRouter } from 'react-router-dom'
import { inject } from '@vercel/analytics'
import { Auth0Provider } from "@auth0/auth0-react"
// import './serviceWorker'

const root = ReactDOM.createRoot(document.getElementById('root'));
inject()
root.render(
  <>
    <Auth0Provider
      domain="dev-bxpbdydalm6tmklv.us.auth0.com"
      // domain="https://stockshapes-client.vercel.app/"
      clientId="pe9F7eTgriQUNTJg9iXBNwtvksINW7Kw"
      authorizationParams={{
        redirect_uri: window.location.origin
      }}
    >
      {/* <React.StrictMode> */}
      <HashRouter>
        <App />
      </HashRouter>
      {/* </React.StrictMode> */}
    </Auth0Provider>
  </>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
