/* eslint-disable react/no-unescaped-entities */
// eslint-disable-next-line no-unused-vars
import React, { useRef, useEffect } from 'react';
import './Part2.css'; 
import image from '../assets/Part2.png'; 

function Part2() {
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
        <div className="blue-box-part2" ref={boxRef}>
            <div className="content-part2">
                <h2>"Let your hands <br/> do the talking: <br/> Gesture-driven innovation"</h2>
            </div>
            <img src={image} alt="Description of the image" className="image-part2" />
        </div>
    );
}

export default Part2;
