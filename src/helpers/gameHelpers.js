import TETROMINOES from './tetrominoes'

export const STAGE_WIDTH = 12;
export const STAGE_HEIGHT = 20;

export const createStage = () => {
  const createRow = () => Array(STAGE_WIDTH).fill([0, 'clear'])

  return Array(STAGE_HEIGHT).fill(createRow())
}

export const randomTetromino = () => {
  const tetrominoes = 'IJLOSTZ';
  const randTetromino = tetrominoes[Math.floor(Math.random() * tetrominoes.length)];

  return TETROMINOES[randTetromino];
}
