import React from 'react';
import PropTypes from 'prop-types';
import {YayaPlayer} from "./player";
import { PlayList } from "../ui/rough_theme/widgets";

export class WebPlayer extends React.PureComponent {
  static propTypes = {
    playList: PropTypes.arrayOf(PropTypes.shape({
      title: PropTypes.string.isRequired,
      src: PropTypes.string.isRequired,
    })).isRequired,
  }
  state = {
    currentSound: {
      title: '',
      src: ''
    }
  }

  handleSelectSound = (currentSound) => (this.setState({ currentSound }));

  render() {
    const { currentSound } = this.state;
    const { playList } = this.props;
    return (
      <div className="web-player">
        <div />
        <YayaPlayer
          title={currentSound.title}
          src={currentSound.src}
        />
        <PlayList
          list={playList}
          onSelect={this.handleSelectSound}
        />
      </div>
    )
  }
}