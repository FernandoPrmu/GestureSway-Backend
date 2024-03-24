/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
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
    const [email, setEmail] = useState('');
    const [showEmailInput, setShowEmailInput] = useState(false);

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
        setShowEmailInput(true);
    };

    const saveGameResults = async () => {
        try {
            const response = await axios.post('http://localhost:3001/save-results', {
                email: email,
                score: points,
            });
            console.log(response.data);
            setShowEmailInput(false);
        } catch (error) {
            console.error(error);
        }
    };

    const handleReplay = () => {
        setIsGameOver(false);
        setSnake(initialSnake);
        setDirection(Direction.RIGHT);
        setFood(initialFood);
        setPoints(0);
        setShowEmailInput(false);
    };

    const handleQuit = () => {
        setIsGameOver(true);
        setShowEmailInput(true);
    };

    const handleEmailSubmit = () => {
        saveGameResults();
    };

    return (
        <div className="snake-game-container">
            <h1>Snake Game</h1>
            <div className="score">Score: {points}</div>
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
            {showEmailInput && (
                <div className="email-input">
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                    />
                    <button onClick={handleEmailSubmit}>Submit</button>
                </div>
            )}
            {isGameOver && (
                <div className="game-over-popup">
                    <p>You scored {points} points!</p>
                    {showEmailInput ? (
                        <div className="email-input">
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter your email"
                            />
                            <button onClick={handleEmailSubmit}>Submit</button>
                        </div>
                    ) : (
                        <div>
                            <button onClick={handleReplay} className="Last-Button-1">Replay</button>
                            <Link to="/FeedbackPage" className="Last-Button-2">See overall results</Link>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default SnakeGame;
