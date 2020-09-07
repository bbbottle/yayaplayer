import React, { PureComponent } from 'react'
import { animationFrameScheduler } from 'rxjs';
import PropTypes from 'prop-types';
import { Howl } from 'howler';
import { RoughTheme } from "../ui";

export class YayaPlayer extends PureComponent {
  static propTypes = {
    title: PropTypes.string.isRequired,
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

  events = [
    {
      name: 'end',
      handler: () => {
        this.setState({
          isPlaying: false,
          progress: 1,
        })
      }
    },
    {
      name: 'load',
      handler: () => {
        this.setState({
          duration: this.player.duration() * 1000,
        })
      }
    },
    {
      name: 'play',
      handler: () => {
        const self = this;
        animationFrameScheduler.schedule(function(frame) {
          if (!self.state.isPlaying) { return; }

          self.updateProgress();
          this.schedule(frame + 1);
        }, 0, 0);
      }
    }
  ];

  componentDidMount() {
    this.listenEvents();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.src !== this.props.src) {
      this.reset(this.props);
    }
  }

  componentWillUnmount() {
    this.player.unload();
  }

  /* safe api start */
  listen = (name, handler) => {
    const events = this.player['_on' + name];
    if (!events) {
      return null;
    }
    return this.player.on(name, handler, null, null);
  }

  stopListen = (name, handler) => {
    const events = this.player['_on' + name];
    if (!events) {
      return null;
    }
    return this.player.off(name, handler, null);
  }

  play = () => {
    if (!this.player._sounds) {
      return;
    }

    this.player.play();
  }

  pause = () => {
    if (!this.player._sounds) {
      return;
    }

    this.player.pause();
  }
  /* safe api end */

  listenEvents = () => {
    this.events.forEach(({name, handler}) => {
      this.listen(name, handler);
    });
  }

  removeEventsListener = () => {
    this.events.forEach(({ name, handler }) => {
      this.stopListen(name, handler);
    })
  }

  reset = (props) => {
    this.pause();
    this.removeEventsListener();
    this.resetState();
    this.player = new Howl({
      ...props,
      preload: 'metadata'
    })
    this.listenEvents();
  }

  resetState = () => {
    this.setState({
      isPlaying: false,
      progress: 0,
      currentTime: 0,
      duration: 0,
    });
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

  togglePlayStatus = () => {
    this.setState((prevState) => {
      return {
        isPlaying: !prevState.isPlaying
      }
    }, () => {
      const { isPlaying } = this.state;
      isPlaying ? this.play() : this.pause();
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
        onPlayBtnClick={this.togglePlayStatus}

        progress={progress}
        currentTime={currentTime}
        duration={duration}
      />
    )
  }
}