import { useState } from "react";
import { Alert, Button } from "react-bootstrap";
import Form from 'react-bootstrap/Form';
import { backendFetchUrl } from "../utils/api";
import { Modal } from "react-bootstrap";
import ShowToast from "./Toast";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";


function AddToCart(props){
    const [showModal, setShowModal] = useState(false);
    const [quantity, setQuantity] = useState(1);
    const [showAlert, setShowAlert] = useState(false);
    const [showErrorAlert, setShowErrorAlert] = useState(false);

    const addToCart = () => {
        let reqBody = {
            "productId": props.productId,
            "quantity": quantity
        }
        backendFetchUrl("/products/addToCart", {
            method: 'POST',
            body: JSON.stringify(reqBody)
        }).then(response => response.json())
        .then(data => {
            console.log(data);
            if(data.status == 1){
                setShowAlert(true)
                setShowModal(false);
            }else{
                setShowErrorAlert(true);
                setShowModal(false);
            }
        });
    }

    const showAddToCartModal = () => {
        setShowModal(!showModal);
    }

    return (

        <>
            <Button variant="primary" className="addtocartbtn rasabtn" onClick={showAddToCartModal}><FontAwesomeIcon icon={faShoppingCart} /> Add to Cart</Button>

            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Select quantity</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Select onChange={e => setQuantity(e.target.value)}>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                    </Form.Select>
                </Modal.Body>
                <Modal.Footer>
                        <Button variant="secondary" onClick={() => setShowModal(false)}>Close</Button>
                        <Button variant="primary" onClick={addToCart}>Add</Button>
                </Modal.Footer>
            </Modal>

            {showAlert && <ShowToast bg={"success"} message={"Product added successfully!"} onHide={() => setShowAlert(false)}></ShowToast>}
            {showErrorAlert && <ShowToast bg={"danger"} message={"Product already in cart!"} onHide={() => setShowErrorAlert(false)}></ShowToast>}
        </>
        
    )
}

export default AddToCart;