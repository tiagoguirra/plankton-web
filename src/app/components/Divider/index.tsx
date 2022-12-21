import React from 'react'
import { Container, LineDivider, LineText } from './style'

interface DividerProps {
  label?: string
  color?: string
}

export const Divider: React.FC<DividerProps> = ({ color, label }) => {
  return (
    <Container>
      <LineDivider />
      <LineText color={color}>{label}</LineText>
    </Container>
  )
}
