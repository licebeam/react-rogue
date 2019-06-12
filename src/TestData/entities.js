import { MAX_WORLD_WIDTH, MAX_WORLD_HEIGHT } from '../constants/constants';
export const entities = [
  { id: (MAX_WORLD_HEIGHT / 2) + (MAX_WORLD_WIDTH / 2), type: 'player', char: '@', img: null },
  { id: (MAX_WORLD_HEIGHT / 2) + (MAX_WORLD_WIDTH / 2) + 2, type: 'rat', char: 'o', img: null },
  { id: (MAX_WORLD_HEIGHT / 2) + (MAX_WORLD_WIDTH / 2) + 3, type: 'rat', char: 'o', img: null },
  { id: (MAX_WORLD_HEIGHT / 2) + (MAX_WORLD_WIDTH / 2) + 4, type: 'rat', char: 'o', img: null },
  { id: (MAX_WORLD_HEIGHT / 2) + (MAX_WORLD_WIDTH / 2) + 1, type: 'rat', char: 'o', img: null },
  { id: (MAX_WORLD_HEIGHT / 2) + (MAX_WORLD_WIDTH / 2) + 5, type: 'rat', char: 'o', img: null },
  { id: (MAX_WORLD_HEIGHT / 2) + (MAX_WORLD_WIDTH / 2) + 6, type: 'rat', char: 'o', img: null },
]