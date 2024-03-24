import React, { useState, useEffect, useRef } from 'react';

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
  const [gesture, setGesture] = useState(null);

  const gameLoopIntervalRef = useRef();

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8766');

    ws.onopen = () => {
      console.log('WebSocket connection established');
    };

    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
      console.log('WebSocket readyState:', ws.readyState);
    };

    ws.onclose = (event) => {
      if (event.wasClean) {
        console.log(`WebSocket connection closed cleanly, code=${event.code}, reason=${event.reason}`);
      } else {
        // e.g. server process killed or network down
        console.log('WebSocket connection died');
      }
    };

    ws.onmessage = (event) => {
      console.log('Received gesture from server:', event.data);
    };

    gameLoopIntervalRef.current = setInterval(moveSnake, 100);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      clearInterval(gameLoopIntervalRef.current);
      document.removeEventListener('keydown', handleKeyDown);
      ws.close();
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

    switch (direction) {
      case Direction.UP:
        head.y = (head.y - 1 + ROWS) % ROWS; // Wrap around if going off the top
        break;
      case Direction.DOWN:
        head.y = (head.y + 1) % ROWS; // Wrap around if going off the bottom
        break;
      case Direction.LEFT:
        head.x = (head.x - 1 + COLS) % COLS; // Wrap around if going off the left
        break;
      case Direction.RIGHT:
        head.x = (head.x + 1) % COLS; // Wrap around if going off the right
        break;
      default:
        break;
    }

    if (isCollision(head)) {
      setIsGameOver(true);
      clearInterval(gameLoopIntervalRef.current);
      return;
    }

    newSnake.unshift(head);

    if (head.x === food.x && head.y === food.y) {
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
    return snake.some(
      (segment) => segment.x === head.x && segment.y === head.y
    );
  };

  return (
    <div>
      <h1>Snake Game</h1>
      <p>Detected Gesture: {gesture}</p>
      <div
        style={{
          width: COLS * CELL_SIZE,
          height: ROWS * CELL_SIZE,
          border: '1px solid black',
          position: 'relative',
        }}
      >
        {snake.map((segment, index) => (
          <div
            key={index}
            style={{
              width: CELL_SIZE,
              height: CELL_SIZE,
              backgroundColor: 'green',
              position: 'absolute',
              left: segment.x * CELL_SIZE,
              top: segment.y * CELL_SIZE,
            }}
          ></div>
        ))}
        <div
          style={{
            width: CELL_SIZE,
            height: CELL_SIZE,
            backgroundColor: 'red',
            position: 'absolute',
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
