import React, { useState, useEffect } from "react";
import { backendFetchUrl } from "../../utils/api";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import RangeSlider from "react-bootstrap-range-slider";
import Productcard from "../../components/productCard";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AddProduct from "../../components/AddProduct";

function Products(props){

    const [products, setProducts] = useState([]);
    const [tags, setTags] = useState([]);
    const [maxPrice, setMaxPrice] = useState(0);
    const [filteredTags, setFilteredTags] = useState([]);
    const [filteredMaxPrice, setFilteredMaxPrice] = useState(0);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [showAddProduct, setShowAddProduct] = useState("");
    const [editProduct, setEditProduct] = useState({});

    useEffect(() => {
        backendFetchUrl("/products/all", {
            method: 'GET'
        }).then(response => response.json())
          .then(data => {
              console.log(data);
              if(data.status == 1){
                setProducts(data.products);
                setMaxPrice(data.maxPrice);
                setTags(data.tags);
                setFilteredMaxPrice(data.maxPrice);
                setFilteredProducts(data.products);
              }
        });
    }, [])

    const applyFilter = () => {
        let reqBody = {
            "tags": filteredTags,
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
        setFilteredProducts(products);
        setFilteredTags([]);
    }

    const handleEditProduct = (product) => {
        setEditProduct(product);
        setShowAddProduct("edit");
    }


    return (
        <>
            {products.length && (
                <>
                    <Container style={{maxWidth: '100%', margin: '0px'}}>
                        <div style={{display: "flex", alignItems: "center", marginTop: "1rem", padding: "1rem"}}>
                            <h3>All Products</h3>
                            <Button style={{marginLeft: "auto"}} variant="success" className="addbtn rasabtn" onClick={() => setShowAddProduct("add")}><FontAwesomeIcon icon={faPlus} /> Add Product</Button>
                        </div>
                        <Row>
                            <Col md={3} className="product-filter-parent">
                                <div className="product-filter-container">
                                <h5>Filter Products</h5>
                                <div className="filterButtons">
                                    <Button className="filterApply rasabtn moredetailbtn" onClick={applyFilter}>Apply</Button>
                                    <Button className="filterCancel rasabtn deletebtn" onClick={cancelFilter}>Cancel</Button>
                                </div>
                                <div className="filterTags">
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
                                <div>
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
                                <Container>
                                    <Row>
                                        {filteredProducts.length && filteredProducts.map(result => (
                                            <Productcard 
                                                product={result} 
                                                classname={"searchCard"} 
                                                showAddToCart={false} 
                                                showEdit={true}
                                                onClick={() => handleEditProduct(result)}></Productcard>
                                        ))} 
                                    </Row>
                                </Container>
                            </Col>
                        </Row>
                    </Container>
                    {showAddProduct == "add" && <AddProduct isEdit={false} tags={tags} fromTag={false} onClose={() => setShowAddProduct("")}/>}
                    {showAddProduct == "edit" && <AddProduct isEdit={true} tags={tags} product={editProduct} producttag={editProduct.tag.tagName} fromTag={false} onClose={() => setShowAddProduct("")}/>}
                </>
            )}
        </>
    )
}

export default Products;