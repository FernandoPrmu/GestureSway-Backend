// eslint-disable-next-line no-unused-vars
import React, { useRef, useEffect } from 'react';
import './Part1.css'; 
import image from '../assets/OurVision.jpg'; 

function Part1() {
    const boxRef = useRef(null);

    useEffect(() => {
        const options = {
            root: null,
            rootMargin: '0px',
            threshold: 0.5 // Trigger when 50% of the box is visible
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate');
                } else {
                    entry.target.classList.remove('animate');
                }
            });
        }, options);

        observer.observe(boxRef.current);

        return () => observer.disconnect();
    }, []);

    return (
        <div className="blue-box" ref={boxRef}>
            <div className="content">
                <h2>Our Vision</h2>
                <p>A community where all cats and <br/> kittens are spayed, neutered, safeguarded, or sheltered.</p>
                <br/>
                <a href="/IntroductionPage" className="learn-more-button">Learn More</a>
            </div>
            <img src={image} alt="Description of the image" />
        </div>
    );
}

export default Part1;
