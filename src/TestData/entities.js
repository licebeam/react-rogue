import { MAX_WORLD_WIDTH, MAX_WORLD_HEIGHT } from '../constants/constants';
export const entities = [
  { id: (MAX_WORLD_HEIGHT / 2) + (MAX_WORLD_WIDTH / 2), sprite: 'player', char: '@' },
  { id: (MAX_WORLD_HEIGHT / 2) + (MAX_WORLD_WIDTH / 2) + 2, sprite: 'apple', char: 'o' },
]