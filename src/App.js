import React from 'react';
import './App.css';
// import GameOfLife from './GameofLife.js'
import styled from 'styled-components'
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import GameOfLife from './Components/GameOfLife'

const Border = styled.div`
display:flex;
border:2px solid black;
margin-left:10%;
margin-top:3%;
width:40%;
height:40%;
`
function App(props){
  return (
  <>
  <h1 style={{textAlign:'center'}}> Conway's Game of Life</h1>
  <div style={{display:'flex'}}>
     <div style={{marginLeft:'5%'}}>
     <div style={{}}>
    <GameOfLife />
      </div>
    </div>
     <div style={{display:'flex',flexDirection:'column', marginLeft:'25%', fontSize:'30px', marginRight:'1%', marginTop:'1%'}}>Rules:
     <li>Any live cell with fewer than two live neighbours dies, as if by underpopulation.</li>
     <li>Any live cell with two or three live neighbours lives on to the next generation.</li>
     <li>Any live cell with more than three live neighbours dies, as if by overpopulation.</li>
     <li>Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.</li>
    
     </div>
  </div>
  <p style={{textAlign:'center'}}>About this Algorithm</p>
  <p style={{textAlign:'center'}}> The Creator John Horton Conway, devised of this in 1970.There are many basic patterns in the GameOfLife
  Such as the glider gun allowing for an infinite amount of gliders.There are now more than 700 basic patterns, which have now been named and are described in Stephen Silver's Lexicon.
  </p>
  </>
  );
}

export default App;
