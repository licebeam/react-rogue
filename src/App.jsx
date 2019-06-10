import React, { Component } from 'react';
import './App.css';
import styled from 'styled-components';
import { entities } from './TestData/entities';

const TileContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(10, 50px);
`

const Tile = styled.div`
  height: 50px;
  width: 50px;
  background-color: ${props => props.tile === 'wall' ? 'black' : 'green'};
  &:hover{
    opacity: .8;
  }
`
const Entity = styled.div`
  height: 50px;
  width: 50px;
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
    console.log(roomSize)
    let room = [];
    var i;
    for (i = 0; i < roomSize; i++) {
      console.log('push');
      console.log(i)
      room.push({ id: i + 1, tile: 'ground' })
    }
    console.log(room)
    return room;
  }

  componentDidMount() {
    this.setState({ editTiles: this.tileGenerator(60) })
    document.addEventListener('DOMContentLoaded', () => {
      'use strict';
      document.addEventListener('keydown', event => {
        this.fireKey(event)
      });
    });
  }

  changePlayerPosition = (player, entities, move, tiles) => {
    const nextTile = tiles.find(t => t.id === (player.id + move))
    const newEntities = entities.map(ent => {
      if (nextTile && ent.id === player.id && nextTile.tile !== 'wall') {
        ent.id += move
      }
      return ent
    })
    return newEntities;
  }

  checkBounds = (player) => {
    if (player.id) {

    }
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
                    return (<Entity>{ent.sprite}</Entity>)
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
