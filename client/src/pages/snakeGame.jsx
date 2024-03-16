import React, { useState, useEffect, useRef } from 'react';
import './snakeGame.css'; // Import external CSS file for styling

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

  const gameLoopIntervalRef = useRef();

  useEffect(() => {
    gameLoopIntervalRef.current = setInterval(moveSnake, 100);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      clearInterval(gameLoopIntervalRef.current);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [snake]);

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
      default:
        break;
    }
  };

  const moveSnake = () => {
    if (isGameOver) return;

    const newSnake = [...snake];
    let head = { ...newSnake[0] };

    // Move the head according to the current direction
    switch (direction) {
      case Direction.UP:
        head.y = (head.y - 1 + ROWS) % ROWS; // Wrap around vertically
        break;
      case Direction.DOWN:
        head.y = (head.y + 1) % ROWS; // Wrap around vertically
        break;
      case Direction.LEFT:
        head.x = (head.x - 1 + COLS) % COLS; // Wrap around horizontally
        break;
      case Direction.RIGHT:
        head.x = (head.x + 1) % COLS; // Wrap around horizontally
        break;
      default:
        break;
    }

    // Check for collision with itself or food
    if (isCollision(head)) {
      setIsGameOver(true);
      clearInterval(gameLoopIntervalRef.current);
      return;
    }

    // Add the new head to the front of the snake
    newSnake.unshift(head);

    // If the snake eats the food, generate a new food position
    if (head.x === food.x && head.y === food.y) {
      setFood({
        x: Math.floor(Math.random() * COLS),
        y: Math.floor(Math.random() * ROWS),
      });
    } else {
      // If not, remove the last segment of the snake
      newSnake.pop();
    }

    // Update the snake state with the new positions
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

  return (
    <div className="snake-game-container"> {/* Apply CSS class for centering */}
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
      {isGameOver && <p>Game Over!</p>}
    </div>
  );
};

export default SnakeGame;
