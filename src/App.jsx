import { MsalProvider, AuthenticatedTemplate, useMsal, UnauthenticatedTemplate } from '@azure/msal-react'
import { useNavigate } from 'react-router-dom'

import React from 'react'
import './assets/scss/styles.scss'

import Login from './pages/login/Login'
import { CustomNavigationClient } from './utils/NavigationClient'
import Home from './pages/home/Home'

const MainContent = () => {
  const { instance } = useMsal()

  return (
    <div className="App">
      <AuthenticatedTemplate>
        <Home />
      </AuthenticatedTemplate>
      <UnauthenticatedTemplate>
        <Login />
      </UnauthenticatedTemplate>
    </div>
  )
}

const App = ({ instance }) => {
  const navigate = useNavigate()
  const navigationClient = new CustomNavigationClient(navigate)
  instance.setNavigationClient(navigationClient)
  return (
    <MsalProvider instance={instance}>
      <MainContent />
    </MsalProvider>
  )
}

export default App
