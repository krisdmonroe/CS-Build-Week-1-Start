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
          for(let k = 0; k < numCols; k++){
            let neighbors = 0;
           operations.forEach(([x, y]) => {
             const newI = i + x;
             const newK = k + y;
            //  check the bounds/ does not allow past edges
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
    backgroundColor: grid[i][k] ? color : undefined,
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
  }}
  style={{
    marginLeft:'5%'
  }}
  >
    Clear
  </Button>

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
  </div>
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