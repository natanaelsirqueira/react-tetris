import React from 'react'

import Stage from '../Stage'
import Display from '../Display'
import StartButton from '../StartButton'

import { createStage } from '../../helpers/gameHelpers'

import { TetrisWrapper, Tetris, Panel } from './styles'

const Game = () => {
  const stage = createStage()

  return (
    <TetrisWrapper>
      <Tetris>
        <Stage stage={stage} />

        <Panel>
          <Display text="Score"></Display>
          <Display text="Rows"></Display>
          <Display text="Level"></Display>

          <StartButton />
        </Panel>
      </Tetris>
    </TetrisWrapper>
  )
}

export default Game
