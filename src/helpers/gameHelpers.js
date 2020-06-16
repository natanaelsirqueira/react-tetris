import TETROMINOES from './tetrominoes'

export const STAGE_WIDTH = 12;
export const STAGE_HEIGHT = 20;

export const Keycodes = {
  SPACE_BAR: 32,
  LEFT_ARROW: 37,
  UP_ARROW: 38,
  RIGHT_ARROW: 39,
  DOWN_ARROW: 40,
}

export const createStage = () => {
  const createRow = () => Array(STAGE_WIDTH).fill([0, 'clear'])

  return Array(STAGE_HEIGHT).fill(createRow())
}

export const getRandomTetromino = () => {
  const tetrominoes = 'IJLOSTZ';
  const randTetromino = tetrominoes[Math.floor(Math.random() * tetrominoes.length)];

  return TETROMINOES[randTetromino];
}

export const checkCollision = (player, stage, { x: moveX, y: moveY }) => {
  for (let y = 0; y < player.tetromino.length; y += 1) {
    for (let x = 0; x < player.tetromino[y].length; x += 1) {
      const isActualTetrominoCell = player.tetromino[y][x] !== 0

      if (isActualTetrominoCell) {
        const intendedY = y + player.pos.y + moveY
        const intendedX = x + player.pos.x + moveX

        const isLeavingGameArea = !stage[intendedY] || !stage[intendedY][intendedX]

        if (isLeavingGameArea || stage[intendedY][intendedX][1] !== 'clear') {
          return true;
        }
      }
    }
  }
};
