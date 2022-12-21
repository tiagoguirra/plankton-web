import React, { useEffect, useState } from 'react'
import { AlertColor, IconButton } from '@mui/material'
import { Close } from '@mui/icons-material'
import { AlertCard, AlertCollapse } from './style'

interface AlertProps {
  text?: string
  type?: AlertColor
}

export const AlertMessage: React.FC<AlertProps> = ({ text, type = 'info' }) => {
  const [open, setOpen] = useState(true)

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
        {text}
      </AlertCard>
    </AlertCollapse>
  )
}
