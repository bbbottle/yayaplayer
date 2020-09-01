import React from 'react';

export const ProgressText = (props) => {
  const progress = props.progress;
  const progressStr = `${(progress * 100).toFixed(2)} %`;
  return (
    <span className="progress-text">
      {progressStr}
    </span>
  )
}