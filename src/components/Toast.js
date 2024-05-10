import React, { useState } from 'react';
import Toast from 'react-bootstrap/Toast';

function ShowToast(props) {
  const [show, setShow] = useState(true);

  return (
    <Toast bg={props.bg} className="rasa-alert" onClose={() => props.onHide()} show={show} delay={2000} autohide>
        <Toast.Body>{props.message}</Toast.Body>
    </Toast>
  );
}

export default ShowToast;