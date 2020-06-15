import React, { useState, useCallback } from 'react'

import Stage from '../Stage'
import Display from '../Display'
import StartButton from '../StartButton'

import { useStage } from '../../hooks/useStage'
import { usePlayer } from '../../hooks/usePlayer'

import { createStage, checkCollision, Keycodes } from '../../helpers/gameHelpers'

import { TetrisWrapper, Tetris, Panel } from './styles'

const Game = () => {
  const [gameOver, setGameOver] = useState(false)

  const [player, updatePlayerPosition, resetPlayer] = usePlayer()
  const [stage, setStage] = useStage(player, resetPlayer)

  const startGame = useCallback(() => {
    setStage(createStage())
    resetPlayer()
    setGameOver(false)
  }, [resetPlayer, setStage])

  const moveInX = useCallback((direction) => {
    const intendedMove = { x: direction, y: 0 }

    if (!checkCollision(player, stage, intendedMove)) {
      updatePlayerPosition(intendedMove)
    }
  }, [player, stage, updatePlayerPosition])

  const drop = useCallback(() => {
    const intendedMove = { x: 0, y: 1 }

    if (checkCollision(player, stage, intendedMove)) {
      if (player.pos.y < 1) {
        setGameOver(true)
      }

      updatePlayerPosition({ x: 0, y: 0, collided: true })
    } else {
      updatePlayerPosition({ ...intendedMove, collided: false })
    }
  }, [player, stage, updatePlayerPosition])

  const handleKeyDown = useCallback(({ keyCode }) => {
    if (gameOver) return

    if (keyCode === Keycodes.LEFT_ARROW) {
      moveInX(-1)
    } else if (keyCode === Keycodes.RIGHT_ARROW) {
      moveInX(1)
    } else if (keyCode === Keycodes.DOWN_ARROW) {
      drop()
    }
  }, [drop, gameOver, moveInX])

  return (
    <TetrisWrapper role="button" tabIndex="0" onKeyDown={handleKeyDown}>
      <Tetris>
        <Stage stage={stage} />

        <Panel>
          {gameOver
            ? <Display gameOver={gameOver} text="Game Over" />
            : (
              <>
                <Display text="Score" />
                <Display text="Rows" />
                <Display text="Level" />
              </>
            )
          }
          <StartButton callback={startGame} />
        </Panel>
      </Tetris>
    </TetrisWrapper>
  )
}

export default Game
