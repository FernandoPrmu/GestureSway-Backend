import React, { useState, useEffect, useRef } from 'react';
import './snakeGame.css'; 

const ROWS = 30;
const COLS = 60;
const CELL_SIZE = 20;

const Direction = {
  UP: 'UP',
  DOWN: 'DOWN',
  LEFT: 'LEFT',
  RIGHT: 'RIGHT',
};

const initialSnake = [{ x: 10, y: 10 }];
const initialFood = { x: Math.floor(Math.random() * COLS), y: Math.floor(Math.random() * ROWS) };

const SnakeGame = () => {
  const [snake, setSnake] = useState(initialSnake);
  const [direction, setDirection] = useState(Direction.RIGHT);
  const [food, setFood] = useState(initialFood);
  const [isGameOver, setIsGameOver] = useState(false);
  const [points, setPoints] = useState(0);
  const [showResultsPopup, setShowResultsPopup] = useState(false);

  const gameLoopIntervalRef = useRef();

  useEffect(() => {
    gameLoopIntervalRef.current = setInterval(moveSnake, 100);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      clearInterval(gameLoopIntervalRef.current);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [snake]);

  useEffect(() => {
    if (isGameOver) {
      setShowResultsPopup(true);
    }
  }, [isGameOver]);

  const handleKeyDown = (e) => {
    switch (e.key) {
      case 'ArrowUp':
        if (direction !== Direction.DOWN) setDirection(Direction.UP);
        break;
      case 'ArrowDown':
        if (direction !== Direction.UP) setDirection(Direction.DOWN);
        break;
      case 'ArrowLeft':
        if (direction !== Direction.RIGHT) setDirection(Direction.LEFT);
        break;
      case 'ArrowRight':
        if (direction !== Direction.LEFT) setDirection(Direction.RIGHT);
        break;
      case 'q':
        endGame();
        break;
      default:
        break;
    }
  };

  const moveSnake = () => {
    if (isGameOver) return;

    const newSnake = [...snake];
    let head = { ...newSnake[0] };

    switch (direction) {
      case Direction.UP:
        head.y = (head.y - 1 + ROWS) % ROWS;
        break;
      case Direction.DOWN:
        head.y = (head.y + 1) % ROWS;
        break;
      case Direction.LEFT:
        head.x = (head.x - 1 + COLS) % COLS;
        break;
      case Direction.RIGHT:
        head.x = (head.x + 1) % COLS;
        break;
      default:
        break;
    }

    if (isCollision(head)) {
      endGame();
      return;
    }

    newSnake.unshift(head);

    if (head.x === food.x && head.y === food.y) {
      setPoints(points + 1);
      setFood({
        x: Math.floor(Math.random() * COLS),
        y: Math.floor(Math.random() * ROWS),
      });
    } else {
      newSnake.pop();
    }

    setSnake(newSnake);
  };

  const isCollision = (head) => {
    return (
      head.x < 0 ||
      head.x >= COLS ||
      head.y < 0 ||
      head.y >= ROWS ||
      snake.some((segment) => segment.x === head.x && segment.y === head.y)
    );
  };

  const endGame = () => {
    setIsGameOver(true);
    clearInterval(gameLoopIntervalRef.current);
  };

  const handleSeeResultsClick = () => {
    // Handle the "See your overall results" button click
    // You can navigate to another page or display a modal with overall results
    alert('Overall results: ' + points + ' points'); // Example: Display alert with points
  };

  return (
    <div className="snake-game-container">
      <h1>Snake Game</h1>
      <div className="game-board">
        {snake.map((segment, index) => (
          <div
            key={index}
            className="snake-segment"
            style={{
              left: segment.x * CELL_SIZE,
              top: segment.y * CELL_SIZE,
            }}
          ></div>
        ))}
        <div
          className="food"
          style={{
            left: food.x * CELL_SIZE,
            top: food.y * CELL_SIZE,
          }}
        ></div>
      </div>
      {isGameOver && (
        <div className="results-popup">
          <p>You scored {points} points!</p>
          <button onClick={handleSeeResultsClick}>See your overall results</button>
        </div>
      )}
    </div>
  );
};

export default SnakeGame;
