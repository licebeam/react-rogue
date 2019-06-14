import { MAX_WORLD_HEIGHT, MAX_TILES } from "../constants/constants";
import { tileTypes } from '../data/tileTypes';
import { itemTypes } from '../data/itemTypes';
import { NewDungeon } from 'random-dungeon-generator';
import { flattenDeep } from 'lodash';

const checkTileType = (tile, i, rowIndex) => {
  var rowMultiplier = rowIndex >= 1 ? (rowIndex * MAX_TILES / 2) - 1 : rowIndex;
  console.log(rowMultiplier)
  switch (tile) {
    case 0:
      return { id: (i + 1) + rowMultiplier, tile: tileTypes.ground }
    case 1:
      return { id: (i + 1) + rowMultiplier, tile: tileTypes.wall }
    default:
      return { id: (i + 1) + rowMultiplier, tile: tileTypes.ground }
  }
}

export const dungeonGenerator = (roomSize, currentFloorPlayerLoc) => {

  const dungeon = NewDungeon({
    width: MAX_TILES / 2,
    height: MAX_TILES / 2,
    minRoomSize: 4,
    maxRoomSize: 10
  })
  let oldRoom = [];

  const dungeonRows = dungeon.map((row, index) => {
    return row.map((tile, i) => { return checkTileType(tile, i, index) })
  })
  oldRoom.push(dungeonRows)
  let room = [...new Set(flattenDeep(oldRoom.filter(g => g)))]
  room = flattenDeep(room)
  room = addStairs(room, 'portal', currentFloorPlayerLoc)
  room = addRandomTiles(room, 'rock')
  room = addRandomTiles(room, 'tree')
  room = addRandomTiles(room, 'rock')
  room = addRandomTiles(room, 'tree')
  room = addRandomTiles(room, 'dirt')
  room = addRandomTiles(room, 'dirt')
  room = addRandomItems(room)
  room = addRandomItems(room)
  room = addRandomItems(room)
  return room;
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
  const allGroundTiles = newTiles.filter(g => g.tile.name === 'ground')
  var freeLocation = allGroundTiles[Math.floor(Math.random() * allGroundTiles.length)];
  const freeLocationIndex = newTiles.indexOf(freeLocation)
  if (freeLocation.contains || freeLocation.id === currentFloorPlayerLoc) {
    return addStairs(curRoom, type);
  }
  newTiles[freeLocationIndex].tile = tileTypes[type];
  return newTiles;
}