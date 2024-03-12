// GameControlsPage.jsx
// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';

import './GamePage.css'; 

export default function GamePage() {
  const [selectedHand, setSelectedHand] = useState(null);
  const [selectedDifficulty, setSelectedDifficulty] = useState(null);

  const handleHandSelect = (hand) => {
    setSelectedHand(hand);
  };

  const handleDifficultySelect = (difficulty) => {
    setSelectedDifficulty(difficulty);
  };

  return (
    <div>
    <Navbar />
    <div className="game-container">
      <div className="game-content">
        <h1 className="title">Select Your Hand and Difficulty Level</h1>
        <div className="hand-options">
          <h2>Select Hand:</h2>
          <div className="hand-buttons">
            <label htmlFor="left-hand">Left Hand</label>
            <input
              type="radio"
              id="left-hand"
              name="hand"
              value="left"
              checked={selectedHand === 'left'}
              onChange={() => handleHandSelect('left')}
            />
            <label htmlFor="right-hand">Right Hand</label>
            <input
              type="radio"
              id="right-hand"
              name="hand"
              value="right"
              checked={selectedHand === 'right'}
              onChange={() => handleHandSelect('right')}
            />
          </div>
        </div>
        <div className="difficulty-options">
          <h2>Select Difficulty:</h2>
          <div className="difficulty-buttons">
            <label htmlFor="easy">Easy</label>
            <input
              type="radio"
              id="easy"
              name="difficulty"
              value="easy"
              checked={selectedDifficulty === 'easy'}
              onChange={() => handleDifficultySelect('easy')}
            />
            <label htmlFor="medium">Medium</label>
            <input
              type="radio"
              id="medium"
              name="difficulty"
              value="medium"
              checked={selectedDifficulty === 'medium'}
              onChange={() => handleDifficultySelect('medium')}
            />
            <label htmlFor="hard">Hard</label>
            <input
              type="radio"
              id="hard"
              name="difficulty"
              value="hard"
              checked={selectedDifficulty === 'hard'}
              onChange={() => handleDifficultySelect('hard')}
            />
          </div>
        </div>
        <Link to="/SnakeGame">
          <button className="play-button" disabled={!selectedHand || !selectedDifficulty}>
            Play Game
          </button>
        </Link>
      </div>
    </div>
    {/* <Footer /> */}
    </div>
  );
}
