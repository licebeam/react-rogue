import React, { Component } from 'react';
import { MAX_WORLD_WIDTH, MAX_WORLD_HEIGHT } from './constants/constants';
import { entities } from './TestData/entities';
import { TileContainer, Tile } from './components/styled';
import { tileGenerator } from './helpers/tileFunctions';
import { changePlayerPosition } from './helpers/moveFunctions';

class App extends Component {
  state = {
    editEntities: entities,
    currentRoom: [],
    currentRoomId: 0,
    allRooms: [],
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
    const playerLocation = this.state.editEntities.find(e => e.type === 'player').id;
    const downLocation = this.state.currentRoom.room && this.state.currentRoom.room.find(t => t.tile.name === 'portal').id;
    if (playerLocation === downLocation && this.state.loading === false) {
      console.log('test down')
      this.changeRooms();
    }
  }

  generateRooms = (roomSize, roomAmount) => {
    const { editEntities } = this.state;
    var rooms = []
    var i = 0;
    const currentFloorStairLoc = rooms.length && rooms[i].find(t => t.tile.name === 'portal').id || null;
    const currentFloorPlayerLoc = editEntities.find(en => en.type === 'player').id || null
    console.log(currentFloorPlayerLoc, currentFloorStairLoc)
    for (i = 0; i < roomAmount; i++) {
      rooms.push({ roomId: i, room: tileGenerator(roomSize, currentFloorStairLoc, currentFloorPlayerLoc) });
    }
    return this.setState({ allRooms: rooms })
  }

  //PLAYER KEYS
  fireKey = (event) => {
    const { editEntities, currentRoom } = this.state;
    let Player = editEntities.find(ent => ent.type === 'player')
    if (event.key === 'ArrowUp') {
      this.setState({ editEntities: changePlayerPosition(Player, editEntities, -(MAX_WORLD_WIDTH), currentRoom.room) })
    }
    if (event.key === 'ArrowDown') {
      this.setState({ editEntities: changePlayerPosition(Player, editEntities, MAX_WORLD_WIDTH, currentRoom.room) })
    }
    if (event.key === 'ArrowRight') {
      this.setState({ editEntities: changePlayerPosition(Player, editEntities, 1, currentRoom.room) })
    }
    if (event.key === 'ArrowLeft') {
      this.setState({ editEntities: changePlayerPosition(Player, editEntities, -1, currentRoom.room) })
    }
  }

  produceEntityOnScreen = tileId => {
    const { editEntities } = this.state;
    const sentEntity = editEntities.find(ent => {
      if (ent.id === tileId) {
        return ent
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
                <Tile tile={ent.type} key={ent.id}>
                  {/* conditionally render image */}
                  {ent.img ? (
                    <img className='sprite-image' src={ent.img} alt="" />
                  ) : ent.char}
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
