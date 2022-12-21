import React, { useContext } from 'react'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { AuthContext } from '../../context/Auth/context'
import Auth from './auth'
import { ConfirmSignUpPage } from './SignUp/confirm'
import { SignInPage } from './SignIn/signIn'
import { SignUpPage } from './SignUp'
import { ForgotPasswordPage } from './RecoveryPassword'
import { RecoveryCodePage } from './RecoveryPassword/code'

interface ProtectedRouteProps {
  children: React.ReactNode
}

export const Protected: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { user } = useContext(AuthContext)
  const { pathname } = useLocation()
  console.log('Passou aqui')
  if (!user) {
    console.log('No user')
    return (
      <Routes>
        <Route element={<Auth />} path="/">
          <Route path="sign-up">
            <Route element={<SignUpPage />} index />
            <Route element={<ConfirmSignUpPage />} path="confirm" />
          </Route>
          <Route path="sign-in">
            <Route element={<SignInPage />} index />
            <Route element={<ConfirmSignUpPage />} path="confirm" />
          </Route>
          <Route path="forgot-password">
            <Route element={<ForgotPasswordPage />} index />
            <Route element={<RecoveryCodePage />} path="confirm" />
          </Route>
        </Route>
      </Routes>
    )
  }
  if (pathname === '/') {
    return <Navigate to="/dashboard" />
  }

  return <>{children}</>
}
