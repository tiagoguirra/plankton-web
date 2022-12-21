import React, { useContext } from 'react'
import { Container, CardBox, ImageIcon } from './style'
import { Button } from '../../components/Button'
import { Divider } from '../../components/Divider'
import GithubIcon from '../../assets/svg/github-icon.svg'
import GitlabIcon from '../../assets/svg/gitlab-icon.svg'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { AuthContext } from '../../context/Auth/context'
import { AlertMessage } from '../../components/Alert'
import { useTranslation } from 'react-i18next'

export const AuthPage: React.FC = () => {
  const { pathname } = useLocation()
  const { t } = useTranslation()
  const { error, signInWith, user } = useContext(AuthContext)

  if (user) return <Navigate to="/dashboard" />
  if (pathname === '/auth') return <Navigate to="/auth/sign-in" />
  return (
    <Container>
      <CardBox>
        <Outlet />
        <AlertMessage text={t(error || '') || ''} type="error" />
        <Divider label="or" />
        <Button
          color="inherit"
          variant="outlined"
          fullWidth
          startIcon={<ImageIcon src={GithubIcon} />}
          onClick={() => signInWith('Github-staging')}
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

