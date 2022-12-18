import { OutlinedInput } from '@mui/material'
import styled from 'styled-components'
import colors from '../../styles/colors'

export const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  background: ${colors.purpleLigth};
`

export const Form = styled.form`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`

export const CardBox = styled.div`
  width: 400px;
  height: 100%;
  padding: 100px;
  position: relative;
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`
export const ImageIcon = styled.img`
  width: 20px;
  height: 20px;
`
export const Header = styled.div`
  width: 100%;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
`
export const Helper = styled.div`
  width: 100%;
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ccc;
  font-size: 12px;
`

export const Footer = styled.div`
  width: 100%;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ccc;
`
export const CodeForm = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding: 30px;
`

export const CodeInput = styled(OutlinedInput)`
  border-radius: 10px !important;
  width: 40px;
`
