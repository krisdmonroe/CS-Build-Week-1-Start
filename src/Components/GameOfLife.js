import React, {useState, useCallback, useRef} from 'react';
import produce from 'immer';
import Button from '@material-ui/core/Button';


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
const [rows, setRows] = useState(25)
const [cols, setCols] = useState(25)
const numRows = rows;
const numCols = cols;
// make the grid have all values set to 0
const generateEmptyGrid = () => {
  // initial values for all cells
  const rows = [];
    for(let i = 0; i < numRows; i++){
      // 0 for dead 1 for alive inital value for everything in array will be 0
      rows.push(Array.from(Array(numCols), () => 0))
    }
    return rows;
}
  const [grid, setGrid] = useState(() => {
    return generateEmptyGrid()
  });
  const [count, setCount] = useState(0)
  const [color, setColor] = useState('black')
  const [speed, setSpeed] = useState(1000)
  const [running, setRunning] = useState(false);
  // running state is updated but run simulation is ran one time so we need a reference
  const runningRef = useRef(running);
  runningRef.current = running

  const countRef = useRef(count)
  countRef.current = count
  // function only created one time with useCallback
  const runSimulation = () => {
    // allows us to stop and start simulation
    if(!runningRef.current){
      return;
    }
    // rules
    setGrid((g) => {
      setCount(countRef.current + 1)
      return produce(g, gridCopy => {
        // go through every value in the the grid
        for (let i=0; i < numRows; i++){
          for(let j = 0; j < numCols; j++){
            let neighbors = 0;
           operations.forEach(([x, y]) => {
             const newI = i + x;
             const newJ = j + y;
            //  check the bounds/ does not allow past edges
             if(newI >= 0 && newI < numRows && newJ >= 0 && newJ < numCols){
              //  add 1 to neighbors if its a live cell
              neighbors += g[newI][newJ]
             }
           })
          //  Covers first 2 rules
          // less then 2 dies greater then 3 dies
           if(neighbors < 2 || neighbors > 3){
             gridCopy[i][j] = 0;
           }
          //  cell is dead but has 3 neighbors turn that cell alive
            else if(g[i][j] === 0 && neighbors === 3){
             gridCopy[i][j] = 1;
           }
          }
        }
      });
    });
    setTimeout(runSimulation, speed)
  }
 
  function handleColorChange(event){
    event.preventDefault()
    setColor(event.target.value)
  }
  function handleSpeedChange(event){
    event.preventDefault()
    setSpeed(event.target.value)
  }
  function handleRowChange(event){
    event.preventDefault()
    setRows(event.target.value)
  }
  function handleColChange(event){
    event.preventDefault()
    setCols(event.target.value)
  }
  return(
  <>
  <div style={{display:'flex',justifyContent:'Center'}}>Generation #{count/2}</div>
  {/* //repeats out initial grid based on columns */}
  <div style={{
    display:'grid',
    // can specify how many columns and second property is how big
    gridTemplateColumns:`repeat(${numCols}, 22px)`
  }}>
    {grid.map((rows, i) => 
    rows.map((col, j) => 
    <div 
    key={`${i}-${j}`}

    onClick={() => {
      // doesnt allow clicking while game is running
      if(running){
        return;
      }else{
      // user immer instead of mutating state
      // grid[i][j] = 1
      // pass current grid value
      // makes mutable change and makes new grid for us
      const newGrid = produce(grid, gridCopy => {
        // makes the on click toggle at position grid[i][j]
        gridCopy[i][j] = grid[i][j] ? 0 : 1;
      });
      setGrid(newGrid);
    }
    }}

    style={{ 
    width: 20, 
    height: 20, 
    backgroundColor: grid[i][j] ? color : undefined,
    border:'1px solid black' 
    }}
    />
    ))}
  </div>

  <div style={{display:'flex', justifyContent:'Center'}}>
  <Button
  variant="contained"
  onClick={() => {
    setRunning(!running);
    if (!running) {
      runningRef.current = true;
      runSimulation();
    }
  }}
  >
    {running ? 'stop' : 'start'}
    </Button>

  <Button
  variant="contained"
   onClick={()=> {
    if(running){
      return;
    }
    setGrid(generateEmptyGrid())
    setCount(0)
  }}
  style={{
    marginLeft:'5%'
  }}
  >
    Clear
  </Button>

  <Button
  variant="contained"
  style={{
    marginLeft:'3%'
  }}
  onClick={()=> {
    const rows = [];
    for(let i = 0; i < numRows; i++){
      // allows for setting of values instead of the inital 0 it is set to 1 randomly
      rows.push(Array.from(Array(numCols), () => Math.random() > .5 ? 1 : 0))
    }
    setGrid(rows);
  }}
  >
    Random
  </Button>  

  </div>
  <input 
  onChange={handleColorChange}
  placeholder= 'Change Color'
  type = 'text'
  name='color'
  style={{
    marginLeft:'3%',
    marginTop:'2%',
    height:'90%'
  }}/>

   <input 
  onChange={handleSpeedChange}
  placeholder= 'Change Ms refresh'
  type = 'text'
  name='color'
  style={{
    marginLeft:'3%',
    marginTop:'2%',
    marginRight:'2%',
    height:'90%'
  }}/>

  <input 
  onChange={handleRowChange}
  placeholder= 'Change Rows'
  type = 'text'
  name='color'
  style={{
    marginLeft:'3%',
    marginTop:'2%',
    marginRight:'2%',
    height:'90%'
  }}/> 
  <input 
  onChange={handleColChange}
  placeholder= 'Change Colums'
  type = 'text'
  name='color'
  style={{
    marginLeft:'3%',
    marginTop:'2%',
    marginRight:'2%',
    height:'90%'
  }}/>  
  </>
  );
}

export default GameOfLife;