/* eslint-disable react/no-unescaped-entities */
import Accordion from 'react-bootstrap/Accordion';
import './Accordion_Intro.css';

export default function Accordion_Intro() {
  return (
    <Accordion defaultActiveKey="0">
      <Accordion.Item eventKey="0">
        <Accordion.Header className="AccordionHeader">Why This App?</Accordion.Header>
        <Accordion.Body className="AccordionBody">
          This app was developed in response to the prolonged wait times for physiotherapy appointments in Sri Lanka. Patients often endure long waits to book appointments, leading to delays in receiving crucial therapy. Our app provides a solution by offering therapeutic hand exercises that patients can perform at home, reducing reliance on traditional physiotherapy sessions. Additionally, physiotherapists can incorporate the game into their practices to assess and improve patients' hand mobility.
          "The Sri Lanka Paralysis Association estimates that approximately 12,000 individuals across the country are living with various degrees of paralysis, including hand paralysis."
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="1">
        <Accordion.Header className="AccordionHeader">Target Audience</Accordion.Header>
        <Accordion.Body className="AccordionBody">
          Our primary target audience consists of individuals struggling with hand mobility issues, encompassing a wide range of conditions such as paralysis, arthritis, and injuries. By providing accessible and engaging hand exercises, our app aims to assist patients in improving their hand dexterity and strength. Additionally, the app may appeal to individuals interested in innovative gaming experiences that utilize hand gestures for interaction.
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="2">
        <Accordion.Header className="AccordionHeader">Muscles Helped</Accordion.Header>
        <Accordion.Body className="AccordionBody">
          Our app primarily targets the muscles in the wrist, focusing on exercises to improve flexibility, strength, and coordination. By engaging in wrist-centric exercises, users can enhance their overall hand mobility and functionality. Exercises may include wrist rotations, flexion and extension movements, and grip strengthening exercises. These targeted exercises aim to address common issues associated with hand mobility impairments and promote rehabilitation.
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
}
