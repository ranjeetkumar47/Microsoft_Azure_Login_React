import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter as Router } from 'react-router-dom'
import { msalConfig } from './config/authConfig'
import { PublicClientApplication, EventType } from '@azure/msal-browser'

// MSAL should be instantiated outside of the component tree to prevent re-instantiation on re-renders.
const msalInstance = new PublicClientApplication(msalConfig)

// Default to using the first account if no account is active on page load
if (!msalInstance.getActiveAccount() && msalInstance.getAllAccounts().length > 0) {
  // Account selection logic is app dependent. Adjust as needed for different use cases.
  msalInstance.setActiveAccount(msalInstance.getAllAccounts()[0])
}

// Listen for sign-in event and set active account
msalInstance.addEventCallback((event) => {
  if (event.eventType === EventType.LOGIN_SUCCESS && event.payload.account) {
    const account = event.payload.account
    msalInstance.setActiveAccount(account)
  }
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <Router>
    <App instance={msalInstance} />
  </Router>
)
