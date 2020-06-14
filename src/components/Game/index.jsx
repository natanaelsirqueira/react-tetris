import React, { useCallback } from 'react'

import Stage from '../Stage'
import Display from '../Display'
import StartButton from '../StartButton'

import { useStage } from '../../hooks/useStage'
import { usePlayer } from '../../hooks/usePlayer'

import { createStage } from '../../helpers/gameHelpers'

import { TetrisWrapper, Tetris, Panel } from './styles'

const Game = () => {
  const [player, updatePlayer, resetPlayer] = usePlayer()
  const [stage, setStage] = useStage(player, resetPlayer)

  const startGame = useCallback(() => {
    setStage(createStage())
    resetPlayer()
  }, [resetPlayer, setStage])

  const movePlayer = useCallback((dir) => {
    updatePlayer({ x: dir, y: 0 })
  }, [updatePlayer])

  const drop = useCallback(() => {
    updatePlayer({ x: 0, y: 1, collided: false })
  }, [updatePlayer])

  const dropPlayer = useCallback(() => {
    drop()
  }, [drop])

  const move = useCallback(({ keyCode }) => {
    if (keyCode === 37) { // left arrow
      movePlayer(-1)
    } else if (keyCode === 39) { // right arrow
      movePlayer(1)
    } else if (keyCode === 40) { // down arrow
      dropPlayer()
    }
  }, [dropPlayer, movePlayer])

  return (
    <TetrisWrapper role="button" tabIndex="0" onKeyDown={e => move(e)}>
      <Tetris>
        <Stage stage={stage} />

        <Panel>
          <Display text="Score" />
          <Display text="Rows" />
          <Display text="Level" />

          <StartButton callback={startGame} />
        </Panel>
      </Tetris>
    </TetrisWrapper>
  )
}

export default Game
