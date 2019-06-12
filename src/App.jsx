import React, { Component } from 'react';
import { MAX_WORLD_WIDTH, MAX_WORLD_HEIGHT } from './constants/constants';
import { entities } from './TestData/entities';
import { TileContainer, Tile } from './components/styled';
import { tileGenerator } from './helpers/tileFunctions';
import { changePlayerPosition } from './helpers/moveFunctions';
import { flatten } from 'lodash';

class App extends Component {
  state = {
    currentRoom: [],
    currentRoomId: 0,
    allRooms: [],
    allEntities: [],
    loading: false,
  }

  //ADDS TILES AND ADDS EVENT LISTENERS FOR KEYS
  componentDidMount() {
    this.setState({ rooms: this.generateRooms(MAX_WORLD_HEIGHT, 11) }, () => { //AMOUNT OF ROOMS IS -1;
      this.setState({ currentRoom: this.state.allRooms[this.state.currentRoomId] })
    })
    document.addEventListener('DOMContentLoaded', () => {
      document.addEventListener('keydown', event => {
        this.fireKey(event)
      });
    });
  }

  changeRooms = () => {
    if (this.state.currentRoomId < this.state.allRooms.length - 1)
      this.setState({ currentRoomId: this.state.currentRoomId + 1, loading: true }, () => {
        console.log(this.state.currentRoomId)
        this.setState({ currentRoom: this.state.allRooms[this.state.currentRoomId], loading: false })
      })
  }

  componentDidUpdate() {
    const { allEntities } = this.state;
    const playerLocation = allEntities.length && allEntities.find(e => e.entity.type === 'player').id;
    const downLocation = this.state.currentRoom.room && this.state.currentRoom.room.find(t => t.tile.name === 'portal').id;
    if (playerLocation === downLocation && this.state.loading === false) {
      console.log('test down')
      this.changeRooms();
    }
  }

  generateRooms = (roomSize, roomAmount) => {
    const { allEntities } = this.state;
    var rooms = []
    var entities = []
    var i = 0;
    const currentFloorStairLoc = rooms.length && rooms[i].find(t => t.tile.name === 'portal').id || null;
    const currentFloorPlayerLoc = allEntities.length && allEntities.find(en => en.entity.type === 'player').id || null
    for (i = 0; i < roomAmount; i++) {
      rooms.push({ roomId: i, room: tileGenerator(roomSize, currentFloorStairLoc, currentFloorPlayerLoc) });
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
      console.log(entities)
      this.setState({ allEntities: flatten(entities) })
    })
  }

  //PLAYER KEYS
  fireKey = (event) => {
    const { allEntities, currentRoom } = this.state;
    let Player = allEntities.find(ent => ent.entity.type === 'player')
    console.log(Player);
    if (event.key === 'ArrowUp') {
      this.setState({ editEntities: changePlayerPosition(Player, allEntities, -(MAX_WORLD_WIDTH), currentRoom.room) })
    }
    if (event.key === 'ArrowDown') {
      this.setState({ editEntities: changePlayerPosition(Player, allEntities, MAX_WORLD_WIDTH, currentRoom.room) })
    }
    if (event.key === 'ArrowRight') {
      this.setState({ editEntities: changePlayerPosition(Player, allEntities, 1, currentRoom.room) })
    }
    if (event.key === 'ArrowLeft') {
      this.setState({ editEntities: changePlayerPosition(Player, allEntities, -1, currentRoom.room) })
    }
  }

  entityGenerator = (curRoom, roomId) => {
    const entities = curRoom.map(t => {
      let randomTile = Math.floor(Math.random() * (MAX_WORLD_HEIGHT - 1 + 1)) + 1;
      if (t.tile.name !== 'wall') {
        if (t.id === randomTile) {
          return { roomId, id: t.id, entity: { type: 'rat', char: 'o', img: null } } // change to object
        } else return null
      } else return null
    })
    const flattenedEntities = entities.filter(e => e)
    return flattenedEntities;
  }

  addPlayerOnStart = curRoom => {
    const allGroundTiles = curRoom.filter(g => g.tile.name === 'ground')
    var freeLocation = allGroundTiles[Math.floor(Math.random() * allGroundTiles.length)];
    if (!freeLocation.contains) {
      return { roomId: 0, id: freeLocation.id, entity: { type: 'player', char: '@', img: null } }
    }
  }

  produceEntityOnScreen = tileId => {
    const { allEntities, currentRoomId } = this.state;
    // console.log(allEntities)
    const sentEntity = allEntities.find(ent => {
      if (ent.id === tileId && currentRoomId === ent.roomId) {
        return ent.entity
      }
    })
    if (sentEntity)
      return sentEntity
  };

  //RENDERS TILES AND ENTITIES
  render() {
    const { currentRoom } = this.state;
    return (
      <div className="App" >
        <TileContainer className='tiles'>
          {currentRoom.room ? currentRoom.room.map(t => {
            if (this.produceEntityOnScreen(t.id)) {
              const ent = this.produceEntityOnScreen(t.id)
              return (
                <Tile tile={ent.entity.type} key={ent.id}>
                  {/* conditionally render image */}
                  {ent.entity.img ? (
                    <img className='sprite-image' src={ent.entity.img} alt="" />
                  ) : ent.entity.char}
                </Tile>
              )
            }
            else if (t.contains) {
              return (
                <Tile tile={t.contains.name} key={t.id}>
                  {/* conditionally render image */}
                  {t.contains.img ? (
                    <img className='sprite-image' src={t.contains.img} alt="" />
                  ) : t.contains.char}
                </Tile>
              )
            }
            else {
              return (
                <Tile tile={t.tile.name} key={t.id}>
                  {/* conditionally render image */}
                  {t.tile.img ? (
                    <img className='sprite-image' src={t.tile.img} alt="" />
                  ) : t.tile.char}
                </Tile>
              )
            }
          }) : null}
        </TileContainer>
      </div >
    );
  }

}

export default App;
