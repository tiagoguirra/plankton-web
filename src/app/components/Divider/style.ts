import styled from 'styled-components'

interface Props {
  color?: string
}

export const Container = styled.div`
  width: 100%;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
`

export const LineDivider = styled.div`
  width: 100%;
  height: 1px;
  border-bottom: 1.5px solid #ccc;
`
export const LineText = styled.div`
  background-color: ${(props: Props) => (props.color ? props.color : '#fff')};
  padding: 0 10px;
  color: #ccc;
  position: absolute;
`
