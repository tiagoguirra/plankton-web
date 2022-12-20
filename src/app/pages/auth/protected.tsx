import React, { useContext } from 'react'
import { Route, Routes } from 'react-router-dom'
import { AuthContext } from '../../context/Auth/context'
import Auth from './auth'
import { ConfirmSignUpPage } from './SignUp/confirm'
import { SignInPage } from './SignIn/signIn'
import { SignUpPage } from './SignUp'
import { ForgotPasswordPage } from './RecoveryPassword'
import { RecoveryCodePage } from './RecoveryPassword/code'
import { RecoveryPasswordPage } from './RecoveryPassword/password'

interface ProtectedRouteProps {
  children: React.ReactNode
}

export const Protected: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { user } = useContext(AuthContext)

  if (!user)
    return (
      <Routes>
        <Route element={<Auth />} path="/">
          <Route path="signUp">
            <Route element={<SignUpPage />} index />
            <Route element={<ConfirmSignUpPage />} path="confirm" />
          </Route>
          <Route path="signIn">
            <Route element={<SignInPage />} index />
            <Route element={<ConfirmSignUpPage />} path="confirm" />
          </Route>
          <Route path="forgot-password">
            <Route element={<ForgotPasswordPage />} index />
            <Route element={<RecoveryCodePage />} path="confirm" />
            <Route element={<RecoveryPasswordPage />} path="password" />
          </Route>
        </Route>
      </Routes>
    )

  return <>{children}</>
}
