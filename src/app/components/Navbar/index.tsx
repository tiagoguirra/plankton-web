import { Avatar, Divider, IconButton, Menu, MenuItem } from '@mui/material'
import React, { useContext, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../context/Auth/context'
import { AvatarName, Logo, NavbarContainer } from './style'

export const NavBar: React.FC = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { user, signOut } = useContext(AuthContext)
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

  const [firstName, secondName] = `${user?.name}`.split(' ')

  const firstNameInitial = String(firstName).charAt(0)
  const secondNameInitial = String(secondName).charAt(0)

  const initials = `${firstNameInitial}${secondNameInitial}`.toUpperCase()

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  const onNavigate = (route: string) => {
    setAnchorEl(null)
    navigate(route)
  }

  const open = Boolean(anchorEl)

  return (
    <NavbarContainer>
      <Logo>
        <h2>Plankton.doc</h2>
      </Logo>
      <IconButton
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        {user?.avatar ? (
          <Avatar alt={user?.name} src={user?.avatar} />
        ) : (
          <Avatar alt={user?.name}> {initials}</Avatar>
        )}
      </IconButton>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button'
        }}
      >
        <AvatarName>
          <p>
            {firstName}&nbsp;{secondName}
          </p>
          <small>{user?.email}</small>
        </AvatarName>

        <Divider sx={{ my: 0.5 }} />
        <MenuItem onClick={() => onNavigate('/dashboard')}>{t('navbar.my_projects')}</MenuItem>
        <Divider sx={{ my: 0.5 }} />
        <MenuItem onClick={() => onNavigate('/profile')}>
          {t('navbar.profile')}
        </MenuItem>
        <MenuItem onClick={() => signOut()}>{t('navbar.logout')}</MenuItem>
      </Menu>
    </NavbarContainer>
  )
}
