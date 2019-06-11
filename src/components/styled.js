import styled from 'styled-components';
import { MAX_WORLD_WIDTH, TILE_SIZE } from '../constants/constants';
export const TileContainer = styled.div`
  display: grid;
  grid-template-columns: ${`repeat(${MAX_WORLD_WIDTH}, ${TILE_SIZE}px)`};
`

export const Tile = styled.div`
  height: ${`${TILE_SIZE}px`};
  width: ${`${TILE_SIZE}px`};
  background-color: ${props => {
    switch (props.tile) {
      case 'wall':
        return 'black'
      case 'ground':
        return 'green'
      case 'rock':
        return 'grey'
      case 'tree':
        return 'darkgreen'
      default:
        break;
    }
  }};
    color: ${props => {
    switch (props.tile) {
      case 'wall':
        return 'black'
      case 'ground':
        return 'green'
      case 'rock':
        return 'grey'
      case 'tree':
        return 'darkgreen'
      default:
        break;
    }
  }};
  &:hover{
    opacity: .8;
  }
`
export const Entity = styled.div`
  font-size: ${`${TILE_SIZE * .8}px`};
  height: ${`${TILE_SIZE}px`};
  width: ${`${TILE_SIZE}px`};
  color: ${props => {
    switch (props.tile) {
      case 'player':
        return 'pink'
      case 'apple':
        return 'red'
      default:
        break;
    }
  }};
  &:hover{
    opacity: .8;
  }
`