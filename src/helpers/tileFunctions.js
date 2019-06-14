import { MAX_WORLD_WIDTH, MAX_WORLD_HEIGHT } from "../constants/constants";
import { tileTypes } from '../data/tileTypes';
import { itemTypes } from '../data/itemTypes';

export const dungeonGenerator = (roomSize, currentFloorPlayerLoc) => {
  let room = [];
  var i;
  const MAX_ROW_LEN = MAX_WORLD_WIDTH;
  const FIRST_ROW = MAX_WORLD_WIDTH;
  const LAST_ROW = roomSize - (MAX_WORLD_WIDTH - 1);
  for (i = 0; i < roomSize; i++) {
    //Generate Walls
    if (i + 1 <= FIRST_ROW) { //TOP
      room.push({ id: i + 1, tile: tileTypes.wall })
    }
    else if (i + 1 >= LAST_ROW) { //BOTTOM
      room.push({ id: i + 1, tile: tileTypes.wall })
    }
    else if (i % MAX_ROW_LEN === 0) { //LEFT
      room.push({ id: i + 1, tile: tileTypes.wall })
    }
    else if (i % MAX_ROW_LEN === (MAX_WORLD_WIDTH - 1)) { //right
      room.push({ id: i + 1, tile: tileTypes.wall })
    }
    else {
      room.push({ id: i + 1, tile: tileTypes.ground })
    }
  }
  //fill with walls

  room = fillDungeon(room, 'ground')
  room = addRandomTiles(room, 'ground')
  room = addRandomTiles(room, 'rock')
  room = addRandomTiles(room, 'tree')
  room = addRandomTiles(room, 'rock')
  room = addRandomTiles(room, 'tree')
  room = addRandomTiles(room, 'dirt')
  room = addRandomTiles(room, 'dirt')
  room = addRandomItems(room)
  room = addRandomItems(room)
  room = addRandomItems(room)
  //add door
  room = addStairs(room, 'portal', currentFloorPlayerLoc)
  return room;
}

export const fillDungeon = (curRoom, type) => {
  const mappedTiles = curRoom.map(t => {
    return { id: t.id, tile: tileTypes[type] }
  })
  return mappedTiles;
}

export const addRandomTiles = (curRoom, type) => {
  const mappedTiles = curRoom.map(t => {
    let randomTile = Math.floor(Math.random() * (MAX_WORLD_HEIGHT - 1 + 1)) + 1;
    if (t.tile.name !== 'wall') {
      if (t.id === (randomTile + 1) || (t.id === (randomTile - 1) || t.id === randomTile)) {
        return { id: t.id, tile: tileTypes[type] }
      } else return t
    } else return t
  })
  return mappedTiles;
}

export const addRandomItems = (curRoom) => {
  const mappedTiles = curRoom.map(t => {
    const type = t.tile.name;
    let randomItem = Math.floor(Math.random() * (itemTypes.length)) + 0;
    let randomTile = Math.floor(Math.random() * (MAX_WORLD_HEIGHT)) + 1;
    if (t.tile.name !== 'wall') {
      if (t.id === (randomTile + 1) || (t.id === (randomTile - 1) || t.id === randomTile)) {
        return { id: t.id, tile: tileTypes[type], contains: itemTypes[randomItem] } // change to object
      } else return t
    } else return t
  })
  return mappedTiles;
}

export const addStairs = (curRoom, type, currentFloorPlayerLoc) => {
  let newTiles = curRoom;
  const allGroundTiles = curRoom.filter(g => g.tile.name === 'ground')
  var freeLocation = allGroundTiles[Math.floor(Math.random() * allGroundTiles.length)];
  const freeLocationIndex = newTiles.indexOf(freeLocation)
  if (freeLocation.contains || freeLocation.id === currentFloorPlayerLoc) {
    return addStairs(curRoom, type);
  }
  newTiles[freeLocationIndex].tile = tileTypes[type];
  return newTiles;
}