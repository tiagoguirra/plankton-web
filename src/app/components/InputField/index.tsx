import { Visibility, VisibilityOff } from '@mui/icons-material'
import { FormHelperText, IconButton, InputAdornment } from '@mui/material'
import React, { useState } from 'react'
import { Control, Input, Label } from './style'

interface InputTextProps {
  label: string
  name: string
  type: 'text' | 'email' | 'password'
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  error?: string
  touched?: boolean
  disabled?: boolean
  defaultValue?: string
}

export const InputField: React.FC<InputTextProps> = ({
  label,
  type,
  name,
  error,
  touched,
  onChange = () => {},
  disabled,
  defaultValue = ''
}) => {
  const [showPassword, setShowPassword] = useState(false)

  const isPassword = type === 'password'
  const hasError = error && touched ? true : false
  const helperText = hasError ? error : ''

  const passwordAdornment = (
    <InputAdornment position="end">
      <IconButton
        aria-label="toggle password visibility"
        onClick={() => setShowPassword(!showPassword)}
        onMouseDown={() => setShowPassword(!showPassword)}
        edge="end"
      >
        {showPassword ? <VisibilityOff /> : <Visibility />}
      </IconButton>
    </InputAdornment>
  )
  return (
    <Control fullWidth variant="outlined">
      <Label shrink htmlFor={name}>
        {label}
      </Label>
      <Input
        defaultValue={defaultValue}
        type={showPassword ? 'text' : type}
        name={name}
        size="small"
        onChange={onChange}
        error={hasError}
        fullWidth
        endAdornment={isPassword ? passwordAdornment : null}
        disabled={disabled}
      />
      <FormHelperText>{helperText}</FormHelperText>
    </Control>
  )
}
