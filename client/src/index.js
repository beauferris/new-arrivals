import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ChakraProvider } from "@chakra-ui/react"
import { ColorModeScript } from "@chakra-ui/react"
import theme from "./theme"
import {Auth0Provider} from "@auth0/auth0-react"


ReactDOM.render(
  <Auth0Provider
    
    domain='dev-wtn7hxuj.us.auth0.com'
    clientId='5FkDWQUeysnhLGU0rpXWmMiBxDWsa9da'
    redirectUri={window.location.origin}>
  <React.StrictMode>
    <ChakraProvider>
    <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <App />
    </ChakraProvider>
  </React.StrictMode>
  </Auth0Provider>,
  document.getElementById('root')

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
