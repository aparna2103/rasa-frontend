import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { backendFetchUrl } from "../utils/api";
import ShowToast from "./Toast";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";


function AddToWishlist(props){
    const [showAlert, setShowAlert] = useState(false);
    const [showErrorAlert, setShowErrorAlert] = useState(false);

    const addToWishlist = () => {
        backendFetchUrl("/wishlist/add/" + props.productId, {
            method: 'POST'
        }).then(response => response.json())
        .then(data => {
            console.log(data);
            if(data.status == 1){
                setShowAlert(true)
            }else{
                setShowErrorAlert(true);
            }
        });
    }

    return (
        <>
            <Button variant="primary" className="rasabtn moredetailbtn" onClick={addToWishlist}><FontAwesomeIcon icon={faHeart} /> Add to Wishlist</Button>
            {showAlert && <ShowToast bg={"success"} message={"Product added successfully!"} onHide={() => setShowAlert(false)}></ShowToast>}
            {showErrorAlert && <ShowToast bg={"danger"} message={"Product already in wishlist!"} onHide={() => setShowErrorAlert(false)}></ShowToast>}
        </>
        
    )
}

export default AddToWishlist;