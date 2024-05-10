import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import Productcard from "../components/productCard";
import { backendFetchUrl } from "../utils/api";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import RangeSlider from "react-bootstrap-range-slider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter, faSearch } from "@fortawesome/free-solid-svg-icons";
import { Image } from "react-bootstrap";


function TagProducts(props){
    const { state } = useLocation();
    const [filteredMaxPrice, setFilteredMaxPrice] = useState(0);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [maxPrice, setMaxPrice] = useState(0);

    const navigate = useNavigate();

    useEffect(() => {
        setFilteredProducts(state.products);
        let currMax = 0;
        state.products.forEach(product => {
            console.log(product);
            if(product.price > currMax){
                currMax = product.price;
            }
        });
        setMaxPrice(currMax);
        setFilteredMaxPrice(currMax);
    }, [])

    const applyFilter = () => {
        let reqBody = {
            "tags": [state.productTag],
            "minPrice": 0,
            "maxPrice": filteredMaxPrice,
            "searchString": ""
        }
        backendFetchUrl("/products/filter", {
            method: 'POST',
            body: JSON.stringify(reqBody),
        }).then(response => response.json())
          .then(data => {
              console.log(data);
              if(data.status == 1){
                setFilteredProducts(data.filteredProducts);
              }
        });
    }

    const cancelFilter = () => {
        setFilteredMaxPrice(maxPrice);
        setFilteredProducts(state.products);
    }

    return (
        <>
            <Container style={{maxWidth: '100%', margin: '0px', marginTop: "2rem"}}>
                <Row>
                    <Col md={3} className="product-filter-parent">
                        <div className="product-filter-container">
                            <h5>Filter {state.productTag}</h5>
                            <div className="filterButtons">
                                <Button className="filterApply rasabtn moredetailbtn" onClick={applyFilter} style={{marginLeft: '0px'}}>
                                    <FontAwesomeIcon icon={faFilter} /> Apply</Button>
                                <Button className="filterCancel rasabtn deletebtn" onClick={cancelFilter}>Cancel</Button>
                            </div>
                            <div className="filterPrice" style={{marginTop: "2rem"}}>
                            <h5>Filter by max price</h5>
                            <RangeSlider
                                value={filteredMaxPrice}
                                onChange={changeEvent => setFilteredMaxPrice(changeEvent.target.value)}
                                min={0}
                                max={maxPrice}
                                tooltip="on"
                                tooltipPlacement="top"
                                tooltipLabel={(value) => `Max Price $${value}`}
                            />
                            </div>
                        </div>
                    </Col>
                    <Col md={9}>
                        <h1>{state.productTag}</h1>
                        <Container>
                            <Row>
                                {filteredProducts.length?filteredProducts.map(result => (
                                    <Productcard product={result} classname={"searchCard"} showAddToCart={true}></Productcard>
                                )):(
                                    <div className="emptyCartScreen" style={{display: "flex", alignItems: "center", marginTop: "1rem"}}>
                                        <Image src="https://minteventrentals.com/public/templates/mint/images/noproductfound.png" style={{height: "200px"}} />
                                        <h2>Uh oh! No {state.productTag} to show. We are working on to get some {state.productTag}</h2>
                                        <Button variant="primary" className="moredetailbtn rasabtn" onClick={() => navigate("/rasa/browseproducts")}><FontAwesomeIcon icon={faSearch} /> Explore Other Categories</Button>
                                    </div>
                                )} 
                            </Row>
                        </Container>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default TagProducts