import { Link } from '@mui/material'
import styled from 'styled-components'
import colors from '../../../styles/colors'

export const ForgotPassword = styled.div`
  width: 100%;
  padding: 0px 0px 20px 0px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`
export const ForgotLink = styled(Link)`
  color: #ccc !important;
  font-size: 13px;
  transition: 0.2s all ease-in-out;
  cursor: pointer;
  &:hover {
    color: ${colors.black} !important;
  }
`
