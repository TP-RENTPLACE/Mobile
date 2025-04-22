import React from 'react';
import './BigBlueButton.css';

function BigBlueButton({props}) {
  return (
    <div className='big-blue-button'>
      <span>{props}</span>
    </div>
  );
}

export default BigBlueButton;