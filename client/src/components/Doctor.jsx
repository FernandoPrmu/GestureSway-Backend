// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import DImage1 from '../assets/Doctor1.jpeg';
import DImage2 from '../assets/Doctor2.jpeg';
import './Doctor.css';

export default function Test() {
  const [showModal, setShowModal] = useState(false);
  const [description, setDescription] = useState('');
  const [imageSrc, setImageSrc] = useState('');

  const handleShowModal = (text, imgSrc) => {
    setDescription(text);
    setImageSrc(imgSrc);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setDescription('');
    setImageSrc('');
    setShowModal(false);
  };

  return (
    <div className="profile-container">
      <div className="card-wrapper">
      <div className="caption_1">
        <h1>Domain experts <br/>opinion about <span style={{ color: '#ffbf05' }}>GestureSway</span></h1>
      </div>
        <Card className="custom-card-container">
          <div className="image-overlay" onClick={() => handleShowModal(<p style={{ color: 'black', textAlign: 'justify' }}>The project received positive feedback and additional support, emphasising the importance of incorporating hand gestures that ideally mimic natural hand gestures for optimal functionality within the game. The reviewer expressed satisfaction with the chosen hand gestures, deeming them practical and valuable. Furthermore, the feedback introduced a novel perspective, noting that the inclusion of these gestures significantly expanded the target audience, particularly benefiting heart patients recovering from strokes.</p>, DImage1)}></div>
          <Card.Img variant="top" src={DImage1} />
          <Card.Body>
            <Card.Title className="custom-card-title">Dr. Chinthaka Godigamuwa (Visiting Physician, General Hospital Kandy)</Card.Title>
            <Card.Text className="custom-card-text">
              Some quick example text to build on the card title and make up the bulk of the cards content.
            </Card.Text>
            <Button variant="primary" className="custom-button" onClick={() => handleShowModal("Description for Dr. Chinthaka Godigamuwa", DImage1)}>Read more</Button>
          </Card.Body>
        </Card>

        {/* Second Card */}
        <Card className="custom-card-container">
          <div className="image-overlay" onClick={() => handleShowModal(<p style={{ color: 'black', textAlign: 'justify' }}>The projects concept received positive feedback, emphasising enhancing communication through increased incorporation of hand gestures. Additionally, a suggestion was to broaden the target audience by including individuals with Down syndrome, recognising their learning potential and the need for relaxation improvement within a constrained time frame. To further optimise the projects structure, it was advised to categorise patients based on their specific conditions, such as those with Down syndrome, heart patients, and individuals paralysed due to accidents. This recommendation aims to achieve a more organised and aligned approach to the projects development.</p>, DImage2)}></div>
          <Card.Img variant="top" src={DImage2} />
          <Card.Body>
            <Card.Title className="custom-card-title">Dr. Dilushka Jayakody, Former Medical Officer (SLAF).</Card.Title>
            <Card.Text className="custom-card-text">
              Another example text to build on the card title and make up the bulk of the cards content.
            </Card.Text>
            <Button variant="primary" className="custom-button" onClick={() => handleShowModal("Description for Dr. Dilushka Jayakody", DImage2)}>Read more</Button>
          </Card.Body>
        </Card>
      </div>

      <div className="modal-container" style={{ display: showModal ? 'flex' : 'none' }}>
        <div className="modal-content">
          <img src={imageSrc} alt="Description Image" className="modal-image" />
          <h2 className="modal-title">Additional Description</h2>
          <p className="modal-text">{description}</p>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </div>
      </div>
    </div>
  );
}
