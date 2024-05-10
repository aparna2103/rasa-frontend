import React, { useEffect, useState } from "react";
import { backendFetchUrl } from "../utils/api";
import { useNavigate, useLocation } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import { Button, Container, Row } from "react-bootstrap";
import '../App.css';

function BrowseProducts(props){
    const navigate = useNavigate();

    const [tags, setTags] = useState([]);

    useEffect(() => {
        backendFetchUrl("/products/tags", {
            method: 'GET'
        }).then(response => response.json())
        .then(data => {
            console.log(data);
            if(data.status == 1){
                setTags(data.tags)
            }
        });
    }, [])

    const tagClicked = tagName => {
        // get products by tag name
        backendFetchUrl("/products/getProductsByTag/" + tagName, {
            method: 'GET'
        }).then(response => response.json())
        .then(data => {
            console.log(data);
            if(data.status == 1){
                navigate("/rasa/tagproducts", { state: {"products": data.products, "productTag": tagName }})
            }
        });
    }

    return (
        <>
            <Container className="tagsContainer" style={{marginTop: "2rem"}}>
                <h2 style={{marginLeft: "-15px"}}>Browse from wide range of categories</h2>
                <Row>
                    {tags && tags.map(tag => (
                        <Card className="product-card browse-product-card" style={{ marginRight: '2rem', marginBottom: '2rem'}}>
                            <Card.Img variant="top" src={tag[1]} className="product-card-image"/>
                            {/* <Card.Body className="product-card-body" style={{height: "unset"}}>
                                <p className="product-card-title">{tag[0]}</p>
                            </Card.Body> */}
                            <Card.Footer className="product-card-footer browse-category-footer">
                                <Button variant="primary" className="moredetailbtn rasabtn" onClick={() => tagClicked(tag[0])}>Browse {tag[0]}</Button>
                            </Card.Footer>
                        </Card>
                    ))}
                </Row>
            </Container>

        </>
    )
}

export default BrowseProducts;