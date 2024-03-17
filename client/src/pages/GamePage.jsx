import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import backgroundImg from '../assets/gamepageimage.jpeg';
import './GamePage.css'; // Import CSS file for styling

export default function GamePage() {
  return (
    <div className="game-container" >
      <Navbar />
      <div className="backgroundImg">
              <img src={backgroundImg} alt="background" />
            
      <div className="game-content">
        <h1 className="title">Welcome to Snake Game!</h1>
        <p className="description">
          Snake Game is a classic arcade game where you control a snake to eat food and grow in size. 
          Avoid colliding with your own body! Use the hand gestures provided to navigate the snake. First you must login in order to play the game.
        </p>
        <Link to="/LoginPage">
          <button className="login-button">Login</button>
        </Link>
      </div>
      </div>
      <Footer />
    </div>
  );
}
