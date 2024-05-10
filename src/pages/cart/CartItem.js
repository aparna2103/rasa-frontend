import React from "react";
import { Card, Button } from "react-bootstrap";
import { faHeartBroken, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


function CartItem(props){

    const navigate = useNavigate()

    return (
        <>

            <Card className={`product-card cartItemContainer ${props.classname}`}>
                <Card.Img variant="top" src={props.cartItem.productImage} className="product-card-image"/>
                <Card.Body className={`product-card-body ${props.classname}-body`}>
                    <p className="product-card-title">{props.cartItem.productName}</p>
                    {props.cartItem.quantity && <Card.Text>Quantity: {props.cartItem.quantity}</Card.Text>}
                    {props.cartItem.amount && <Card.Text>Amount: ${props.cartItem.amount}</Card.Text>}
                </Card.Body>
                <Card.Footer className={`product-card-footer ${props.classname}-footer`}>
                    <Button variant="primary" className="moredetailbtn rasabtn" onClick={() => navigate("/rasa/productDetail", { state: {"productId": props.cartItem.productId, "productTag": props.cartItem.tagName }})}>More Detail</Button>
                    {props.onClick && <Button variant="danger" className="deletebtn rasabtn" onClick={() => props.onClick()}><FontAwesomeIcon icon={props.removeIcon || faTrash} /> Remove</Button>}
                </Card.Footer>
            </Card>
        </>
    )
}

export default CartItem;