import { useMsal } from '@azure/msal-react'
import { Button } from '@mui/material'
import React, { useEffect, useState } from 'react'

const Home = () => {
  const { accounts, instance } = useMsal()
  const [name, setName] = useState('')
  const [authToken, setauthToken] = useState('')

  const handleLogoutRedirect = () => {
    instance.logoutRedirect().catch((error) => console.log(error))
  }

  useEffect(() => {
    if (accounts.length > 0) {
      const activeAccount = accounts[0]
      const { idTokenClaims } = activeAccount
      const request = {
        scopes: ['user.read'],
        account: activeAccount
      }
      const getTOken = async () => {
        const response = await instance.acquireTokenSilent(request)
        setauthToken(response.accessToken)
      }
      getTOken()
      setName(idTokenClaims?.name || idTokenClaims?.preferred_username)
    }
  }, [accounts, instance])

  return (
    <div>
      <h1>Login Sucess</h1>
      <h1>Welcome Mr. {name}</h1>
      <p>
        Auth Token is : <small>{authToken}</small>
      </p>

      <Button variant="contained" onClick={handleLogoutRedirect}>
        Logout
      </Button>
    </div>
  )
}

export default Home
