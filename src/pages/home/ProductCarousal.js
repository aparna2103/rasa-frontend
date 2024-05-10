import React from "react";
import { Navbar, Container, Nav, NavDropdown, Form, FormControl, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Carousel from 'react-bootstrap/Carousel';
import SliderImage from "../../components/SliderImage";
import { useNavigate } from "react-router-dom";

function ProductCarousal(props){

  const navigate = useNavigate();


    return (
        <Carousel style={{marginBottom: '2rem'}}>
          <Carousel.Item>
            <SliderImage text="Acer Aspire 3 A315-24P-R7VH" imageurl="https://cdn.thewirecutter.com/wp-content/media/2023/09/windowsultrabooks-2048px-02832.jpg?auto=webp&width=1024"/>
            <Carousel.Caption>
              <h3>Acer Aspire 3 A315-24P-R7VH</h3>
              <Button className="moredetailbtn rasabtn" onClick={() => navigate("/rasa/productDetail", { state: {"productId": 7, "productTag": "Laptops" }})}>Explore</Button>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <SliderImage text="Lenovo IdeaPad 1 Student Laptop" imageurl="https://cdn.thewirecutter.com/wp-content/media/2023/06/bestlaptops-2048px-9765.jpg?auto=webp&quality=75&width=980&dpr=2"/>
            <Carousel.Caption>
              <h3>Lenovo IdeaPad 1 Student Laptop</h3>
              <Button className="moredetailbtn rasabtn" onClick={() => navigate("/rasa/productDetail", { state: {"productId": 6, "productTag": "Laptops" }})}>Explore</Button>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <SliderImage text="ThinkPad X1 Carbon Gen 11" imageurl="https://cdn.thewirecutter.com/wp-content/media/2023/06/ultrabooks-2048px-0883.jpg"/>
            <Carousel.Caption>
              <h3>ThinkPad X1 Carbon Gen 11</h3>
              <Button className="moredetailbtn rasabtn" onClick={() => navigate("/rasa/productDetail", { state: {"productId": 502, "productTag": "Laptops" }})}>Explore</Button>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
    );
}

export default ProductCarousal;