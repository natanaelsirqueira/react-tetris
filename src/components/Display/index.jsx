import React from 'react'

import { Container } from './styles'

const Display = ({ gameOver, text }) => {
  return <Container gameOver={gameOver}>{text}</Container>
}

export default Display
