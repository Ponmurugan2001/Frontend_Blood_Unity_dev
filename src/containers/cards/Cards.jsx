import React from 'react';
import './cards.css'; // Create this CSS file for styling


function SlidingCards() {


  return (
    <div className="sliding-cards-container">
      <div className="sliding-cards">
        <div className="card 1">
          <div className="card-content">
            <button className="case-study-button">Case Study</button>
          </div>
        </div>
        <div className="card 2">
          <div className="card-content">
            <button className="case-study-button">Case Study</button>
          </div>
        </div>
        <div className="card 3">
          <div className="card-content">
            <button className="case-study-button">Case Study</button>
          </div>
        </div>
        <div className="card 4">
          <div className="card-content">
            <button className="case-study-button">Case Study</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SlidingCards;
