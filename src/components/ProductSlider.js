import React, { useEffect, useState } from "react";
import { backendFetchUrl } from "../utils/api";
import Productcard from "./productCard";
import { Button, Container, Row } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";


function ProductSlider(props){

    const [products, setProducts] = useState([]);
    const [currProducts, setCurrProducts] = useState([]);
    const [currIdx, setCurrIdx] = useState(3);

    useEffect(() => {
        backendFetchUrl(props.url, {
            method: 'GET'
        }).then(response => response.json())
        .then(data => {
            console.log(data);
            if(data.status == 1){
                if(data.products.length % 3 != 0){
                    data.products = data.products.slice(0, data.products.length - (data.products.length % 3))
                }
                setProducts(data.products);
                setCurrProducts(data.products.slice(0, 3))
            }
        });
    }, [])

    const slideProducts = (direction) => {
        let idx = currIdx;
        if(direction == "right"){
            if(idx == products.length){
                idx = 3;
            }else{
                idx += 3;
            }
        } else if(direction == "left"){
            if(idx == 3){
                idx = products.length;
            }else{
                idx -= 3;
            }
        }
        setCurrProducts(products.slice(idx-3, idx));
        setCurrIdx(idx);
    }

    return (
        <>
            {currProducts.length && (
                <>
                    <h1 style={{textAlign: "center"}}>{props.title}</h1>
                    <div className="homePageProductsCont" style={{marginBottom: '10rem'}}>
                        <Button className="leftArrow" onClick={() => slideProducts("left")}>
                            <FontAwesomeIcon icon={faArrowLeft} /> 
                        </Button>
                        {currProducts.map(product => (
                            <Productcard product={product} showAddToCart={true}></Productcard>
                        ))}
                        <Button className="rightArrow" onClick={() => slideProducts("right")}>
                            <FontAwesomeIcon icon={faArrowRight} /> 
                        </Button>
                    </div>
                </>
            )}
        </>
    )
}

export default ProductSlider;