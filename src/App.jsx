import React, { Component } from 'react';
import './App.css';
import styled from 'styled-components';
import { entities } from './TestData/entities';
import { tileGenerator } from './helpers/tileFunctions';
import { changePlayerPosition } from './helpers/moveFunctions';
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
  font-size: 40px;
  height: 50px;
  width: 50px;
  color: ${props => {
    switch (props.tile) {
      case 'player':
        return 'pink'
      case 'apple':
        return 'red'
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

  componentDidMount() {
    this.setState({ editTiles: tileGenerator(120) })
    document.addEventListener('DOMContentLoaded', () => {
      'use strict';
      document.addEventListener('keydown', event => {
        this.fireKey(event)
      });
    });
  }

  fireKey = (event) => {
    const { editEntities, editTiles } = this.state;
    let Player = editEntities.find(ent => ent.sprite === 'player')
    if (event.key === 'ArrowUp') {
      this.setState({ editEntities: changePlayerPosition(Player, editEntities, -10, editTiles) })
    }
    if (event.key === 'ArrowDown') {
      this.setState({ editEntities: changePlayerPosition(Player, editEntities, 10, editTiles) })
    }
    if (event.key === 'ArrowRight') {
      this.setState({ editEntities: changePlayerPosition(Player, editEntities, 1, editTiles) })
    }
    if (event.key === 'ArrowLeft') {
      this.setState({ editEntities: changePlayerPosition(Player, editEntities, -1, editTiles) })
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
