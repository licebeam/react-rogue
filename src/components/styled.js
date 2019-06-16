import styled from "styled-components";
import { MAX_WORLD_WIDTH, TILE_SIZE } from "../constants/constants";

export const TileContainer = styled.div`
  display: grid;
  grid-template-columns: ${`repeat(${MAX_WORLD_WIDTH}, ${TILE_SIZE}px)`};
`;

export const Tile = styled.div`
  display: flex;
  flex-direction: column;
  align-content: center;
  justify-content: center;
  text-align: center;
  z-index: 0;
  height: ${`${TILE_SIZE}px`};
  width: ${`${TILE_SIZE}px`};
  font-size: ${`${TILE_SIZE * 0.8}px`};
  background-color: ${props => {
    switch (props.tile) {
      //TILES
      case "wall":
        return "black";
      case "ground":
        return "green";
      case "dirt":
        return "burlywood";
      case "rock":
        return "grey";
      case "tree":
        return "darkgreen";
      //ENTITIES
      case "player":
        return "black";
      case "rat":
        return "black";
      case "cat":
        return "black";
      //ITEMS
      case "apple":
        return "green";
      case "orange":
        return "green";
      case "stone":
        return "green";
      default:
        break;
    }
  }};
  color: ${props => {
    switch (props.tile) {
      //TILES
      case "wall":
        return "grey";
      case "ground":
        return "darkgreen";
      case "dirt":
        return "brown";
      case "rock":
        return "darkgrey";
      case "tree":
        return "green";
      //ENTITIES
      case "player":
        return "orange";
      case "rat":
        return "red";
      case "cat":
        return "brown";
      //ITEMS
      case "apple":
        return "red";
      case "orange":
        return "orange";
      case "stone":
        return "brown";
      default:
        break;
    }
  }};
  &:hover {
    opacity: 0.8;
  }
  .sprite-image {
    object-fit: cover;
    height: ${`${TILE_SIZE}px`};
    width: ${`${TILE_SIZE}px`};
  }
`;
