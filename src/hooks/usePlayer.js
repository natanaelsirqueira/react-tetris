import { useState, useCallback } from 'react'

import { getRandomTetromino, STAGE_WIDTH, checkCollision } from '../helpers/gameHelpers'
import TETROMINOES from '../helpers/tetrominoes'

export const usePlayer = () => {
  const [player, setPlayer] = useState({
    pos: { x: 0, y: 0 },
    tetromino: TETROMINOES[0].shape,
    collided: false
  })

  const updatePlayerPosition = ({ x, y, collided }) => {
    setPlayer(prev => ({
      ...prev,
      pos: { x: (prev.pos.x + x), y: (prev.pos.y + y) },
      collided
    }))
  }

  const rotate = useCallback((tetromino, dir) => {
    const transposedTetro = tetromino.map((_, index) =>
      tetromino.map(col => col[index])
    )

    return dir > 0 ? transposedTetro.map(row => row.reverse()) : transposedTetro.reverse()
  }, [])

  const rotatePlayer = useCallback((stage, dir) => {
    const playerClone = { ...player }

    playerClone.tetromino = rotate(playerClone.tetromino, dir)

    const pos = playerClone.pos.x
    let offset = 1

    while (checkCollision(playerClone, stage, { x: 0, y: 0 })) {
      playerClone.pos.x += offset

      offset = -(offset + (offset > 0 ? 1 : - 1))

      if (offset > playerClone.tetromino[0].length) {
        rotate(playerClone.tetromino, -dir)

        playerClone.pos.x = pos
      }
    }

    setPlayer(playerClone)
  }, [player, rotate])

  const dropPlayer = useCallback(stage => {
    const playerClone = { ...player }
    
    while (!checkCollision(playerClone, stage, { x: 0, y: 1 })) {
      playerClone.pos.y += 1
    }

    setPlayer({ ...playerClone, collided: true })
  }, [player])

  const resetPlayer = useCallback(() => {
    setPlayer({
      pos: { x: STAGE_WIDTH / 2 - 2, y: 0 },
      tetromino: getRandomTetromino().shape,
      collided: false
    })
  }, [])

  return [player, updatePlayerPosition, rotatePlayer, dropPlayer, resetPlayer]
}
