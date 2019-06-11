export const checkNextTileCollide = nextTile => {
  switch (nextTile) {
    case 'tree':
      return true
    case 'wall':
      return true
    default:
      break;
  }
}

export const changePlayerPosition = (player, entities, move, tiles) => {
  const nextTile = tiles.find(t => t.id === (player.id + move))
  const newEntities = entities.map(ent => {
    if (nextTile && ent.id === player.id && !checkNextTileCollide(nextTile.tile.name)) {
      ent.id += move
    }
    return ent
  })
  return newEntities;
}