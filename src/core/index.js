import React, { PureComponent } from 'react'
import PropTypes from 'prop-types';
import { Howl } from 'howler';
import { TinyPlayerWorld } from "../ui";

export class YayaPlayer extends PureComponent {
  static propTypes = {
    name: PropTypes.string.isRequired,
    src: PropTypes.string.isRequired,
  }

  constructor(props) {
    super(props);
    this.player = new Howl({ ...props });

    this.state = {
      isPlaying: false,
    }
  }

  componentDidMount() {
    this.player.on('end', () => {
      this.setState({ isPlaying: false })
    })
  }

  componentWillUnmount() {
    this.player.unload();
  }

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
    return <TinyPlayerWorld />
  }
}