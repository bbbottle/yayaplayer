import React from 'react';
import cn from 'classnames';
import '../../styles/play_list.scss';

export const PlayList = (props) => {
  const {
    list,
    onSelect,
  } = props;

  const [selectedIdx, select] = React.useState(-1);

  return (
    <ul className="play-list">
      {list.map(({ title }, index) => (
        <li
          className={cn({selected: index === selectedIdx})}
          onClick={() => {
            select(index);
            if (selectedIdx !== index) {
              onSelect(list[index]);
            }
          }}
        >
          {title}
        </li>
      ))}
    </ul>
  )
}