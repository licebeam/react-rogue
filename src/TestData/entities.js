import { MAX_WORLD_WIDTH, MAX_WORLD_HEIGHT } from '../constants/constants';
export const entities = [
  { id: (MAX_WORLD_HEIGHT / 2) + (MAX_WORLD_WIDTH / 2), type: 'player', char: '@', img: 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80' },
  { id: (MAX_WORLD_HEIGHT / 2) + (MAX_WORLD_WIDTH / 2) + 2, type: 'apple', char: 'o', img: null },
]