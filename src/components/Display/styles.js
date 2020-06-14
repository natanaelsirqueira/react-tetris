import styled from 'styled-components'

export const Container = styled.div`
  color: ${props => (props.gameOver ? 'red' : '#999')};
  background: #000;
  border: 4px solid #333;
  border-radius: 20px;
  width: 100%;
  padding: 20px;
  margin: 0 0 20px 0;
  font-family: Pixel, Arial, Helvetica, sans-serif;
  font-size: 0.8rem;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  min-height: 30px;
`
