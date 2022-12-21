import React, { useContext } from 'react'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { AuthContext } from './context/Auth/context'
import { AuthPage } from './pages/auth'
import { ForgotPasswordPage } from './pages/auth/RecoveryPassword'
import { RecoveryCodePage } from './pages/auth/RecoveryPassword/code'
import { SignInPage } from './pages/auth/SignIn'
import { SignUpPage } from './pages/auth/SignUp'
import { ConfirmSignUpPage } from './pages/auth/SignUp/confirm'

export const ProtectedRoute: React.FC<{
  children: React.ReactNode
}> = ({ children }) => {
  const { user, loading } = useContext(AuthContext)
  const { pathname } = useLocation()

  if (loading) return <div>Loading...</div>
  if (!user) {
    return (
      <Routes>
        <Route element={<AuthPage />} path="/auth">
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
        <Route element={<Navigate to="/auth/sign-up" />} path="*" />
      </Routes>
    )
  }

  console.log('pathname', pathname)

  if (pathname === '/' || pathname.startsWith('/auth')) {
    return <Navigate to="/dashboard" />
  }

  return <>{children}</>
}
