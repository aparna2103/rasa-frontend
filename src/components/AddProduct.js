import React, { useState } from "react";
import { Button, Container, Form, InputGroup, Modal } from "react-bootstrap";
import ShowToast from "./Toast";
import { backendFetchUrl } from "../utils/api";

function AddProduct(props){
    const [productName, setProductName] = useState(props.product && props.product.name?props.product.name:"");
    const [productDescription, setProductDescription] = useState(props.product && props.product.description?props.product.description:"");
    const [productPrice, setProductPrice] = useState(props.product && props.product.price?props.product.price:0);
    const [tagName, setTagName] = useState(props.producttag?props.producttag:"");
    const [productQuantity, setProductQuantity] = useState(props.product && props.product.quantity?props.product.quantity:0);
    const [imageUrl, setImageUrl] = useState(props.product && props.product.imageUrl?props.product.imageUrl:"");
    const [showAlert, setShowAlert] = useState("");
    const [showErrorAlert, setShowErrorAlert] = useState("");
    //This is the add product function

    const addProduct = () => {
        if(props.fromTag){
            setTagName(props.producttag)
        }
        if(productName == "" || productDescription == "" || productPrice == 0 || tagName == "" || productQuantity == "" || imageUrl == ""){
            setShowErrorAlert("One or more fields is empty!")
            return;
        }

        let reqBody = {
            "name": productName,
            "description": productDescription,
            "price": productPrice,
            "tagName": tagName,
            "quantity": productQuantity,
            "imageUrl": imageUrl
        }

        backendFetchUrl("/products/addProduct", {
            method: 'POST',
            body: JSON.stringify(reqBody)
        }).then(response => response.json())
        .then(data => {
            console.log(data);
            if(data.status == 1){
                // props.onClose();
                setShowAlert("Product added successfully")
                setTimeout(() => {props.onClose()}, 1000)
            }else{
                setShowErrorAlert("Product already present!");
            }
        }).catch(error => {
            setShowErrorAlert("Product already present!");
        });

    }

    const editProduct = () => {
        if(productDescription == ""){
            setShowErrorAlert("One or more fields is empty!")
            return;
        }
        let reqBody = {
            "name": productName,
            "description": productDescription,
            "price": productPrice,
            "tagName": tagName,
            "imageUrl": imageUrl
        }

        backendFetchUrl("/products/editProduct/" + props.product.productId, {
            method: 'POST',
            body: JSON.stringify(reqBody)
        }).then(response => response.json())
        .then(data => {
            console.log(data);
            if(data.status == 1){
                // props.onClose();
                setShowAlert("Product edited successfully")
                setTimeout(() => {props.onClose()}, 1000)
            }else{
                setShowErrorAlert("Product already present!");
            }
        }).catch(error => {
            setShowErrorAlert("Product already present!");
        });
    }
    return (
        <>
        <Modal show={true} onHide={() => props.onClose()}>
                <Modal.Header>
                    <Modal.Title>{`${props.isEdit?"Edit":"Add"} Product`}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Product Name</Form.Label>
                            {props.isEdit?(
                                <Form.Control
                                    readOnly
                                    aria-label="Large"
                                    aria-describedby="inputGroup-sizing-sm"
                                    value={productName}
                                />
                            ):(
                                <Form.Control
                                    aria-label="Large"
                                    aria-describedby="inputGroup-sizing-sm"
                                    onChange={(e) => setProductName(e.target.value)}
                                />
                            )}
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Product Description</Form.Label>
                            {props.isEdit?(
                                <Form.Control
                                    as="textarea"
                                    aria-label="Large"
                                    aria-describedby="inputGroup-sizing-sm"
                                    value={productDescription}
                                    onChange={(e) => setProductDescription(e.target.value)}
                                />
                            ):(
                                <Form.Control
                                    as="textarea"
                                    aria-label="Large"
                                    aria-describedby="inputGroup-sizing-sm"
                                    onChange={(e) => setProductDescription(e.target.value)}
                                />
                            )}
                            
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Product Price</Form.Label>
                            {props.isEdit?(
                                <Form.Control
                                        type="number"
                                        readOnly
                                        aria-label="Large"
                                        aria-describedby="inputGroup-sizing-sm"
                                        value={productPrice}
                                />
                            ):(
                                <Form.Control
                                        type="number"
                                        aria-label="Large"
                                        aria-describedby="inputGroup-sizing-sm"
                                        onChange={(e) => setProductPrice(e.target.value)}
                                />
                            )}
                            
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Product Tag</Form.Label>
                            {(props.isEdit || props.fromTag) ?(
                                <Form.Control
                                    readOnly={props.isEdit}
                                    aria-label="Large"
                                    aria-describedby="inputGroup-sizing-sm"
                                    value={props.producttag}
                                />
                            ):(
                                
                                <Form.Select aria-label="Default select example" onChange={(e) => setTagName(e.target.value)}>

                                    <option value={""}>{"Select Tag"}</option>
                                    {props.tags.length && props.tags.map(tag => (
                                        <>
                                            {Array.isArray(tag) && <option value={tag[0]}>{tag[0]}</option>}
                                            {!Array.isArray(tag) && <option value={tag}>{tag}</option>}
                                        </>
                                    ))}
                                </Form.Select>
                            )}
                        </Form.Group>
                        {!props.isEdit && (
                            <Form.Group className="mb-3">
                                <Form.Label>Product Quantity</Form.Label>
                                    <Form.Control
                                        type="number"
                                        aria-label="Large"
                                        aria-describedby="inputGroup-sizing-sm"
                                        onChange={(e) => setProductQuantity(e.target.value)}
                                    />
                            </Form.Group>
                        )}

                        <Form.Group className="mb-3">
                            <Form.Label>Product Image URL</Form.Label>
                            {props.isEdit?(
                                <Form.Control
                                        readOnly
                                        aria-label="Large"
                                        aria-describedby="inputGroup-sizing-sm"
                                        value={imageUrl}
                                />
                            ):(
                                <Form.Control
                                        aria-label="Large"
                                        aria-describedby="inputGroup-sizing-sm"
                                        onChange={(e) => setImageUrl(e.target.value)}
                                />
                            )}
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={() => props.onClose()}>
                    Close
                </Button>
                <Button variant="primary" className="addbtn rasabtn" onClick={props.isEdit?editProduct:addProduct}>
                    Save
                </Button>
                </Modal.Footer>
        </Modal>
        {showAlert != "" && <ShowToast bg={"success"} message={showAlert} onHide={() => setShowAlert("")}></ShowToast>}
        {showErrorAlert != "" && <ShowToast bg={"danger"} message={showErrorAlert} onHide={() => setShowErrorAlert("")}></ShowToast>}
        </>
    )
}

export default AddProduct;