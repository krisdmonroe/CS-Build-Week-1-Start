import React, {useState, useCallback, useRef} from 'react';
import produce from 'immer';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const numRows = 25;
const numCols = 25;

const operations = [
  [0,1],
  [0 -1],
  [1,-1],
  [-1,1],
  [1,1],
  [-1,-1],
  [1,0],
  [-1,0]
]

const GameOfLife = (props) => {
  const [grid, setGrid] = useState(() => {
    const rows = [];
    for(let i = 0; i < numRows; i++){
      // 0 for dead 1 for alive inital value for everything in array will be 0
      rows.push(Array.from(Array(numCols), () => 0))
    }
    return rows;
  });
  const [running, setRunning] = useState(false);
  // running state is updated but run simulation is ran one time so we need a reference
  const runningRef = useRef(running);
  runningRef.current = running
  // function only created one time with useCallback
  const runSimulation = useCallback(() => {
    // allows us to stop and start simulation
    if(!runningRef.current){
      return;
    }
    // rules
    setGrid((g) => {
      return produce(g, gridCopy => {
        // go through every value in the the grid
        for (let i=0; i < numRows; i++){
          for(let k = 0; k < numCols; k++){
            let neighbors = 0;
           operations.forEach(([x, y]) => {
             const newI = i + x;
             const newK = k + y;
            //  check the bounds
             if(newI >= 0 && newI < numRows && newK >= 0 && newK < numCols){
              //  add 1 to neighbors if its a live cell
              neighbors += g[newI][newK]
             }
           })
          //  Covers first 2 rules
          // less then 2 dies greater then 3 dies
           if(neighbors < 2 || neighbors > 3){
             gridCopy[i][k] = 0;
           }
          //  cell is dead but has 3 neighbors turn that cell alive
            else if(g[i][k] === 0 && neighbors === 3){
             gridCopy[i][k] = 1;
           }
          }
        }
      });
    });
    
    setTimeout(runSimulation, 1000)
  }, [])

  return(
  <>
  <div style={{
    display:'grid',
    // can specify how many columns and second property is how big
    gridTemplateColumns:`repeat(${numCols}, 20px)`
  }}>

    {grid.map((rows, i) => 
    rows.map((col, k) => 
    <div 
    key={`${i}-${k}`}

    onClick={() => {
      // doesnt allow clicking while game is running
      if(running){
        return;
      }else{
      // user immer instead of mutating state
      // grid[i][k] = 1
      // pass current grid value
      // makes mutable change and makes new grid for us
      const newGrid = produce(grid, gridCopy => {
        // makes the on click toggle at position grid[i][k]
        gridCopy[i][k] = grid[i][k] ? 0 : 1;
      });
      setGrid(newGrid);
    }
    }}

    style={{ 
    width: 20, 
    height: 20, 
    backgroundColor: grid[i][k] ? 'black' : undefined,
    border:'1px solid black' 
    }}
    />
    ))}
  </div>

  <Button
  variant="contained"
  onClick={() => {
    setRunning(!running);
    if (!running) {
      runningRef.current = true;
      runSimulation();
    }
  }}>
    {running ? 'stop' : 'start'}
    </Button>

  </>
  );
}

export default GameOfLife;