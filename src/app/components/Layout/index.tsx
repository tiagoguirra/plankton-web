import React from 'react'
import { Outlet } from 'react-router-dom'
import { NavBar } from '../Navbar'
import { Content, Main } from './style'

export const Layout: React.FC = () => {
  return (
    <Main>
      <NavBar />
      <Content>
        <Outlet />
      </Content>
    </Main>
  )
}
