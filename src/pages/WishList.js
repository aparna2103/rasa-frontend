import React, { useEffect, useState } from "react";
import { backendFetchUrl } from "../utils/api";
import { Button, Col, Container, Form, Image, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { faHeartBroken, faSearch, faShoppingBasket } from "@fortawesome/free-solid-svg-icons";
import CartItem from "./cart/CartItem";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


function WishList(props){
    const navigate = useNavigate();
    const [wishlist, setWishList] = useState();

    useEffect(() => {
        backendFetchUrl("/wishlist", {
            method: 'GET'
        }).then(response => response.json())
        .then(data => {
            console.log(data);
            if(data.status == 1){
                setWishList(data.wishlist)
            }
        });
    }, [])

    const removeFromWishlist = (wishlistId) => {
        backendFetchUrl("/wishlist/remove/" + wishlistId, {
            method: 'DELETE'
        }).then(response => response.json())
        .then(data => {
            console.log(data);
            if(data.status == 1){
                setWishList(wishlist.filter(wishlist => wishlist.wishlistId != wishlistId))
            }
        }).catch(error => {
            // setShowErrorAlert("Product Tag already present!");
        });
    }

    return (
        <>
            {(wishlist && wishlist.length)?(
                <>
                    <Container>
                        <div style={{display: "flex", alignItems: "center", marginTop: "1rem"}}>
                            <h3>WishList</h3>
                        </div>
                        <Container className="cartItemParent">
                            <Row>
                                {wishlist.map(cartItem => (
                                    <CartItem cartItem={cartItem} classname={"wishlistItem"} removeIcon={faHeartBroken} onClick={() => removeFromWishlist(cartItem.wishlistId)}></CartItem>
                                ))}
                            </Row>
                        </Container>
                    </Container>
                </>
            ):(
                <>
                    <div className="emptyCartScreen" style={{display: "flex", alignItems: "center", marginTop: "1rem"}}>
                        <Image src="https://elegantjewelersli.com/assets/images/empty-wishlist.png" style={{height: "200px"}} />
                        <h2>Our products are loved by many. You will love them too!</h2>
                        <Button variant="primary" className="moredetailbtn rasabtn" onClick={() => navigate("/rasa/browseproducts")}><FontAwesomeIcon icon={faSearch} /> Explore Products</Button>
                    </div>
                </>
            )}
        </>
    )
}

export default WishList;