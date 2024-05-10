import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Footer = () => {
  return (
    <footer className="bg-dark text-white py-3 rasa-footer">
      <Container>
        <p style={{textAlign: "center"}}>&copy; 2024 Rasa. All rights reserved.</p>
      </Container>
    </footer>
  );
};

export default Footer;