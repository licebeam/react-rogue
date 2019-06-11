import React, { Component } from 'react';
import { MAX_WORLD_WIDTH, MAX_WORLD_HEIGHT } from './constants/constants';
import { entities } from './TestData/entities';
import { TileContainer, Tile, Entity } from './components/styled';
import { tileGenerator } from './helpers/tileFunctions';
import { changePlayerPosition } from './helpers/moveFunctions';


class App extends Component {
  state = {
    editEntities: entities,
    editTiles: [],
  }

  componentDidMount() {
    this.setState({ editTiles: tileGenerator(MAX_WORLD_HEIGHT) })
    document.addEventListener('DOMContentLoaded', () => {
      document.addEventListener('keydown', event => {
        this.fireKey(event)
      });
    });
  }

  fireKey = (event) => {
    const { editEntities, editTiles } = this.state;
    let Player = editEntities.find(ent => ent.sprite === 'player')
    if (event.key === 'ArrowUp') {
      this.setState({ editEntities: changePlayerPosition(Player, editEntities, -(MAX_WORLD_WIDTH), editTiles) })
    }
    if (event.key === 'ArrowDown') {
      this.setState({ editEntities: changePlayerPosition(Player, editEntities, MAX_WORLD_WIDTH, editTiles) })
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
