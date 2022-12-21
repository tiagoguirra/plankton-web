import { Avatar, Card } from '@mui/material'
import styled from 'styled-components'
import colors from '../../components/colors'

export const ContentBox = styled(Card)`
  width: 100%;
  background-color: #fff;
  padding: 20px;
`
export const CardHeader = styled.div`
  width: 100%;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 20px 0px;
`
export const UserHeader = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  flex-direction: column;
  margin-left: 20px;
  h2,
  h3 {
    margin: 0;
  }
  h2 {
    color: ${colors.blackLight};
  }
  h3 {
    color: #9d9d9d;
  }
`

export const UserAvatar = styled(Avatar)`
  width: 100px !important;
  height: 100px !important;
`

export const TabContent = styled.div`
  width: 100%;
  padding: 40px 0px 0px 0px;
`
export const Form = styled.form`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`
