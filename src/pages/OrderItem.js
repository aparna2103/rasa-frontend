import React, { useEffect, useState } from "react";
import { backendFetchUrl } from "../utils/api";
import { useLocation, useNavigate } from "react-router-dom";
import { Button, Container, Image, Card, Row } from "react-bootstrap";


function OrderItem(props){
    const navigate = useNavigate();
    const [orderItems, setOrderItems] = useState();
    const { state } = useLocation();


    useEffect(() => {
        backendFetchUrl("/orders/getOrderItems/" + state.orderId, {
            method: 'GET'
        }).then(response => response.json())
        .then(data => {
            console.log(data);
            if(data.status == 1){
                setOrderItems(data.orderItems)
            }
        });
    }, [])

    return (
        <>

            <Container>
                <div style={{display: "flex", alignItems: "center", marginTop: "1rem"}}>
                    <h3>Order #{state.orderId}</h3>
                    <h3 style={{marginLeft: "auto"}}>Total: ${state.totalAmount}</h3>
                </div>
                <Row>
                    {(orderItems && orderItems.length && orderItems.map(orderItem => (
                        <Card className={`product-card cartItemContainer ${props.classname}`}>
                            <Card.Img variant="top" src={orderItem.product.imageUrl} className="product-card-image"/>
                            <Card.Body className="product-card-body">
                                <p className="product-card-title">Product name: {orderItem.product.name}</p>
                                <Card.Text>Quantity: {orderItem.quantity}</Card.Text>
                                <Card.Text>Unit Price: ${orderItem.unitPrice}</Card.Text>
                            </Card.Body>
                            <Card.Footer className="product-card-footer">
                                <Button variant="primary" className="moredetailbtn rasabtn" onClick={() => navigate("/rasa/productDetail", { state: {"productId": orderItem.product.productId, "productTag": orderItem.product.tag.tagName }})}>More Detail</Button>
                            </Card.Footer>
                        </Card>
                    )))}
                </Row>
            </Container>
        </>
    )
}

export default OrderItem;