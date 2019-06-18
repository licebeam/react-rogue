import React, { Component } from "react";
import {
  MAX_WORLD_WIDTH,
  MAX_WORLD_HEIGHT,
  MAX_TILES
} from "./constants/constants";
import styled from "styled-components";
import { TileContainer, Tile, Shadow, ShadowHolder } from "./components/styled";
import { dungeonGenerator } from "./helpers/tileFunctions";
import { changePlayerPosition } from "./helpers/moveFunctions";
import { flatten } from "lodash";
import { entityTypes } from "./data/entityTypes";

const Wrapper = styled.div`
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
`;

const Menu = styled.div`
  align-content: center;
  justify-content: center;
  text-align: center;
  padding: 20px;
  display: flex;
  flex-direction: column;
  font-size: 0.7rem;
  flex: 1;
  .location {
    height: 80px;
    word-wrap: break-word;
    padding: 10px;
  }
  .controls {
    button {
      font-size: 0.4rem;
      margin: 20px;
      height: 20px;
      width: 40px;
      border: 2px solid black;
    }
  }
`;

class App extends Component {
  state = {
    currentRoom: [],
    currentRoomId: 0,
    allRooms: [],
    allEntities: [],
    loading: false,
    currentTurn: 0,
    playerTurn: true,
    othersTurn: false,
    currentTile: "",
    keyPress: false
  };

  //ADDS TILES AND ADDS EVENT LISTENERS FOR KEYS
  componentDidMount() {
    this.setState({ rooms: this.generateRooms(MAX_WORLD_HEIGHT, 11) }, () => {
      //AMOUNT OF ROOMS IS -1;
      this.setState({
        currentRoom: this.state.allRooms[this.state.currentRoomId]
      });
    });
    document.addEventListener("DOMContentLoaded", () => {
      document.addEventListener("keydown", event => {
        if (!this.state.keyPress) this.fireKey(event, false, true);
      });
      document.addEventListener("keyup", event => {
        this.releaseKeys(event);
      });
    });
  }

  changeRooms = () => {
    if (this.state.currentRoomId < this.state.allRooms.length - 1)
      this.setState(
        { currentRoomId: this.state.currentRoomId + 1, loading: true },
        () => {
          this.setState({
            currentRoom: this.state.allRooms[this.state.currentRoomId],
            loading: false
          });
        }
      );
  };

  componentDidUpdate(prevProps, prevState) {
    const { allEntities, currentRoom } = this.state;
    const playerLocation =
      allEntities.length &&
      allEntities.find(e => e.entity.type === "player").id;
    const downLocation =
      currentRoom &&
      currentRoom.room &&
      currentRoom.room.find(t => t.tile.name === "portal").id;
    if (playerLocation === downLocation && this.state.loading === false) {
      this.changeRooms();
    }
    if (prevState.currentRoomId !== this.state.currentRoomId) {
      let player = allEntities.find(ent => ent.entity.type === "player");
      const playerIndex = allEntities.indexOf(player);
      this.setState({
        allEntities: Object.assign([...allEntities], {
          [playerIndex]: {
            roomId: this.state.currentRoomId,
            id: player.id,
            entity: player.entity
          }
        })
      });
    }
  }

  generateRooms = (roomSize, roomAmount) => {
    const { allEntities } = this.state;
    var rooms = [];
    var entities = [];
    var i = 0;
    const currentFloorStairLoc =
      (rooms.length && rooms[i].find(t => t.tile.name === "portal").id) || null;
    const currentFloorPlayerLoc =
      (allEntities.length &&
        allEntities.find(en => en.entity.type === "player").id) ||
      null;
    for (i = 0; i < roomAmount; i++) {
      rooms.push({
        roomId: i,
        room: dungeonGenerator(
          roomSize,
          currentFloorStairLoc,
          currentFloorPlayerLoc
        )
      });
    }
    return this.setState({ allRooms: rooms }, () => {
      //Generate All Entities for floor.
      var k = 0;
      for (k = 0; k < roomAmount; k++) {
        if (k === 0) {
          entities.push(this.addPlayerOnStart(this.state.allRooms[k].room));
        }
        entities.push(this.entityGenerator(this.state.allRooms[k].room, k));
      }
      this.setState({ allEntities: flatten(entities) });
    });
  };

  //PLAYER KEYS
  fireKey = (event, key, checkHold) => {
    const { allEntities, currentRoom, currentRoomId, keyPress } = this.state;
    if (checkHold) {
      //Checks if user is holding key
      this.setState({ keyPress: true });
    }
    let Player = allEntities.find(ent => ent.entity.type === "player");
    if (key === "ArrowUp" || (event.key === "ArrowUp" && keyPress === false)) {
      this.setState({
        editEntities: changePlayerPosition(
          Player,
          allEntities,
          -MAX_WORLD_WIDTH,
          currentRoom.room,
          currentRoomId
        )
      });
      this.updateTurn();
    } else if (
      key === "ArrowDown" ||
      (event.key === "ArrowDown" && keyPress === false)
    ) {
      this.setState({
        editEntities: changePlayerPosition(
          Player,
          allEntities,
          MAX_WORLD_WIDTH,
          currentRoom.room,
          currentRoomId
        )
      });
      this.updateTurn();
    } else if (
      key === "ArrowRight" ||
      (event.key === "ArrowRight" && keyPress === false)
    ) {
      this.setState({
        editEntities: changePlayerPosition(
          Player,
          allEntities,
          1,
          currentRoom.room,
          currentRoomId
        )
      });
      this.updateTurn();
    } else if (
      key === "ArrowLeft" ||
      (event.key === "ArrowLeft" && keyPress === false)
    ) {
      this.setState({
        editEntities: changePlayerPosition(
          Player,
          allEntities,
          -1,
          currentRoom.room,
          currentRoomId
        )
      });
      this.updateTurn();
    }
  };
  //PLAYER KEYS
  releaseKeys = () => {
    this.setState({ keyPress: false });
  };

  updateTurn = () => {
    const { allEntities, currentRoom } = this.state;
    const playerLocation = allEntities.find(e => e.entity.type === "player");
    //this method also stores the current player tile every turn;
    const playerTile = currentRoom.room.find(t => t.id === playerLocation.id);
    this.setState({
      playerTurn: !this.state.playerTurn,
      currentTurn: this.state.currentTurn + 1,
      currentTile: playerTile
    });
  };

  entityGenerator = (curRoom, roomId) => {
    const entities = curRoom.map(t => {
      let randomEntity = Math.floor(Math.random() * entityTypes.length) + 0;
      let randomTile = Math.floor(Math.random() * MAX_TILES) + 1;
      if (t.tile.name !== "wall") {
        if (t.id === randomTile) {
          return { roomId, id: t.id, entity: entityTypes[randomEntity] }; // change to object
        } else return null;
      } else return null;
    });
    const flattenedEntities = entities.filter(e => e);
    return flattenedEntities;
  };

  addPlayerOnStart = curRoom => {
    const allGroundTiles = curRoom.filter(g => g.tile.name !== "wall"); //TODO: fix this so player is not on bad tile
    var freeLocation =
      allGroundTiles[Math.floor(Math.random() * allGroundTiles.length) + 1];
    if (!freeLocation.contains) {
      return {
        roomId: this.state.currentRoomId,
        id: freeLocation.id,
        entity: { type: "player", char: "@", img: null }
      };
    }
  };

  produceEntityOnScreen = tileId => {
    const { allEntities, currentRoomId } = this.state;
    const sentEntity = allEntities.find(ent => {
      if (
        ent &&
        ent.id &&
        ent.id === tileId &&
        currentRoomId === ent.roomId &&
        ent.type !== "player"
      ) {
        return ent.entity;
      }
      if (ent && ent.id && ent.id === tileId && ent.type === "player") {
        return ent.entity;
      }
    });
    if (sentEntity) return sentEntity;
  };

  shouldComponentUpdate(nextProps, nextState) {
    //THIS IS RENDERING CONTROL to prevent un-needed re-renders
    if (this.state.currentTurn !== nextState.currentTurn) {
      return true;
    } else if (this.state.loading !== nextState.loading) {
      return true;
    } else if (this.state.currentRoom !== nextState.currentRoom) {
      return true;
    } else if (this.state.allEntities !== nextState.allEntities) {
      return true;
    }
    return false;
  }

  // function getLighting (currentTile, allEntities)
  // get entLightingDistance  map through entities and find their lighting
  // check to make sure lighting stops at wall
  // give return lighting value for tile
  generateLighting = tileId => {
    const { allEntities, currentRoom } = this.state;
    const lightMax = 5;
    const currentTile =
      currentRoom &&
      currentRoom.room &&
      currentRoom.room.find(t => t.id === tileId);
    const tileX = currentTile.x;
    const tileY = currentTile.y;
    const entity =
      allEntities && allEntities.find(e => e.entity.type === "player");
    const entityTile =
      currentRoom &&
      currentRoom.room &&
      currentRoom.room.find(t => t.id === entity.id);
    const entityX = entityTile.x;
    const entityY = entityTile.y;
    if (entity.id === tileId) {
      return 0;
    }
    if (
      this.checkRange(tileX, entityX - lightMax, entityX + lightMax) &&
      this.checkRange(tileY, entityY - lightMax, entityY + lightMax)
    ) {
      return this.distance(entityTile, currentTile) / 10; //CALCULATES LIGHTING SHADE
    } else return 1;
  };

  distance = (p, q) => {
    var dx = p.x - q.x;
    var dy = p.y - q.y;
    var dist = Math.sqrt(dx * dx + dy * dy);
    return dist;
  };

  checkRange = (xy, min, max) => {
    return (xy - min) * (xy - max) <= 0;
  };
  //RENDERS TILES AND ENTITIES
  render() {
    const { currentRoom, currentTurn, currentTile, playerTurn } = this.state;
    return (
      <Wrapper className="App">
        <TileContainer className="tiles">
          {currentRoom && currentRoom.room
            ? currentRoom.room.map(t => {
                if (this.produceEntityOnScreen(t.id)) {
                  const ent = this.produceEntityOnScreen(t.id);
                  return (
                    <Tile
                      lighting={this.generateLighting(t.id)}
                      id={ent.entity.type === "player" ? "player" : "entity"}
                      tile={ent.entity.type}
                      key={ent.id + "ent" + Math.random()}
                    >
                      {/* conditionally render image */}
                      {ent.entity.img ? (
                        <img
                          className="sprite-image"
                          src={ent.entity.img}
                          alt=""
                        />
                      ) : (
                        ent.entity.char
                      )}
                      <div className="light" />
                    </Tile>
                  );
                } else if (t.contains) {
                  return (
                    <Tile
                      lighting={this.generateLighting(t.id)}
                      tile={t.contains.name}
                      key={t.id + "tile" + Math.random()}
                    >
                      {/* conditionally render image */}
                      {t.contains.img ? (
                        <img
                          className="sprite-image"
                          src={t.contains.img}
                          alt=""
                        />
                      ) : (
                        t.contains.char
                      )}
                      <div className="light" />
                    </Tile>
                  );
                } else {
                  return (
                    <Tile
                      lighting={this.generateLighting(t.id)}
                      tile={t.tile.name}
                      key={t.id + "normal" + Math.random()}
                    >
                      {/* conditionally render image */}
                      {t.tile.img ? (
                        <img className="sprite-image" src={t.tile.img} alt="" />
                      ) : (
                        t.tile.char
                      )}
                      <div className="light" />
                    </Tile>
                  );
                }
              })
            : null}
        </TileContainer>
        <Menu>
          <div className="location">
            <div>{currentTurn}</div>
            <div>player: {playerTurn.toString()}</div>
            <div>currentTile:{JSON.stringify(currentTile)}</div>
          </div>

          <div className="controls">
            <button onClick={() => this.fireKey(false, "ArrowUp", false)}>
              up
            </button>
            <button onClick={() => this.fireKey(false, "ArrowDown", false)}>
              Down
            </button>
            <button onClick={() => this.fireKey(false, "ArrowLeft", false)}>
              Left
            </button>
            <button onClick={() => this.fireKey(false, "ArrowRight", false)}>
              Right
            </button>
          </div>
        </Menu>
      </Wrapper>
    );
  }
}

export default App;
