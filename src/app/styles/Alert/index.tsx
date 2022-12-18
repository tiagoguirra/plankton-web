import React, { useEffect } from 'react'
import { AlertColor, IconButton } from '@mui/material'
import { Close } from '@mui/icons-material'
import { useTranslation } from 'react-i18next'
import { AlertCard, AlertCollapse } from './style'

interface AlertProps {
  text?: string
  type?: AlertColor
}

export const AlertMessage: React.FC<AlertProps> = ({ text, type = 'info' }) => {
  const { t } = useTranslation()
  const [open, setOpen] = React.useState(true)

  useEffect(() => {
    setOpen(true)
  }, [text])

  if (!text) return null

  return (
    <AlertCollapse in={open}>
      <AlertCard
        action={
          <IconButton
            aria-label="close"
            color="inherit"
            size="small"
            onClick={() => {
              setOpen(false)
            }}
          >
            <Close fontSize="inherit" />
          </IconButton>
        }
        severity={type}
      >
        {t(text)}
      </AlertCard>
    </AlertCollapse>
  )
}
