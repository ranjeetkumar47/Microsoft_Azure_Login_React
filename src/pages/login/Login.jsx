import React, { useState } from 'react'
import AccountBoxIcon from '@mui/icons-material/AccountBox'
import { useMsal } from '@azure/msal-react'
import { loginRequest } from '../../config/authConfig'

const Login = () => {
  const { instance } = useMsal()
  const [loading, setLoading] = useState(false)
  const handleRedirect = () => {
    setLoading(true)
    instance
      .loginRedirect({
        ...loginRequest,
        prompt: 'create'
      })
      .catch((error) => console.log(error))
      .finally(() => setLoading(false))
  }
  return (
    <div className="container-fluid login-page-background">
      <div className="login_container">
        <div className="inner_container">
          <h1>Microsoft Azure Login In React Js</h1>
          <p>Click below button to login using Azure AD</p>
          <button className="login-azure-btn" onClick={handleRedirect}>
            <AccountBoxIcon /> Login with Azure AD{' '}
          </button>
        </div>
      </div>
    </div>
  )
}

export default Login
