import React from 'react';
import PropTypes from 'prop-types';
import {
  Engine,
  World,
  Bodies
} from 'matter-js';

import {
  Render
} from "./rough_renderer";

class TinyPlayerWorld extends React.PureComponent {
  constructor(props) {
    super(props);
    this.engine = Engine.create();
  }

  componentDidMount() {
    const render = Render.create({
      element: this.tinyWorldContainer,
      engine: this.engine
    });

    const boxA = Bodies.rectangle(400, 200, 80, 80);
    const boxB = Bodies.rectangle(450, 50, 80, 80);
    const ground = Bodies.rectangle(400, 610, 810, 60, { isStatic: true });

    World.add(this.engine.world, [boxA, boxB, ground]);
    Engine.run(this.engine);
    Render.run(render);
  }

  render() {
    return (
      <div
        ref={worldContainer => (this.tinyWorldContainer = worldContainer)}
      />
      );
  }
}

export {
  TinyPlayerWorld
}