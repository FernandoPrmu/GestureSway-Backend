/* eslint-disable react/prop-types */
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import './Card.css'; 

function CustomCard({ image, title, text, path }) { 
  return (
    <Link to={path} style={{ textDecoration: 'none' }}> 
      <Card className="custom-card"> {/* Add custom-card class */}
        <Card.Img variant="top" src={image} />
        <Card.Body>
          <Card.Title style={{ fontWeight: 'bold', textAlign: 'center' }}>{title}</Card.Title> 
          <Card.Text className="black-text" style={{ textAlign: 'center' }}>{text}</Card.Text> {/* Add black-text class */}
        </Card.Body>
      </Card>
    </Link>
  );
}

export default CustomCard;
