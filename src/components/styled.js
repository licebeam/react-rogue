import styled from 'styled-components';
import { MAX_WORLD_WIDTH, TILE_SIZE } from '../constants/constants';

export const TileContainer = styled.div`
  display: grid;
  grid-template-columns: ${`repeat(${MAX_WORLD_WIDTH}, ${TILE_SIZE}px)`};
`

export const Tile = styled.div`
  display: flex;
  flex-direction: column;
  align-content: center;
  justify-content: center;
  text-align: center;
  z-index: 0;
  height: ${`${TILE_SIZE}px`};
  width: ${`${TILE_SIZE}px`};
  background-color: ${props => {
    switch (props.tile) {
      //TILES
      case 'wall':
        return 'black'
      case 'ground':
        return 'green'
      case 'rock':
        return 'grey'
      case 'tree':
        return 'darkgreen'
      //ENTITIES
      case 'player':
        return 'black'
      case 'rat':
        return 'black'
      //ITEMS
      case 'apple':
        return 'green'
      default:
        break;
    }
  }};
    color: ${props => {
    switch (props.tile) {
      //TILES
      case 'wall':
        return 'grey'
      case 'ground':
        return 'darkgreen'
      case 'rock':
        return 'darkgrey'
      case 'tree':
        return 'green'
      //ENTITIES
      case 'player':
        return 'orange'
      case 'rat':
        return 'red'
      //ITEMS
      case 'apple':
        return 'orange'
      default:
        break;
    }
  }};
  &:hover{
    opacity: .8;
  }
  .sprite-image{
    object-fit: cover;
    height: ${`${TILE_SIZE}px`};
    width: ${`${TILE_SIZE}px`};
  }
`