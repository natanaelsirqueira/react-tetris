import React from 'react'

import TETROMINOES from '../../helpers/tetrominoes'

import { Container } from './styles'

const Cell = ({ type }) => {
  return <Container type={type} color={TETROMINOES[type].color} />
}

export default React.memo(Cell)
