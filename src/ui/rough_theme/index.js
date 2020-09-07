import React from 'react';
import PropTypes from 'prop-types';
import { PlayPauseBtn, ProgressBar } from "./widgets";

import '../rough_theme/styles/rough_theme.scss'

export class RoughTheme extends React.PureComponent {
  static propTypes = {
    isPlaying: PropTypes.bool.isRequired,
    onPlayBtnClick: PropTypes.func.isRequired,

    progress: PropTypes.number.isRequired,
  }

  constructor(props) {
    super(props);
  }

  render() {
    const {
      isPlaying,
      onPlayBtnClick,
      progress,
      currentTime,
      duration
    } = this.props;
    return (
      <div className="rough-player-theme">
        <div className="control-btns clikable">
          <PlayPauseBtn
            onClick={onPlayBtnClick}
            isPlaying={isPlaying}
          />
        </div>
        <ProgressBar
          progress={progress}
          currentTime={currentTime}
          duration={duration}
        />
      </div>
    )
  }
}