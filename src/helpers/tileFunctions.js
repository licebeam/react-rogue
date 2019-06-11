import { MAX_WORLD_WIDTH, MAX_WORLD_HEIGHT } from "../constants/constants";

export const tileGenerator = roomSize => {
  let room = [];
  var i;
  const MAX_ROW_LEN = MAX_WORLD_WIDTH;
  const FIRST_ROW = MAX_WORLD_WIDTH;
  const LAST_ROW = roomSize - (MAX_WORLD_WIDTH - 1);
  for (i = 0; i < roomSize; i++) {
    //Generate Walls
    if (i + 1 <= FIRST_ROW) { //TOP
      room.push({ id: i + 1, tile: 'wall' })
    }
    else if (i + 1 >= LAST_ROW) { //BOTTOM
      room.push({ id: i + 1, tile: 'wall' })
    }
    else if (i % MAX_ROW_LEN === 0) { //LEFT
      room.push({ id: i + 1, tile: 'wall' })
    }
    else if (i % MAX_ROW_LEN === (MAX_WORLD_WIDTH - 1)) { //right
      room.push({ id: i + 1, tile: 'wall' })
    }
    else {
      room.push({ id: i + 1, tile: 'ground' })
    }
  }
  room = addRandomTiles(room, 'rock')
  room = addRandomTiles(room, 'tree')
  return room;
}

export const addRandomTiles = (curRoom, type) => {
  const mappedTiles = curRoom.map(tile => {
    let randomTile = Math.floor(Math.random() * (MAX_WORLD_HEIGHT - 1 + 1)) + 1;
    if (tile.tile !== 'wall') {
      if (tile.id === (randomTile + 1) || (tile.id === (randomTile - 1) || tile.id === randomTile)) {
        return { id: tile.id, tile: type }
      } else return tile
    } else return tile
  })
  return mappedTiles;
}


export const mapGenerator = () => {

}