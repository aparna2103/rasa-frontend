import React, { useEffect, useState } from "react";
import { useAsyncError, useLoaderData, useLocation } from "react-router-dom";
import { backendFetchUrl } from "../utils/api";
import Productcard from "../components/productCard";
import { Button, Col, Container, Form, Row, Image } from "react-bootstrap";
import RangeSlider from "react-bootstrap-range-slider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter } from "@fortawesome/free-solid-svg-icons";


function SearchProducts(props){
    const state = useLocation();
    const [searchResults, setSearchResults] = useState([]);
    const [tags, setTags] = useState([]);
    const [maxPrice, setMaxPrice] = useState(0);
    const [filteredTags, setFilteredTags] = useState([]);
    const [filteredMaxPrice, setFilteredMaxPrice] = useState(0);
    const [filteredProducts, setFilteredProducts] = useState([]);

    useEffect(() => {
        backendFetchUrl("/products/searchProducts/" + state.state.search, {
            method: 'GET'
        }).then(response => response.json())
          .then(data => {
              console.log(data);
              if(data.status == 1){
                setSearchResults(data.products);
                setMaxPrice(data.maxPrice);
                setTags(data.tags);
                setFilteredMaxPrice(data.maxPrice);
                setFilteredProducts(data.products);
              }
        });
    }, [state.state.search])

    const applyFilter = () => {
        let reqBody = {
            "tags": filteredTags,
            "minPrice": 0,
            "maxPrice": filteredMaxPrice,
            "searchString": state.state.search
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
        setFilteredProducts(searchResults);
        setFilteredTags([]);
    }


    return (
        <>
            {searchResults && (
                <>
                    <Container style={{maxWidth: '100%', margin: '0px', marginTop: "2rem"}}>
                        <Row>
                            <Col md={3} className="product-filter-parent">
                                <div className="product-filter-container">
                                    <h5>Filter Products</h5>
                                    <div className="filterButtons">
                                        <Button className="filterApply rasabtn moredetailbtn" onClick={applyFilter} style={{marginLeft: '0px'}}>
                                            <FontAwesomeIcon icon={faFilter} /> Apply</Button>
                                        <Button className="filterCancel rasabtn deletebtn" onClick={cancelFilter}>Cancel</Button>
                                    </div>
                                    <div className="filterTags" style={{marginTop: "1rem"}}>
                                        <h5>Filter by category</h5>
                                        <div key={`default-checkbox`} className="mb-3">
                                            {tags.length && tags.map(tag => (
                                                <Form.Check // prettier-ignore
                                                    onChange={(e) => {
                                                        if(e.target.checked){
                                                            setFilteredTags([...filteredTags, tag])
                                                        }else{
                                                            setFilteredTags(filteredTags.filter(filteredTag => filteredTag != tag))
                                                        }
                                                    }}
                                                    type={"checkbox"}
                                                    id={`checkbox-${tag}`}
                                                    label={tag}
                                                />
                                            ))}
                                        </div>
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
                                <h1>Search Results for: {state.state.search}</h1>
                                <Container>
                                    <Row>
                                        {filteredProducts.length?filteredProducts.map(result => (
                                            <Productcard product={result} classname={"searchCard"} showAddToCart={true}></Productcard>
                                        )):(
                                            <>
                                                <div className="emptyCartScreen" style={{display: "flex", alignItems: "center", marginTop: "1rem"}}>
                                                    <Image src="https://assets.materialup.com/uploads/16e7d0ed-140b-4f86-9b7e-d9d1c04edb2b/preview.png" style={{height: "200px"}} />
                                                    <h2>Uh oh! No products found for your filter</h2>
                                                    <Button className="filterCancel rasabtn deletebtn" onClick={cancelFilter}>Cancel Filter</Button>
                                                </div>
                                            </>
                                        )} 
                                    </Row>
                                </Container>
                            </Col>
                        </Row>
                    </Container>
                </>
            )}
        </>
    )
}

export default SearchProducts;