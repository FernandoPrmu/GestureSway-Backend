/* eslint-disable react/no-unescaped-entities */
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import './IntroductionPage.css'; 
import image1 from '../assets/Team.jpg';
import team1Image from '../assets/team1.jpg'; 

export default function IntroductionPage() {
  return (
    <div>
      <Navbar />
      <div className="introduction-container">
        <section className="section section1">
          <h1>Who Are We?</h1>
          <div className="description">
            <div className="image-description ">
              <img src={image1} alt="Image 1" />
            </div>
            <div className="vision-mission">
              <div className="vision">
                <h3>Our Vision</h3>
                <p>
                To empower individuals with hand mobility issues to regain strength, dexterity, and confidence through an engaging and therapeutic gaming experience. Our vision is to provide accessible and effective rehabilitation tools that utilize innovative hand gesture technology to facilitate physical therapy and enhance quality of life.
                </p>
              </div>
              <div className="mission">
                <h3>Our Mission</h3>
                <p>
                Our mission is to develop a groundbreaking hand gesture-based snake game tailored for patients with hand mobility issues. By leveraging advanced machine learning algorithms and intuitive gameplay mechanics, we aim to create a rehabilitative gaming platform that not only entertains but also serves as a valuable tool for targeted hand exercises. Through collaboration with healthcare professionals and continuous user feedback, we are dedicated to delivering a user-friendly, inclusive, and impactful solution that promotes rehabilitation, independence, and well-being for individuals with hand mobility challenges
                </p>
              </div>
            </div>
          </div>
        </section>
        <div className="team-photos">
            <img src={team1Image} alt="Team Photo 1" className="team-photo" />
            <img src={team1Image} alt="Team photo 2" className="team-photo" />
          </div>
        <section className="section team-section">
          <h2>The Team</h2>
          <div className="team-description">
            <p>
            Welcome to the vibrant team behind our innovative project! We are a dynamic group of second-year students from the Informatics Institute of Technology, brought together by our shared passion for technology and collaborative spirit.</p>

<p>Having crossed paths in our first year at the campus, we quickly discovered a harmonious rhythm in working together. Drawing from our collective experiences in previous group endeavors, we found it natural to blend our skills and insights seamlessly.
 or development and harnessing the power of Python for machine learning, we embarked on a journey filled with learning and innovation.</p>

<p>Despite venturing into uncharted territory with machine learning and the MERN stack, we embraced the challenge wholeheartedly, driven by our unwavering determination and thirst for knowledge.</p>

<p>At the helm of our team is Sadesh Weerasuriya, whose visionary leadership has been instrumental in steering our project towards success. Alongside him, Pramuditha Fernando contributed his expertise to the development of the machine learning component, while Sachin Abeywickrama and Chandupa Marapana spearheaded the frontend development efforts. Chavidu Bandara's prowess in backend development played a pivotal role in bringing our vision to life.</p>

<p>As a team, we are immensely proud of what we have accomplished and are thrilled to share our creation with you. We invite you to experience our application firsthand and become part of our growing community.</p>

<p>Thank you for joining us on this exhilarating journey!
            </p>
          </div>
          {/* <div className="team-photos">
            <img src={team1Image} alt="Team Photo 1" className="team-photo" />
            <img src={team1Image} alt="Team photo 2" className="team-photo" />
          </div> */}
        </section>
        <section className="section">
          <h2>Why This App?</h2>
          <p>
            Information about why the app was created, the target audience, and its significance. muscles trained 
          </p>
        </section>
      </div>

      
      <Footer />
    </div>
  );
}
