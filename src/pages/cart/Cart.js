import React, { useEffect, useState } from "react";
import { backendFetchUrl } from "../../utils/api";
import CartItem from "./CartItem";
import { Button, Col, Container, Form, Image, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Modal } from "react-bootstrap";
import { faSearch, faShoppingBasket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Spinner } from "react-bootstrap";



function Cart(props){
    const navigate = useNavigate([]);
    const [cartItems, setCarttems] = useState();
    const [totalAmount, setTotalAmount] = useState(0);
    const [orderId, setOrderId] = useState(0);
    const [buyNowModal, setbuyNowModal] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState("CREDITCARD")
    const [showSpinner, setShowSpinner] = useState(false);

    useEffect(() => {
        backendFetchUrl("/products/getcart", {
            method: 'GET'
        }).then(response => response.json())
        .then(data => {
            console.log(data);
            if(data.status == 1){
                setCarttems(data.cartItems);
                setTotalAmount(data.totalAmount);
            }
        });
    }, [])

    const buyNow = () => {
        setbuyNowModal(true);
    }

    const checkout = ()  => {
        setbuyNowModal(false);
        setShowSpinner(true);
        setTimeout(() => {
            backendFetchUrl("/products/buyNow", {
                method: 'POST',
                body: JSON.stringify({"paymentMethod": paymentMethod})
            }).then(response => response.json())
            .then(data => {
                console.log(data);
                if(data.status == 1){
                    setOrderId(data.orderId);
                    setShowSpinner(false);
                }
            }).catch((e) => {
                console.log(e)
            });
        }, 3000)
    }

    const removeFromCart = (cartId) => {
        backendFetchUrl("/products/removefromcart/" + cartId, {
            method: 'DELETE'
        }).then(response => response.json())
        .then(data => {
            console.log(data);
            if(data.status == 1){
                setCarttems(cartItems.filter(cartItem => cartItem.cartId != cartId))
            }
        }).catch(error => {
            // setShowErrorAlert("Product Tag already present!");
        });
    }


    return (
        <>
            {(cartItems && cartItems.length)?(
                <>
                    <Container>
                        <div style={{display: "flex", alignItems: "center", marginTop: "1rem"}}>
                            <h3>Your Cart</h3>
                            <div className="cartHeader" style={{marginLeft: "auto", display: "flex", gap: "15px", alignItems: "center"}} >
                                <h4>Total amount: ${totalAmount}</h4>
                                <Button variant="primary" className="moredetailbtn rasabtn" onClick={() => navigate("/rasa/browseproducts")}><FontAwesomeIcon icon={faSearch} /> Browse products</Button>
                                <Button className="addbtn rasabtn" variant="success" onClick={() => buyNow()}><FontAwesomeIcon icon={faShoppingBasket} /> Buy now</Button>
                            </div>
                        </div>
                        <Container className="cartItemParent">
                            <Row>
                                {cartItems.map(cartItem => (
                                    <CartItem cartItem={cartItem} onClick={() => removeFromCart(cartItem.cartId)}></CartItem>
                                ))}
                            </Row>
                        </Container>
                    </Container>
                </>
            ):(
                <>
                    <div className="emptyCartScreen" style={{display: "flex", alignItems: "center", marginTop: "1rem"}}>
                        <Image src="https://assets.materialup.com/uploads/16e7d0ed-140b-4f86-9b7e-d9d1c04edb2b/preview.png" style={{height: "200px"}} />
                        <h2>Uh oh! Looks like cart is empty.</h2>
                        <Button variant="primary" className="moredetailbtn rasabtn" onClick={() => navigate("/rasa/browseproducts")}><FontAwesomeIcon icon={faSearch} /> Time to add products</Button>
                    </div>
                </>
            )}

            <Modal show={orderId} onHide={() => {
                setCarttems([]);
                setOrderId(0)
            }}>
                <Modal.Body style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                    }}>
                    <h6>Order ID: {orderId}</h6>
                    <h6>Order Placed!!</h6>
                    <h6>Total amount: ${totalAmount}</h6>
                </Modal.Body>
                <Modal.Footer>
                    <Button className="rasabtn moredetailbtn" variant="primary" onClick={() => navigate("/rasa/home")}>Browse Products</Button>
                    <Button className="addbtn rasabtn" onClick={() => navigate("/rasa/order", {state: {"orderId": orderId, "totalAmount": totalAmount}})}>Track Order</Button>
                </Modal.Footer>
            </Modal>

            <Modal show={buyNowModal}>
                <Modal.Body>
                    <Form.Group className="mb-3">
                        <Form.Label>Select Payment Method</Form.Label>
                        <Form.Select aria-label="Default select example" onChange={(e) => setPaymentMethod(e.target.value)}>
                            <option value={"CREDITCARD"}>{"Credit Card"}</option>
                            <option value={"PAYPAL"}>{"Paypal"}</option>
                        </Form.Select>
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" className="addbtn rasabtn" onClick={() => checkout()}>Checkout</Button>
                </Modal.Footer>
            </Modal>
            <Modal show={showSpinner} className="spinnerModal">
                <Modal.Body style={{
                        width: "fit-content",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                    }}>
                    <Spinner animation="border"  variant="primary" role="status" />
                    <p>Purchase in progress...</p>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default Cart;