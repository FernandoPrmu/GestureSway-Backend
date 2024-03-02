import Navbar from '../components/Navbar'
import Card from '../components/Card';
import introductionPic from '../assets/introduction.jpeg';
import instructionPic from '../assets/instruction.jpeg';
import snakeGamePic from '../assets/snake game.png';
import feedbackPic from '../assets/feedback.jpeg';
import './HomePage.css';
import Footer from '../components/Footer';
import Part1 from '../components/Part1';
import Test from '../components/Doctor';
import Part2 from '../components/Part2';

function HomePage() {
    return (
        <div>
            <Navbar/>
            <Part2/>
            <br></br>
            <div className="container">
            <div className="row">
                <div className="col-md-3">
                <Card
                    image={introductionPic} 
                    title="Introduction" 
                    text="Introduction about the webapp and Team"
                    path="/IntroductionPage" 
                />
                </div>
                <div className="col-md-3">
                <Card
                    image={instructionPic} 
                    title="Instructions" 
                    text="Instructions on how to use the webapp and the Game"
                    path="/InstructionPage" 
                />
                </div>
                <div className="col-md-3">
                <Card 
                    image={snakeGamePic} 
                    title="Snake Game" 
                    text="Information about the snake game feature"
                    path="/GamePage" 
                />
                </div>
                <div className="col-md-3">
                <Card 
                    image={feedbackPic} 
                    title="Feedback" 
                    text="Please review the patient's feedback here." 
                    path="/FeedbackPage" 
                />
                </div>
            </div>
            </div>
            <br/>
            <Part1/>
            <Test/>
            <br/>
            <Footer/>
        </div>
    );
}

export default HomePage;