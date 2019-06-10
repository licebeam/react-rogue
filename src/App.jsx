import React, { Component } from 'react';
import './App.css';
import styled from 'styled-components';
import { tiles } from './TestData/tiles' //FAKE TILE DATA

const TileContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 50px);
`

const Tile = styled.div`
  height: 50px;
  width: 50px;
  background-color: green;
  &:hover{
    opacity: .8;
  }
`

class App extends Component {

  render() {
    return (
      <div className="App">
        <TileContainer className='tiles'>
          {tiles ? tiles.map(tile => {
            return (
              <Tile />
            )
          }) : null}
        </TileContainer>
      </div>
    );
  }

}

export default App;
