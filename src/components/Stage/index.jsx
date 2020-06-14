import React from 'react'

import Cell from '../Cell'

import { Container } from './styles'

const Stage = ({ stage }) => {
  return (
    <Container width={stage[0].length} height={stage.length}>
      {stage.map(row => (
        row.map((cell, index) => (
          <Cell key={index} type={cell[0]} />
        ))
      ))}
    </Container>
  )
}

export default Stage
