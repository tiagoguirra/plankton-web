import React from 'react'
import { Btn } from './style'

interface ButtonProps {
  children: React.ReactNode
  disabled?: boolean
  variant?: 'contained' | 'outlined' | 'text'
  color?:
    | 'inherit'
    | 'primary'
    | 'secondary'
    | 'success'
    | 'error'
    | 'info'
    | 'warning'
  fullWidth?: boolean
  startIcon?: React.ReactNode
  submit?: boolean
  onClick?: () => void
}

export const Button: React.FC<ButtonProps> = ({
  children,
  disabled = false,
  variant = 'contained',
  color,
  fullWidth = false,
  startIcon,
  submit,
  onClick
}) => {
  return (
    <Btn
      type={submit ? 'submit' : 'button'}
      color={color}
      disabled={disabled}
      variant={variant}
      fullWidth={fullWidth}
      size="medium"
      startIcon={startIcon}
      onClick={onClick}
    >
      {children}
    </Btn>
  )
}
