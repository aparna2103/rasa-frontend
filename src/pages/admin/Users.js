import React, { useEffect, useState } from "react";
import { backendFetchUrl } from "../../utils/api";
import { faCartShopping, faTrash } from "@fortawesome/free-solid-svg-icons";
import { Button, Container, Form, InputGroup, Modal } from "react-bootstrap";
import { faPlus, faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ShowToast from "../../components/Toast";
import { useNavigate } from "react-router-dom";

function Users(props){

    const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    const [showAlert, setShowAlert] = useState("");
    const [showErrorAlert, setShowErrorAlert] = useState("");

    useEffect(() => {
        backendFetchUrl("/users/all", {
            method: 'GET'
        }).then(response => response.json())
        .then(data => {
            console.log(data);
            if(data.status == 1){
                setUsers(data.users);
            }
        })
    }, [])

    const deleteUser = (userId) => {
        backendFetchUrl("/users/deleteUser/" + userId, {
            method: "DELETE"
        }).then(response => response.json())
        .then(data => {
            console.log(data);
            if(data.status == 1){
                setUsers(users.filter(user => user.userId != userId));
                setShowAlert("User deleted successfully!")
            }else{
                setShowErrorAlert("Unable to delete user!");
            }
        }).catch(error => {
            setShowErrorAlert("Unable to delete user!");
        });
    }


    return (
        <>
            <Container>
                <div style={{display: "flex", alignItems: "center", marginTop: "1rem"}}>
                    <h3>Rasa Users</h3>
                </div>
                {users.length && users.map(user => (
                    <>
                        {user.email != "admin@gmail.com" && (
                                <div className="tagContainer" style={{display: "flex", alignItems: "center", marginTop: "1rem"}}>
                                <div className="userInfoCont">
                                    <h5>Full name: {user.fullName}</h5>
                                    <h5>Email: {user.email}</h5>
                                </div>
                                <div style={{marginLeft: "auto"}}>
                                    <Button variant="success" className="addbtn rasabtn" onClick={() => navigate("/rasa/userorderhistory", {state: {"url": "/orders/getUserOrderHistory", "email": user.email}})}><FontAwesomeIcon icon={faCartShopping} /> View Orders</Button>
                                    <Button variant="danger" className="deletebtn rasabtn" onClick={() => deleteUser(user.userId)}><FontAwesomeIcon icon={faTrash} /> Delete</Button>
                                </div>
                            </div>
                        )}
                    </>
                ))}
            </Container>

            {showAlert != "" && <ShowToast bg={"success"} message={showAlert} onHide={() => setShowAlert("")}></ShowToast>}
            {showErrorAlert != "" && <ShowToast bg={"danger"} message={showErrorAlert} onHide={() => setShowErrorAlert("")}></ShowToast>}
        </>
    )
}

export default Users;