import React, {useEffect, useState} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));

const buildGrid = (COLS, ROWS) => {
  return new Array(COLS).fill(null)
    .map(() => new Array(ROWS).fill(null)
      .map(() => Math.floor(Math.random() * 2)));
}

const GameOfLife = () =>{

const [play, setPlay] = useState(false)
const [gen, setGen] = useState(0)

function nextGen(grid, COLS, ROWS) {
const nextGen = grid.map(arr => [...arr]);

for (let col = 0; col < grid.length; col++) {
  for (let row = 0; row < grid[col].length; row++) {
    const cell = grid[col][row];
    let numNeighbours = 0;
    for (let i = -1; i < 2; i++) {
      for (let j = -1; j < 2; j++) {
        if (i === 0 && j === 0) {
          continue;
        }
        const x_cell = col + i;
        const y_cell = row + j;

        if (x_cell >= 0 && y_cell >= 0 && x_cell < COLS && y_cell < ROWS) {
          const currentNeighbour = grid[col + i][row + j];
          numNeighbours += currentNeighbour;
        }
      }
    }
    // rules
    if (cell === 1 && numNeighbours < 2) {
      nextGen[col][row] = 0;
    } else if (cell === 1 && numNeighbours > 3) {
      nextGen[col][row] = 0;
    } else if (cell === 0 && numNeighbours === 3) {
      nextGen[col][row] = 1;
    }
  }
}
return nextGen;
}

useEffect(() => {
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

const resolution = 5;
canvas.width = 400;
canvas.height = 400;

const COLS = canvas.width / resolution;
const ROWS = canvas.height / resolution;

let grid = buildGrid(COLS, ROWS);

if(play === false){
}else if(play === true){
requestAnimationFrame(update)
}

function update() {
  grid = nextGen(grid, COLS, ROWS);
  render(grid);
  requestAnimationFrame(update);
}

function render(grid) {
  for (let col = 0; col < grid.length; col++) {
    for (let row = 0; row < grid[col].length; row++) {
      const cell = grid[col][row];

      ctx.beginPath();
      ctx.rect(col * resolution, row * resolution, resolution, resolution);
      ctx.fillStyle = cell ? 'black' : 'white';
      ctx.fill();
    }
  }
}
})

return (
<header>
<div style={{fontSize:'30px', marginLeft:'28%'}}>Generation: {gen}</div>
  <canvas></canvas>
  <div style={{marginTop:'2%', marginBottom:'2%'}}>
  <Button variant="contained" style={{marginLeft:'20%'}} onClick={() => setPlay(true)}>Play</Button>
  <Button variant="contained" style={{marginLeft:'15%'}} onClick={() => setPlay(false)}>Stop</Button>
  </div>
</header>
)
}

export default GameOfLife;