import { Box, CardContent, Container, Tab, Tabs } from '@mui/material'
import React, { useContext, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { AuthContext } from '../../context/Auth/context'
import { TabPassword } from './password'
import { TabProfile } from './profile'
import {
  CardHeader,
  ContentBox,
  TabContent,
  UserAvatar,
  UserHeader
} from './style'

export const ProfilePage: React.FC = () => {
  const { user } = useContext(AuthContext)
  const { t } = useTranslation()
  const [activeTab, setActiveTab] = useState(0)

  const [firstName, secondName] = `${user?.name}`.split(' ')
  const initials = `${firstName[0]}${secondName[0]}`.toUpperCase()

  const Content = () => {
    switch (activeTab) {
      case 0:
        return <TabProfile />
      case 1:
        return <TabPassword />
      default:
        return <TabProfile />
    }
  }

  return (
    <Container maxWidth="sm">
      <ContentBox>
        <CardContent>
          <CardHeader>
            {user?.avatar ? (
              <UserAvatar alt={user?.name} src={user?.avatar} />
            ) : (
              <UserAvatar alt={user?.name}> {initials}</UserAvatar>
            )}
            <UserHeader>
              <h2>{user?.name}</h2>
              <h3>{user?.email}</h3>
            </UserHeader>
          </CardHeader>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs
              textColor="secondary"
              indicatorColor="secondary"
              value={activeTab}
              onChange={(e, value) => setActiveTab(value)}
              aria-label="basic tabs example"
            >
              <Tab label={t('profile.tab_profile')} />
              <Tab label={t('profile.tab_password')} />
              <Tab label={t('profile.tab_code_repositories')} />
            </Tabs>
          </Box>
          <TabContent>
            <Content />
          </TabContent>
        </CardContent>
      </ContentBox>
    </Container>
  )
}
