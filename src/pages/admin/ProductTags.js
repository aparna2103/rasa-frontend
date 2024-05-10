import React, { useEffect, useState } from "react";
import { backendFetchUrl } from "../../utils/api";
import { Button, Container, Form, InputGroup, Modal } from "react-bootstrap";
import { faPlus, faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import ShowToast from "../../components/Toast";
import AddProduct from "../../components/AddProduct";


function ProductTags(props){
    const navigate = useNavigate();

    const [tags, setTags] = useState([]);
    const [showAddTagModal, setShowAddTagModal] = useState(false);
    const [tagName, setTagName] = useState("");
    const [tagImage, setTagImage] = useState("");
    const [showAlert, setShowAlert] = useState("");
    const [showErrorAlert, setShowErrorAlert] = useState("");
    const [showAddProduct, setShowAddProduct] = useState("");

    useEffect(() => {
        backendFetchUrl("/products/tags", {
            method: 'GET'
        }).then(response => response.json())
        .then(data => {
            console.log(data);
            if(data.status == 1){
                setTags(data.tags);
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

    const saveTag = () => {
        if(tagName == "" || tagImage == ""){
            setShowErrorAlert("Tag name or Tag Image is not given");
            return;
        }
        backendFetchUrl("/products/addTag", {
            method: 'POST',
            body: JSON.stringify({"name": tagName, "imageURL": tagImage})
        }).then(response => response.json())
        .then(data => {
            console.log(data);
            if(data.status == 1){
                setTags([...tags, [data.tag.tagName, data.tag.imageUrl]])
                setShowAddTagModal(false);
                setShowAlert("Product Tag added successfully")
            }else{
                setShowErrorAlert("Product Tag already present!");
            }
        }).catch(error => {
            setShowErrorAlert("Product Tag already present!");
        });
    }

    return (
        <>
            <Container>
                <div style={{display: "flex", alignItems: "center", marginTop: "1rem"}}>
                    <h3>Product Tags</h3>
                    <Button style={{marginLeft: "auto"}} className="addbtn rasabtn" variant="success" onClick={() => setShowAddTagModal(true)}><FontAwesomeIcon icon={faPlus} /> Add Tag</Button>
                </div>
                {tags.length && tags.map(tag => (
                    <div className="tagContainer" style={{display: "flex", alignItems: "center", marginTop: "1rem"}}>
                        <h5>{tag[0]}</h5>
                        <div style={{marginLeft: "auto"}}>
                            <Button variant="success" className="addbtn rasabtn" onClick={() => setShowAddProduct(tag[0])}><FontAwesomeIcon icon={faPlus} /> Add Product</Button>
                            <Button variant="primary" className="moredetailbtn rasabtn" onClick={() => tagClicked(tag[0])}><FontAwesomeIcon icon={faSearch} /> {`Browse`}</Button>
                        </div>
                    </div>
                ))}
            </Container>

            <Modal show={showAddTagModal} onHide={() => setShowAddTagModal(false)}>
                <Modal.Header>
                    <Modal.Title>Add Tag</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <InputGroup size="lg">
                        <InputGroup.Text id="inputGroup-sizing-lg">Tag Name</InputGroup.Text>
                        <Form.Control
                            aria-label="Large"
                            aria-describedby="inputGroup-sizing-sm"
                            onChange={(e) => setTagName(e.target.value)}
                        />
                    </InputGroup>
                    <br />
                    <InputGroup size="lg">
                        <InputGroup.Text id="inputGroup-sizing-lg">Image URL</InputGroup.Text>
                        <Form.Control
                            aria-label="Large"
                            aria-describedby="inputGroup-sizing-sm"
                            onChange={(e) => setTagImage(e.target.value)}
                        />
                    </InputGroup>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={() => setShowAddTagModal(false)}>
                    Close
                </Button>
                <Button variant="primary" className="addbtn rasabtn" onClick={saveTag}>
                    Add Tag
                </Button>
                </Modal.Footer>
            </Modal>
            
            {showAddProduct != "" && <AddProduct isEdit={false} tags={tags} fromTag={true} producttag={showAddProduct} onClose={() => setShowAddProduct("")}/>}
            {showAlert != "" && <ShowToast bg={"success"} message={showAlert} onHide={() => setShowAlert("")}></ShowToast>}
            {showErrorAlert != "" && <ShowToast bg={"danger"} message={showErrorAlert} onHide={() => setShowErrorAlert("")}></ShowToast>}
        </>
    )
}

export default ProductTags;