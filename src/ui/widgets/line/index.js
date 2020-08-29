import React, { useRef, useEffect } from 'react';
import rough from 'roughjs/bundled/rough.esm.js';

export const Line = () => {
  const svgRef = useRef(null);
  useEffect(() => {
    const roughSVG =  rough.svg(svgRef);
    const line = roughSVG.line(60, 60, 190, 60);
    svgRef.current.appendChild(line);
  }, []);

  return (
    <svg ref={svgRef}/>
  )
}