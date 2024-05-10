import React, { useEffect, useState } from "react";
import { Container, Button, Form, Modal } from "react-bootstrap";
import ShowToast from "../components/Toast";
import { faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { backendFetchUrl } from "../utils/api";



function CardDetails(props){

    const [cardDetails, setCardDetails] = useState([]);
    const [showAlert, setShowAlert] = useState("");
    const [showErrorAlert, setShowErrorAlert] = useState("");
    const [showAddModal, setShowAddModal] = useState(false);
    const [paymentName, setPaymentName] = useState("");
    const [paymentId, setPaymentId] = useState("");
    const [paymentMethod, setPaymentMethod] = useState("CREDITCARD");

    useEffect(() => {
        backendFetchUrl("/payments/getCardDetails", {
            method: "GET"
        }).then(response => response.json())
        .then(data => {
            console.log(data);
            if(data.status == 1){
                setCardDetails(data.cardDetails);
            }else{
                setShowErrorAlert("Unable to retrieve payment details!")
            }
        }).catch(e => {
            setShowErrorAlert("Unable to retrieve payment details!")
        })
    }, []);

    const saveCard = () => {
        if(paymentName == "" || paymentId == "" || paymentMethod == ""){
            setShowErrorAlert("One or more fields is empty");
            return;
        }

        let reqBody = {
            "paymentMethod": paymentMethod,
            "name": paymentName,
            "paymentId": paymentId
        }

        backendFetchUrl("/payments/addCardDetails", {
            method: "POST",
            body: JSON.stringify(reqBody)
        }).then(response => response.json())
        .then(data => {
            if(data.status == 1){
                setShowAddModal(false);
                setShowAlert("Card Added successfully")
                setCardDetails([...cardDetails, data.card])
            }else{
                setShowErrorAlert("Unable to add card")
            }
        }).catch(e => {
            setShowErrorAlert("Unable to add card")
        })
    }

    return (
        <>
            <Container>
                <div style={{display: "flex", alignItems: "center", marginTop: "1rem"}}>
                    <h3>Payment Methods</h3>
                    <Button style={{marginLeft: "auto"}} className="addbtn rasabtn" variant="success" onClick={() => setShowAddModal(true)}><FontAwesomeIcon icon={faPlus} /> Add Payment Method</Button>
                </div>
                {cardDetails && cardDetails.map(card => (
                    <div className="tagContainer" style={{display: "flex", alignItems: "center", marginTop: "1rem"}}>
                        <div>
                            <h5>Name: {card.name}</h5>
                            <h5>Payment Method: {card.paymentMethod}</h5>
                            <h5>Payment ID: {card.paymentId}</h5>
                        </div>
                        <div style={{marginLeft: "auto"}}>
                            {/* <Button variant="danger" className="deletebtn rasabtn"><FontAwesomeIcon icon={faTrash} /> Remove</Button> */}
                        </div>
                    </div>
                ))}
            </Container>

            <Modal show={showAddModal} onHide={() => setShowAddModal(false)}>
                <Modal.Header>
                    <Modal.Title>Add Payment Method</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group className="mb-3">
                        <Form.Label>Payment Name</Form.Label>
                        <Form.Control
                            aria-label="Large"
                            aria-describedby="inputGroup-sizing-sm"
                            onChange={(e) => setPaymentName(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Payment Id</Form.Label>
                        <Form.Control
                            aria-label="Large"
                            aria-describedby="inputGroup-sizing-sm"
                            onChange={(e) => setPaymentId(e.target.value)}
                        />
                    </Form.Group>
                    
                    <Form.Group className="mb-3">
                        <Form.Label>Select Payment Method</Form.Label>
                        <Form.Select aria-label="Default select example" onChange={(e) => setPaymentMethod(e.target.value)}>
                            <option value={"CREDITCARD"}>{"Credit Card"}</option>
                            <option value={"PAYPAL"}>{"Paypal"}</option>
                        </Form.Select>
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowAddModal(false)}>
                        Close
                    </Button>
                    <Button variant="primary" className="addbtn rasabtn" onClick={saveCard}>
                        Add Card
                    </Button>
                </Modal.Footer>
            </Modal>

            {showAlert != "" && <ShowToast bg={"success"} message={showAlert} onHide={() => setShowAlert("")}></ShowToast>}
            {showErrorAlert != "" && <ShowToast bg={"danger"} message={showErrorAlert} onHide={() => setShowErrorAlert("")}></ShowToast>}
        </>
    )

}

export default CardDetails;