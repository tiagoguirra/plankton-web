import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { AuthProvider } from './context/Auth/provider'
import Auth from './pages/auth/auth'
import { Protected } from './pages/auth/protected'

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          element={
            <AuthProvider>
              <Protected>
                <Auth />
              </Protected>
            </AuthProvider>
          }
          path="*"
        />
      </Routes>
    </BrowserRouter>
  )
}

export default Router
