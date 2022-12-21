import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Layout } from './components/Layout'
import { AuthProvider } from './context/Auth/provider'
import { Protected } from './pages/auth/protected'
import { DashboardPage } from './pages/dashboard'

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          element={
            <AuthProvider>
              <Protected>
                <Layout />
              </Protected>
            </AuthProvider>
          }
          path="*"
        >
          <Route element={<DashboardPage />} path="dashboard" />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default Router
