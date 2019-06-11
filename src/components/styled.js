import styled from 'styled-components';
import { MAX_WORLD_WIDTH } from '../constants/constants';
export const TileContainer = styled.div`
  display: grid;
  grid-template-columns: ${`repeat(${MAX_WORLD_WIDTH}, 50px)`};
`

export const Tile = styled.div`
  height: 50px;
  width: 50px;
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
  font-size: 40px;
  height: 50px;
  width: 50px;
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