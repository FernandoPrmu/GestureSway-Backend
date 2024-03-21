import Navbar from '../components/Navbar';
import './InstructionPage.css'; 
import stepOnePic from '../assets/Step1 (1).png';
import stepTwoPic from '../assets/step2.png';
import stepThreePic from '../assets/step3.png';
import StepFourPic from '../assets/Step4.1.png';
import Footer from '../components/Footer';

export default function InstructionPage() {
  return (
    <div>
      <Navbar />
      <div className="instruction-container">
        {/* Instruction page topic */}
        <h1 className="instruction-topic">INSTRUCTION PAGE </h1>
      
          <p> <b>This page contains all the instructions that should be followed in order to play the game. Lets go through the steps.</b></p>
        
        {/* Steps */}
        <div className="steps-container">
          <div className="step-section right-align">
            <div className="description-section">
              <h2>Step 1 : Go to the Game Page</h2>
              <p>First, in order to play the game you must go to the game page that is available in the navigation bar.</p>
            </div>
            <div className="image-section left-align">
              <img src={stepOnePic} alt="Step 1" />
            </div>
          </div>

          <div className="step-section ">
            <div className="description-section">
              <h2>Step 2:  Login or Signup </h2>
              <p> <ul>This is the most important step in this web app. </ul>
              <ul>If you want to play the game you must register to the app by making an account. </ul>
              <ul>If you have already made an account then you can login to the account by using the previously used credentials .</ul></p>
            </div>
            <div className="image-section">
              <img src={stepTwoPic} alt="Step 2" />
            </div>
          </div>

          <div className="step-section">
            <div className="image-section">
              <img src={stepThreePic} alt="Step 3"/>
            </div>
            <div className="description-section">
              <h2>Step 3 : Play the game .</h2> 
              <p>After you select the hand and difficulty level. you can progress to the main part of our web App, which is the game . Now you can play our snake game by using the hand gestures 

mainly there are 4 gestures that you can use inorder to move the snake </p> 
            </div>
          {/* </div>

          <div className="step-section ">
            <div className="description-section">
              <h2>Step 4: Select the difficulty level  </h2>
              <p> Before you play the game you must select the difficulty level to play the game. The levels can be increased as you progress through the game</p>
            </div>
            <div className="image-section ">
              <img src={StepFourPic} alt="Step 4" />
            </div>
          </div>

          <div className="step-section ">
            <div className="description-section">
              <h2>Step 5:  Play the game  </h2>
              <p> After you select the hand and difficulty level. you can progress to the main part of our web App, which is the game . Now you can play our snake game by using the hand gestures 

mainly there are 4 gestures that you can use inorder to move the snake 
</p>
            </div> */}
            {/* <div className="image-section ">
              <img src={StepFivePic} alt="Step 4" /> */}
            {/* </div> */}
          </div>

          
        </div>
      </div>
    <Footer/>
    </div>
  );
}
