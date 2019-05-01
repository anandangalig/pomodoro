import React from 'react';

const CountCompleted = props => {
  return (
    <div>
      <h3 className='color_accent'>count: {props.pomodorosCount}</h3>
    </div>
  );
};

export default CountCompleted;
