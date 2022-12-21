import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Layout } from './components/Layout'
import { AuthProvider } from './context/Auth/provider'
import { DashboardPage } from './pages/dashboard'
import { ProfilePage } from './pages/profile'
import { ProtectedRoute } from './protected'

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          element={
            <AuthProvider>
              <ProtectedRoute>
                <Layout />
              </ProtectedRoute>
            </AuthProvider>
          }
          path="*"
        >
          <Route element={<ProfilePage />} path="profile/*" />
          <Route element={<DashboardPage />} path="dashboard" />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default Router
