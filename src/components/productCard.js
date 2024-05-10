import React from "react";
import { Button } from "react-bootstrap";
import Card from 'react-bootstrap/Card';
import { useNavigate } from 'react-router-dom';
import AddToCart from "./AddToCartBtn";
import '../App.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faPencil } from "@fortawesome/free-solid-svg-icons";


function Productcard(props){
    const navigate = useNavigate(); // React Router hook for navigation

    

    return (
        <Card className={`product-card ${props.classname}`}>
            <Card.Img variant="top" src={props.product.imageUrl} className="product-card-image"/>
            <Card.Body className="product-card-body">
                <h5 className="product-card-title">{props.product.name}</h5>
                <h6>Price: ${props.product.price}</h6>
            </Card.Body>
            <Card.Footer className="product-card-footer">
                <Button variant="primary" className="moredetailbtn rasabtn" onClick={() => navigate("/rasa/productDetail", { state: {"productId": props.product.productId, "productTag": props.product.tag.tagName }})}>More Detail</Button>
                {props.showAddToCart && <AddToCart productId={props.product.productId}></AddToCart>}
                {props.showEdit && <Button variant="info" className="editbtn rasabtn" onClick={() => props.onClick()}><FontAwesomeIcon icon={faPencil} /> Edit Product</Button>}
            </Card.Footer>
        </Card>
    )
}

export default Productcard;