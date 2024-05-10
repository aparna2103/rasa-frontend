import React, { useEffect, useState } from "react";
import SliderImage from "../components/SliderImage";
import { Button, Col } from "react-bootstrap";
import { backendFetchUrl } from "../utils/api";
import {Container, Row} from "react-bootstrap";
import { useLocation } from "react-router-dom";
import AddToCart from "../components/AddToCartBtn";
import AddToWishlist from "../components/AddToWishlist";
import ProductSlider from "../components/ProductSlider";

function ProductDetail(props){
    const { state } = useLocation();
    const [productDetail, setProductDetail] = useState({});

    useEffect(() => {
        backendFetchUrl("/products/getProduct/" + state.productId, {
            method: 'GET'
        }).then(response => response.json())
        .then(data => {
            console.log(data);
            if(data.status == 1){
                setProductDetail(data.product)
            }
        });
    }, [state.productId])

    return (
        <>
            {productDetail && (
                <>
                    <Container style={{marginTop: '2rem'}}>
                        <Row>
                            <Col>
                                <SliderImage text={productDetail.name} imageurl={productDetail.imageUrl}/>
                            </Col>
                            <Col>
                                <h2>{productDetail.name}</h2>
                                <h4>Price: ${productDetail.price}</h4>
                                <AddToCart productId={productDetail.productId}></AddToCart>
                                <AddToWishlist productId={productDetail.productId}></AddToWishlist>
                                <p>{productDetail.description}</p>
                            </Col>
                        </Row>
                        <div className="similarProdCont" style={{marginTop: '5rem'}}>
                            {productDetail.tag && <ProductSlider title={"Similar Products"} url={`/products/getProductsByTag/${productDetail.tag.tagName}`} />}
                        </div>
                    </Container>
                </>
            )}
        </>
    )


}

export default ProductDetail;