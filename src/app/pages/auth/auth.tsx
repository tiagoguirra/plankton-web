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

const Auth: React.FC = () => {
  const { pathname } = useLocation()
  const { t } = useTranslation()
  const { error, signInWith, user } = useContext(AuthContext)
  console.log('pathname', pathname)
  if (user) return <Navigate to="/dashboard" />
  if (pathname === '/') return <Navigate to="/sign-in" />
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

export default Auth
