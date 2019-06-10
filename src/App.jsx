import React, { Component } from 'react';
import './App.css';
import styled, { css } from 'styled-components';
import { entities } from './TestData/entities';

const TileContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(10, 50px);
`

const Tile = styled.div`
  height: 50px;
  width: 50px;
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
      default:
        break;
    }
  }};
    color: ${props => {
    switch (props.tile) {
      case 'wall':
        return 'black'
      case 'ground':
        return 'green'
      case 'rock':
        return 'grey'
      case 'tree':
        return 'darkgreen'
      default:
        break;
    }
  }};
  &:hover{
    opacity: .8;
  }
`
const Entity = styled.div`
  font-size: 50px;
  height: 50px;
  width: 50px;
  color: ${props => {
    switch (props.tile) {
      case 'player':
        return 'red'
      case 'ground':
        return 'green'
      case 'rock':
        return 'grey'
      case 'tree':
        return 'darkgreen'
      default:
        break;
    }
  }};
  &:hover{
    opacity: .8;
  }
`

class App extends Component {
  state = {
    editEntities: entities,
    editTiles: [],
  }

  tileGenerator = roomSize => {
    let room = [];
    var i;
    const MAX_ROW_LEN = 10;
    const FIRST_ROW = 10;
    const LAST_ROW = roomSize - 9;
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
      else if (i % MAX_ROW_LEN === 9) { //LEFT
        room.push({ id: i + 1, tile: 'wall' })
      }
      else {
        room.push({ id: i + 1, tile: 'ground' })
      }
    }
    room = this.addRandomTiles(room, 'rock')
    room = this.addRandomTiles(room, 'tree')
    return room;
  }

  addRandomTiles = (curRoom, type) => {
    const mappedTiles = curRoom.map(tile => {
      let randomTile = Math.floor(Math.random() * (120 - 1 + 1)) + 1;
      if (tile.tile !== 'wall') {
        if (tile.id === (randomTile + 1) || (tile.id === (randomTile - 1) || tile.id === randomTile)) {
          return { id: tile.id, tile: type }
        } else return tile
      } else return tile
    })
    return mappedTiles;
  }

  componentDidMount() {
    this.setState({ editTiles: this.tileGenerator(120) })
    document.addEventListener('DOMContentLoaded', () => {
      'use strict';
      document.addEventListener('keydown', event => {
        this.fireKey(event)
      });
    });
  }

  checkNextTileCollide = nextTile => {
    switch (nextTile) {
      case 'tree':
        return true
      case 'wall':
        return true
      default:
        break;
    }
  }

  changePlayerPosition = (player, entities, move, tiles) => {
    const nextTile = tiles.find(t => t.id === (player.id + move))
    const newEntities = entities.map(ent => {
      if (nextTile && ent.id === player.id && !this.checkNextTileCollide(nextTile.tile)) {
        ent.id += move
      }
      return ent
    })
    return newEntities;
  }

  fireKey = (event) => {
    let Player = this.state.editEntities.find(ent => ent.sprite === 'player')
    console.log(event)
    if (event.key === 'ArrowUp') {
      this.setState({ editEntities: this.changePlayerPosition(Player, this.state.editEntities, -10, this.state.editTiles) })
    }
    if (event.key === 'ArrowDown') {
      this.setState({ editEntities: this.changePlayerPosition(Player, this.state.editEntities, 10, this.state.editTiles) })
    }
    if (event.key === 'ArrowRight') {
      this.setState({ editEntities: this.changePlayerPosition(Player, this.state.editEntities, 1, this.state.editTiles) })
    }
    if (event.key === 'ArrowLeft') {
      this.setState({ editEntities: this.changePlayerPosition(Player, this.state.editEntities, -1, this.state.editTiles) })
    }
  }
  render() {
    const { editTiles, editEntities } = this.state;
    return (
      <div className="App">
        <TileContainer className='tiles'>
          {editTiles ? editTiles.map(tile => {
            return (
              <Tile tile={tile.tile}>
                {editEntities ? editEntities.map(ent => {
                  if (ent.id === tile.id) {
                    return (<Entity tile={ent.sprite}>{ent.char}</Entity>)
                  }
                }) : null}
              </Tile>
            )
          }) : null}
        </TileContainer>
      </div>
    );
  }

}

export default App;
