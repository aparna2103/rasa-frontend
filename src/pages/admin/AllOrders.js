import React, { useEffect, useState } from "react";
import { backendFetchUrl } from "../../utils/api";
import { Button, Container, Image } from "react-bootstrap";
import { Navigate, useNavigate } from "react-router-dom";
import { faCheck, faExternalLink, faFilter, faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


function AllOrders(props){

    const navigate = useNavigate();

    const [pendingOrders, setPendingOrders] = useState([]);
    const [fulfilledOrders, setFulfilledOrders] = useState([]);
    const [current, setCurrent] = useState("PENDING");

    useEffect(() => {
        backendFetchUrl("/orders/getAllOrders", {
            method: 'GET'
        }).then(response => response.json())
        .then(data => {
            console.log(data);
            if(data.status == 1){
                setPendingOrders(data.pendingorders);
                setFulfilledOrders(data.fulfilledorders)
            }
        });
    }, []);

    const changeStatus = (order) => {
        backendFetchUrl("/orders/changeStatus/"+order.orderId, {
            method: "POST",
            body: JSON.stringify({"orderStatus": "FULFILLED"})
        }).then(response => response.json())
        .then(data => {
            console.log(data);
            if(data.status == 1){
                setPendingOrders(pendingOrders.filter(pending => pending.orderId != order.orderId));
                setFulfilledOrders([...fulfilledOrders, order])
            }
        });
    }

    return (
        <>
            <Container>
                <div style={{display: "flex", alignItems: "center", marginTop: "1rem"}}>
                    <h3>All Orders</h3>
                    <Button style={{marginLeft: "auto"}} className="moredetailbtn rasabtn" variant="success" 
                    onClick={() => {
                        if(current == "PENDING"){
                            setCurrent("FULFILLED")
                        }else{
                            setCurrent("PENDING")
                        }
                    }}><FontAwesomeIcon icon={faFilter} /> {`Showing ${current.toLowerCase()} orders`}</Button>
                </div>
                {(current == "PENDING"?(pendingOrders.length?pendingOrders.map(order => (
                    <div className="tagContainer" style={{display: "flex", alignItems: "center", marginTop: "1rem"}}>
                        <div>
                            <h5>Order #{order.orderId}</h5>
                            <h5>Order Date: {order.orderDate}</h5>
                            <h5>Total: ${order.totalAmount}</h5>
                        </div>
                        <div style={{marginLeft: "auto"}}>
                        <Button className="rasabtn addbtn" onClick={() => changeStatus(order)}><FontAwesomeIcon icon={faCheck} /> Complete order</Button>
                            <Button className="rasabtn moredetailbtn" onClick={() => navigate("/rasa/order", {state: {"orderId": order.orderId, "totalAmount": order.totalAmount}})}><FontAwesomeIcon icon={faExternalLink} /> Go to order</Button>
                        </div>
                    </div>
                )):(
                    <>
                        <div className="emptyCartScreen" style={{display: "flex", alignItems: "center", marginTop: "1rem"}}>
                            <Image src="https://static.thenounproject.com/png/4382148-200.png" style={{height: "200px"}} />
                            <h2>All the orders had been fulfilled!</h2>
                        </div>
                    </>
                )):(<></>))}

                {(current == "FULFILLED"?(fulfilledOrders.length?fulfilledOrders.map(order => (
                    <div className="tagContainer" style={{display: "flex", alignItems: "center", marginTop: "1rem"}}>
                        <div>
                            <h5>Order #{order.orderId}</h5>
                            <h5>Order Date: {order.orderDate}</h5>
                            <h5>Total: ${order.totalAmount}</h5>
                        </div>
                        <div style={{marginLeft: "auto"}}>
                            <Button className="rasabtn moredetailbtn" onClick={() => navigate("/rasa/order", {state: {"orderId": order.orderId}})}><FontAwesomeIcon icon={faExternalLink} /> Go to order</Button>
                        </div>
                    </div>
                )):(
                    <>
                        <div className="emptyCartScreen" style={{display: "flex", alignItems: "center", marginTop: "1rem"}}>
                            <Image src="https://img.freepik.com/premium-vector/order-processing-flat-vector-illustration-mobile-shopping-application-status-icon-stage-ecommerce-service-store-employee-processes-order_241107-1217.jpg" style={{height: "200px"}} />
                            <h2>No fulfilled orders at this time.</h2>
                        </div>
                    </>
                )):(
                    <></>
                ))}
            </Container>
        </>

    )
}

export default AllOrders;