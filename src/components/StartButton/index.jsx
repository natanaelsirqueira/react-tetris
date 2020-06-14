import React from 'react'

import { Container } from './styles'

const StartButton = ({ callback }) => {
  return (
    <Container onClick={callback}>Start game</Container>
  )
}

export default StartButton
