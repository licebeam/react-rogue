import { MAX_WORLD_WIDTH, MAX_WORLD_HEIGHT } from '../constants/constants';
export const entities = [
  { id: (MAX_WORLD_HEIGHT / 2) + (MAX_WORLD_WIDTH / 2), type: 'player', char: '@', img: null },
  { id: (MAX_WORLD_HEIGHT / 2) + (MAX_WORLD_WIDTH / 2) + 2, type: 'apple', char: 'o', img: null },
  { id: (MAX_WORLD_HEIGHT / 2) + (MAX_WORLD_WIDTH / 2) + 3, type: 'apple', char: 'o', img: null },
  { id: (MAX_WORLD_HEIGHT / 2) + (MAX_WORLD_WIDTH / 2) + 4, type: 'apple', char: 'o', img: null },
  { id: (MAX_WORLD_HEIGHT / 2) + (MAX_WORLD_WIDTH / 2) + 1, type: 'apple', char: 'o', img: null },
  { id: (MAX_WORLD_HEIGHT / 2) + (MAX_WORLD_WIDTH / 2) + 5, type: 'apple', char: 'o', img: null },
  { id: (MAX_WORLD_HEIGHT / 2) + (MAX_WORLD_WIDTH / 2) + 6, type: 'apple', char: 'o', img: null },
]