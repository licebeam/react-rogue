export const checkNextTileCollide = nextTile => {
  switch (nextTile) {
    case "tree":
      return true;
    case "wall":
      return true;
    default:
      break;
  }
};

export const changePlayerPosition = (
  player,
  entities,
  move,
  tiles,
  currentFloor
) => {
  const nextTile = tiles.find(t => t.id === player.id + move);
  const nextEntity = entities.find(
    e => e.id === nextTile.id && e.roomId === currentFloor
  );
  const newEntities = entities.map(ent => {
    if (
      nextTile &&
      ent.id === player.id &&
      !checkNextTileCollide(
        nextTile.tile ? nextTile.tile.name : nextTile.contains.name
      ) &&
      !nextEntity
    ) {
      ent.id += move;
    }
    return ent;
  });
  return newEntities;
};
