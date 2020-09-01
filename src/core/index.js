import React, { PureComponent } from 'react'
import { animationFrameScheduler } from 'rxjs';
import PropTypes from 'prop-types';
import { Howl } from 'howler';
import { RoughTheme } from "../ui";

export class YayaPlayer extends PureComponent {
  static propTypes = {
    name: PropTypes.string.isRequired,
    src: PropTypes.string.isRequired,
  }

  constructor(props) {
    super(props);
    this.player = new Howl({
      ...props,
      preload: 'metadata'
    });

    this.state = {
      isPlaying: false,
      progress: 0,
      currentTime: 0,
      duration: 0,
    }
  }

  componentDidMount() {
    this.player
      .on('end', () => {
        this.setState({
          isPlaying: false,
          // progress: 1,
        })
      })
      .on('load', () => {
        this.setState({
          duration: this.player.duration() * 1000,
        })
      })
      .on('play', () => {
        const self = this;
        animationFrameScheduler.schedule(function(frame) {
          if (!self.state.isPlaying) { return; }

          self.updateProgress();
          this.schedule(frame + 1);
        }, 0, 0);
      });
  }

  componentWillUnmount() {
    this.player.unload();
  }

  updateProgress = () => {
    const now =  this.player.seek() || 0;
    const duration = this.player.duration();
    const progress = (now / duration).toFixed(4);
    this.setState({
      progress,
      currentTime: now * 1000,
    })
  };

  onPlayPauseBtnClick = () => {
    this.setState((prevState) => {
      return {
        isPlaying: !prevState.isPlaying
      }
    }, () => {
      this.state.isPlaying
        ? this.player.play()
        : this.player.pause();
    })
  }

  render() {
    const {
      isPlaying,
      progress,
      currentTime,
      duration,
    } = this.state;
    return (
      <RoughTheme
        isPlaying={isPlaying}
        onPlayBtnClick={this.onPlayPauseBtnClick}

        progress={progress}
        currentTime={currentTime}
        duration={duration}
      />
    )
  }
}