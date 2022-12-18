import React from 'react'
import { Container, CardBox, ImageIcon } from './style'
import { Button } from '../../styles/Button'
import { Divider } from '../../styles/Divider'
import GithubIcon from '../../assets/svg/github-icon.svg'
import GitlabIcon from '../../assets/svg/gitlab-icon.svg'
import { Navigate, Outlet, useLocation } from 'react-router-dom'

const Auth: React.FC = () => {
  const { pathname } = useLocation()

  if (pathname === '/') return <Navigate to="/signIn" />
  return (
    <Container>
      <CardBox>
        <Outlet />
        <Divider label="or" />
        <Button
          color="inherit"
          variant="outlined"
          fullWidth
          startIcon={<ImageIcon src={GithubIcon} />}
        >
          Continue with Github
        </Button>
        <Button
          color="inherit"
          variant="outlined"
          fullWidth
          startIcon={<ImageIcon src={GitlabIcon} />}
        >
          Continue with Gitlab
        </Button>
      </CardBox>
    </Container>
  )
}

export default Auth
