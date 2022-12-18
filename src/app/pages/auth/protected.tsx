import React, { useContext } from 'react'
import { Route, Routes } from 'react-router-dom'
import { AuthContext } from '../../context/Auth/context'
import Auth from './auth'
import { ConfirmSignUpPage } from './confirmSignUp'
import { SignInPage } from './signIn'
import { SignUpPage } from './signUp'

interface ProtectedRouteProps {
  children: React.ReactNode
}

export const Protected: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { user } = useContext(AuthContext)

  if (!user)
    return (
      <Routes>
        <Route element={<Auth />} path="/">
          <Route element={<SignInPage />} path="signIn" />
          <Route element={<SignUpPage />} path="signUp" />
          <Route element={<ConfirmSignUpPage />} path="confirmSignUp" />
        </Route>
      </Routes>
    )

  return <>{children}</>
}
