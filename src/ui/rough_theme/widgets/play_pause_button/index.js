import React, { useRef, useEffect, useState } from 'react';
import rough from 'roughjs/bundled/rough.esm.js';


import { PlayPath } from "../../icons";

export const PlayPauseBtn = (props) => {
  const {
    isPlaying,
    onClick
  } = props;
  const svgRef = useRef(null);

  const [shapes, setShapes] = useState({});
  const setBtnShape = (shps) => {
    if (!shps) {
      return;
    }
    svgRef.current.innerHTML = "";
    shps.map(s => svgRef.current.appendChild(s))
  }

  // initialize
  useEffect(() => {
    const roughSvg =  rough.svg(svgRef);
    const gen = roughSvg.generator;
    const playShape = [roughSvg.draw(gen.path(PlayPath, { fill: '#51c49f', fillWeight: 2 }))];
    const pauseShape = [
      [4, 3, 6, 18],
      [14, 3, 6, 18]
    ].map((args) => roughSvg.draw(gen.rectangle(...args, { fill: '#51c49f', fillWeight: 2 })));
    setShapes({
      playShape,
      pauseShape
    })
    setBtnShape(props.isPlaying ? pauseShape : playShape)
  }, []);

  useEffect(() => {
    const {
      pauseShape,
      playShape
    } = shapes;
    setBtnShape(props.isPlaying ? pauseShape : playShape);
  }, [props.isPlaying])

  return (
    <svg
      className="btn clickable"
      width={24}
      height={24}
      ref={svgRef}
      onClick={onClick}
    />
  )
}