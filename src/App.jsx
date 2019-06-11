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

  //ADDS TILES AND ADDS EVENT LISTENERS FOR KEYS
  componentDidMount() {
    this.setState({ editTiles: tileGenerator(MAX_WORLD_HEIGHT) })
    document.addEventListener('DOMContentLoaded', () => {
      document.addEventListener('keydown', event => {
        this.fireKey(event)
      });
    });
  }

  //PLAYER KEYS
  fireKey = (event) => {
    const { editEntities, editTiles } = this.state;
    let Player = editEntities.find(ent => ent.type === 'player')
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

  //RENDERS TILES AND ENTITIES
  render() {
    const { editTiles, editEntities } = this.state;
    return (
      <div className="App">
        <TileContainer className='tiles'>
          {editTiles ? editTiles.map(t => {
            return (
              <Tile tile={t.tile.name} key={t.id}>

                {/* conditionally render image */}
                {t.tile.img ? (
                  <img className='sprite-image' src={t.tile.img} alt="" />
                ) : t.tile.char}

                {editEntities ? editEntities.map(ent => {

                  if (ent.id === t.id) {
                    return (
                      <Entity tile={ent.type} key={ent.id + 'tile'}>
                        {/* conditionally render image or character */}
                        {ent.img ? (
                          <img className='sprite-image' src={ent.img} alt="" />
                        ) : ent.char}
                      </Entity>)
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
