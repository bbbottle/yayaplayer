import React from 'react';
import rough from 'roughjs/bundled/rough.esm.js';

import { timeFormatter } from "../../helper";

const totalBarLen = 200;
const barHeight = 24;
const sliderSize = 10;

export class ProgressBar extends React.PureComponent {
  componentDidMount() {
    this.roughSvg = rough.svg(this.progressLine);
    this.gen = this.roughSvg.generator;

    this.baseLine = this.roughSvg.draw(this.gen.line(0, barHeight / 2, totalBarLen, barHeight / 2));
    this.drawProgressLine(this.props.progress)
    this.drawSlider();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.progress !== this.props.progress) {
      this.drawProgressLine(this.props.progress);
    }
  }

  setSvgRef = (r) => {
    this.progressLine = r;
  }

  setSliderRef = (r) => {
    this.slider = r;
  }

  drawSlider = () => {
    const path = this.roughSvg.draw(this.gen.circle(sliderSize / 2, barHeight / 2, sliderSize, {
      fill: '#51c49f',
      fillWeight: 3,
    }));
    this.slider.appendChild(path);
  };

  drawProgressLine = (progress) => {
    if (!this.roughSvg) {
      return ;
    }

    const nodes = [
      this.baseLine,
      this.drawPlayedLine(progress)
    ];

    this.progressLine.innerHTML = "";
    nodes.forEach((n) => {
      if (n) {
        this.progressLine.appendChild(n);
      }
    });
  }

  drawPlayedLine = (progress) => {
    return this.roughSvg.draw(this.gen.line(
      0,
      barHeight / 2,
      totalBarLen * progress,
      barHeight / 2,
      { stroke: '#51c49f' })
    );
  }

  render() {
    const {
      currentTime,
      duration,
      progress,
    } = this.props;

    return (
      <div className="progress-bar">
        <span className="time">{timeFormatter(currentTime)}</span>
        <div className="line-wrapper">
          <svg
            className="progress-line"
            width={totalBarLen}
            height={24}
            ref={this.setSvgRef}
          />
          <svg
            style={{
              left: progress * totalBarLen - sliderSize / 2,
            }}
            height={2 * sliderSize}
            width={2 * sliderSize}
            className="slider"
            ref={this.setSliderRef}
          />
        </div>
        <span className="time">{timeFormatter(duration)}</span>
      </div>
    )
  }
}
