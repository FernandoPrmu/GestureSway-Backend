import React, { useEffect, useRef } from 'react';

const SnakeGame = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        const cellSize = 20;
        const canvasSize = 400;

        let snake = [{ x: 10, y: 10 }];
        let food = { x: 15, y: 15 };
        let dx = 1;
        let dy = 0;
        let score = 0;
        let gameSpeed = 150;

        const drawSnake = () => {
            context.fillStyle = 'green';
            snake.forEach(segment => {
                context.fillRect(segment.x * cellSize, segment.y * cellSize, cellSize, cellSize);
            });
        };

        const drawFood = () => {
            context.fillStyle = 'red';
            context.fillRect(food.x * cellSize, food.y * cellSize, cellSize, cellSize);
        };

        const moveSnake = () => {
            const head = { x: snake[0].x + dx, y: snake[0].y + dy };
            snake.unshift(head);

            if (head.x === food.x && head.y === food.y) {
                score++;
                generateFood();
            } else {
                snake.pop();
            }

            if (head.x < 0 || head.x >= canvasSize / cellSize || head.y < 0 || head.y >= canvasSize / cellSize || checkCollision()) {
                gameOver();
            }
        };

        const generateFood = () => {
            food = { x: Math.floor(Math.random() * (canvasSize / cellSize)), y: Math.floor(Math.random() * (canvasSize / cellSize)) };
        };

        const checkCollision = () => {
            return snake.slice(1).some(segment => segment.x === snake[0].x && segment.y === snake[0].y);
        };

        const gameOver = () => {
            alert('Game Over! Your score: ' + score);
            snake = [{ x: 10, y: 10 }];
            dx = 1;
            dy = 0;
            score = 0;
        };

        const clearCanvas = () => {
            context.clearRect(0, 0, canvasSize, canvasSize);
        };

        const draw = () => {
            clearCanvas();
            drawSnake();
            drawFood();
        };

        const update = () => {
            moveSnake();
        };

        const gameLoop = () => {
            update();
            draw();
            setTimeout(gameLoop, gameSpeed);
        };

        gameLoop();

        document.addEventListener('keydown', event => {
            const keyPressed = event.key;

            if (keyPressed === 'ArrowUp' && dy === 0) {
                dx = 0;
                dy = -1;
            }

            if (keyPressed === 'ArrowDown' && dy === 0) {
                dx = 0;
                dy = 1;
            }

            if (keyPressed === 'ArrowLeft' && dx === 0) {
                dx = -1;
                dy = 0;
            }

            if (keyPressed === 'ArrowRight' && dx === 0) {
                dx = 1;
                dy = 0;
            }
        });

        return () => {
            document.removeEventListener('keydown');
        };
    }, []);

    return <canvas ref={canvasRef} width="400" height="400" />;
};

export default SnakeGame;
