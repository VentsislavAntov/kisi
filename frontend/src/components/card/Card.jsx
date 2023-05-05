import React, { useState } from 'react';
import './Card.css';
import Vector from '../vector/Vector';

function Card(props) {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleMouseEnter = () => {
    setIsFlipped(true);
  };

  const handleMouseLeave = () => {
    setIsFlipped(false);
  };

  return (
    <div className={`card ${isFlipped ? 'flipped' : ''}`} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <div className="card-wrapper">
        <div className="card-front">
          <div className="vector">
            <Vector />
          </div>
          <img className="card-img" src={props.imageSrc} alt={props.imageAlt} />
          <div className="card-text-container">
            <h2 className="card-title">{props.title}</h2>
          </div>
        </div>
        <div className="card-back">
          <div className="vector">
            <Vector />
          </div>
          <h2 className="card-back-title">{props.title}</h2>
          <p className="card-back-description">{props.description}</p>
        </div>
      </div>
    </div>
  );
}

export default Card;
