import React from 'react';
import './App.css';
import MyComponent from './Components/Canvas'
import GameOfLife from './GameofLife.js'
import styled from 'styled-components'
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const Border = styled.div`
display:flex;
border:2px solid black;
margin-left:10%;
margin-top:3%;
width:40%;
height:40%;
`
const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));
function App() {
// const canvas = document.querySelector('my-canvas');
// const ctx = canvas.getContext('2d');
// const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

// const pixelRGBA = getPixel(imageData, 10, 10);
// let buffer = imageData.data; // Obtained from getImageData()

// let x = 10, y = 20;
// let index = (y * width + x) * 4;

// buffer[index + 0] = 0xff; // Red: 0xff == 255, full intensity
// buffer[index + 1] = 0x00; // Green: zero intensity
// buffer[index + 2] = 0x00; // Blue: zero intensity
// buffer[index + 3] = 0xff; // Alpha: 0xff == 255, fully opaque

// ctx.putImageData(imageData, 0, 0);
  return (
  <>
  <div style={{display:'flex', border:'2px solid red'}}>
     {/* <canvas id="my-canvas"></canvas> */}
     <div style={{border:'2px solid red', marginLeft:'5%'}}>
     <div style={{fontSize:'30px', marginLeft:'28%'}}>Generation: #</div>
     <div style={{border:'2px solid black'}}>
    {/* <GameOfLife /> */}
      </div>
    </div>
     <div style={{border:'2px solid red', display:'flex',flexDirection:'column', marginLeft:'25%', fontSize:'30px', marginRight:'1%', marginTop:'1%'}}>Rules:
     <li>Any live cell with fewer than two live neighbours dies, as if by underpopulation.</li>
     <li>Any live cell with two or three live neighbours lives on to the next generation.</li>
     <li>Any live cell with more than three live neighbours dies, as if by overpopulation.</li>
     <li>Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.</li>
    
     </div>
  </div>
     <Button variant="contained" style={{marginLeft:'6%', marginTop:'1%'}}>Play</Button>
     <Button variant="contained" style={{marginLeft:'8%', marginTop:'1%'}}>Pause</Button>
     <Button variant="contained" style={{marginLeft:'8%', marginTop:'1%'}}>Stop</Button>
  </>
  );
}

export default App;
