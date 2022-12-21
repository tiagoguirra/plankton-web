import styled from 'styled-components'

import colors from '../colors'

export const NavbarContainer = styled.div`
  height: 80px;
  background-color: ${colors.blackLight};
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 30px 0;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  border-bottom: 3px solid ${colors.green};
`

export const Logo = styled.div`
  width: 200px;
  height: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  color: ${colors.green};
  & h2 {
    margin: 0;
  }
`
export const AvatarName = styled.div`
  width: 100%;
  padding: 10px 15px;
  p {
    margin: 0;
  }
`
