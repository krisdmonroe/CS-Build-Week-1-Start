import React, { useRef, useState } from "react";
import { useAnimeFrame } from "../customHooks/useAnimeFrame.js";
import moment from "moment";

const MyComponent = ( props ) => {
  
  const canvasRef = useRef( null );
  
  const [ stopAnimation, setStopAnimation ] = useState( false );
  
  const doAnimation = ( elapsedTime ) => {
    console.log( "elapsed time:", elapsedTime );
    console.log( canvasRef.current );
  };
  
  const [ cancelAnimationFrame ] = useAnimeFrame( moment.now(), doAnimation );

  let prevTimestamp = null;

function onAnimFrame(timestamp) {

    // Request another animation frame for the future
    requestAnimationFrame(onAnimFrame);

    // If we haven't yet stored the previous time, fake it
    if (prevTimestamp === null) {
        prevTimestamp = timestamp - 30; // milliseconds
    }

    // Compute how long it took between frames
    const elapsed = timestamp - prevTimestamp

    // Remember this for next frame
    prevTimestamp = timestamp;

    console.log(`Current time: ${timestamp} ms, frame time: ${elapsed} ms`);

    // TODO: Do animation stuff to the canvas
    // const canvas = canvasRef.current;
    // const context = canvas.getContext('2d');
}
requestAnimationFrame(onAnimFrame);

  return ( <canvas ref={ canvasRef } width={ props.width }
                   height={ props.height }/> );
};

export default MyComponent;