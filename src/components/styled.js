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
      case 'wall':
        return 'black'
      case 'ground':
        return 'green'
      case 'rock':
        return 'grey'
      case 'tree':
        return 'darkgreen'
      case 'player':
        return 'black'
      case 'apple':
        return 'black'
      default:
        break;
    }
  }};
    color: ${props => {
    switch (props.tile) {
      case 'wall':
        return 'grey'
      case 'ground':
        return 'darkgreen'
      case 'rock':
        return 'darkgrey'
      case 'tree':
        return 'green'

      case 'player':
        return 'orange'
      case 'apple':
        return 'red'
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
// export const Entity = styled.div`
//   z-index: 100;
//   display: inline-block;
//   position: absolute;
//   justify-self: center;
//   align-self: center;
//   font-weight: bold;
//   font-size: ${`${TILE_SIZE * .8}px`};
//   height: ${`${TILE_SIZE}px`};
//   width: ${`${TILE_SIZE}px`};
//   color: ${props => {
//     switch (props.tile) {
//       case 'player':
//         return 'orange'
//       case 'apple':
//         return 'red'
//       default:
//         break;
//     }
//   }};
//   overflow: hidden;
//   &:hover{
//     opacity: .8;
//   }
//   .sprite-image{
//     object-fit: cover;
//     height: ${`${TILE_SIZE}px`};
//     width: ${`${TILE_SIZE}px`};
//   }
// `