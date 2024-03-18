/* eslint-disable react/no-unescaped-entities */
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import './IntroductionPage.css'; 
import Image from '../assets/Team1.1.jpg'; 
import team1Image from '../assets/team1.jpg'
import Accordion_Intro from '../components/Accordion_Intro';

export default function IntroductionPage() {
  return (
    <div>
      <Navbar />
      <div className="introduction-container">
        <br>
        </br>
        <div class="about-img">
          <img src={Image} alt="" />
          </div>
            <div className="vision-mission1">  
                <h3>OUR MISSION</h3>
                <p>
                  Our mission is to develop a groundbreaking hand gesture-based snake game tailored for patients with hand mobility issues. By leveraging advanced machine learning algorithms and intuitive gameplay mechanics, we aim to create a rehabilitative gaming platform that not only entertains but also serves as a valuable tool for targeted hand exercises. Through collaboration with healthcare professionals and continuous user feedback, we are dedicated to delivering a user-friendly, inclusive, and impactful solution that promotes rehabilitation, independence, and well-being for individuals with hand mobility challenges.
                </p> 
            </div>
            <div className="vision-mission2">        
                <h3>OUR VISION</h3>
                <p>
                  To transform physical therapy for patients with hand mobility issues through an engaging, accessible, and personalised web-based hand gesture snake game, empowering patients to take charge of their rehabilitation journey and enhance their overall hand function.
                </p>
                    
          </div>
        
          
            <div className="team-content">
              <h2>OUR TEAM</h2>
              <div className="team-description">
                <p>
                  Welcome to the vibrant team behind our innovative project! We are a dynamic group of second-year students from the Informatics Institute of Technology, brought together by our shared passion for technology and collaborative spirit.
                </p>
                <p>
                  Having crossed paths in our first year at the campus, we quickly discovered a harmonious rhythm in working together. Drawing from our collective experiences in previous group endeavors, we found it natural to blend our skills and insights seamlessly.
                </p>
                <p>
                  Despite venturing into uncharted territory with machine learning and the MERN stack, we embraced the challenge wholeheartedly, driven by our unwavering determination and thirst for knowledge.
                </p>
                <p>
                  At the helm of our team is Sadesh Weerasuriya, whose visionary leadership has been instrumental in steering our project towards success. Alongside him, Pramuditha Fernando contributed his expertise to the development of the machine learning component, while Sachin Abeywickrama and Chandupa Marapana spearheaded the frontend development efforts. Chavidu Bandara's prowess in backend development played a pivotal role in bringing our vision to life.
                </p>
                <p>
                  As a team, we are immensely proud of what we have accomplished and are thrilled to share our creation with you. We invite you to experience our application firsthand and become part of our growing community.
                </p>
                <p>
                  Thank you for joining us on this exhilarating journey!
                </p>
              </div>
            </div>
            
            
            <div className="team-photos">
              <img src={team1Image} alt="Team Photo 1" className="team-photo" />
            </div>

        <section className="section why-this-app">
          <div className="subtopic1">
            <h3>Why This App?</h3>
            <p>
              This app was developed in response to the prolonged wait times for physiotherapy appointments in Sri Lanka. Patients often endure long waits to book appointments, leading to delays in receiving crucial therapy. Our app provides a solution by offering therapeutic hand exercises that patients can perform at home, reducing reliance on traditional physiotherapy sessions. Additionally, physiotherapists can incorporate the game into their practices to assess and improve patients' hand mobility.
            </p>
            <p>
              "The Sri Lanka Paralysis Association estimates that approximately 12,000 individuals across the country are living with various degrees of paralysis, including hand paralysis."
            </p>
          </div>

          <div className="subtopic2">
            <h3>Target Audience</h3>
            <p>
              Our primary target audience consists of individuals struggling with hand mobility issues, encompassing a wide range of conditions such as paralysis, arthritis, and injuries. By providing accessible and engaging hand exercises, our app aims to assist patients in improving their hand dexterity and strength. Additionally, the app may appeal to individuals interested in innovative gaming experiences that utilize hand gestures for interaction.
            </p>
          </div>

          <div className="subtopic3">
            <h3>Muscles Helped</h3>
            <p>
              Our app primarily targets the muscles in the wrist, focusing on exercises to improve flexibility, strength, and coordination. By engaging in wrist-centric exercises, users can enhance their overall hand mobility and functionality. Exercises may include wrist rotations, flexion and extension movements, and grip strengthening exercises. These targeted exercises aim to address common issues associated with hand mobility impairments and promote rehabilitation.
            </p>
          </div>

        </section>
      </div>
      <br/>
      <Footer />
    </div>
  );
}
