/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import axios from 'axios';
import './FeedbackPage.css';

const FeedbackPage = () => {
    const [gameResults, setGameResults] = useState([]);
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            const response = await axios.get(`http://localhost:3001/game-results?email=${email}`);
            setGameResults(response.data);
        } catch (error) {
            setError('Error fetching game results. Please try again.');
        }

        setIsLoading(false);
    };

    return (
        <div>
            <Navbar />
            <div className='feedback-body'>
                <div className='container'>
                    <h2>Game Results</h2>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor='email'>Enter Email:</label>
                        <input
                            type='email'
                            id='email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <button type='submit'>Retrieve Results</button>
                    </form>
                    {isLoading && <p>Loading...</p>}
                    {error && <p>{error}</p>}
                    <div className='game-results'>
                        {gameResults.length > 0 ? (
                            gameResults.map((result, index) => (
                                <div key={index} className='result'>
                                    <p>Score: {result.score}</p>
                                    <p>Timestamp: {result.timestamp}</p>
                                </div>
                            ))
                        ) : (
                            <p>No game results found.</p>
                        )}
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default FeedbackPage;