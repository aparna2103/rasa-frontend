import React, { useState } from 'react';
import ProductSlider from '../../components/ProductSlider';
import ProductCarousal from './ProductCarousal';
import YOYSales from '../admin/dashboard/YOYSales';
import YOYSalesCompCategory from '../admin/dashboard/YOYSalesCompCategory';
import InventoryLeft from '../admin/dashboard/InventoryLeft';
import { Col, Container, Row } from 'react-bootstrap';
import InventoryLeftByCategory from '../admin/dashboard/InventoryLeftByCategory';
import { backendFetchUrl } from '../../utils/api';

function RasaHome(props){
    const [totalorders, setTotalOrders] = useState(-1);
    const [totalamount, setTotalAmount] = useState(0);
    const [totalProductsSold, setTotalProductsSold] = useState(0);

    const getSalesBackend = () => {
        backendFetchUrl("/inventory/getSales", {
            method: "GET"
        }).then(response => response.json())
        .then(data => {
            console.log(data);
            if(data.status == 1){
                setTotalOrders(data.totalOrders);
                setTotalAmount(data.totalAmount);
                setTotalProductsSold(data.totalProductsSold);
            }
        }).catch(e => {
            console.log(e);
        });
    }

    return (
        <>
            {props.loggedInUser && props.loggedInUser.role == 1?(
                <>
                    <ProductCarousal />
                    <ProductSlider title="Trending" url="/getproducts/home"/>
                </>
            ):(
                <>
                    {totalorders == -1 && getSalesBackend()}

                    <h3 style={{textAlign: 'center', margin: '4rem 0'}}>Rasa Sales Dashboard</h3>
                    
                    <Container className='inventoryDashboard'>
                    <h3 style={{textAlign: 'center', marginBottom: '3rem'}}>Rasa Economics</h3>
                        <Row>
                            <Col>
                                <h5>Total Orders Processed: {totalorders}</h5>
                                <h5>Total Amount Made: ${totalamount}</h5>
                                <h5>Total Products Sold: {totalProductsSold}</h5>
                            </Col>
                        </Row>
                    </Container>

                    <Container className='inventoryDashboard'>
                    <h3 style={{textAlign: 'center', marginBottom: '3rem'}}>Visualization: Total sales per year</h3>
                        <Row>
                            <Col>
                                <YOYSales />
                            </Col>
                        </Row>
                    </Container>

                    <Container className='inventoryDashboard'>
                    <h3 style={{textAlign: 'center', marginBottom: '3rem'}}>Number of products sold per category</h3>
                        <Row>
                            <Col>
                                <YOYSalesCompCategory />
                            </Col>
                        </Row>
                    </Container>
                    <Container className='inventoryDashboard'>
                        <h3 style={{textAlign: 'center', marginBottom: '3rem'}}>Visualization of products left in inventory</h3>
                        <Row>
                            <Col>
                                <InventoryLeft />
                            </Col>
                            <Col>
                                <InventoryLeftByCategory />
                            </Col>
                        </Row>
                    </Container>
                </>
            )}
        </>
        // <YOYSales />
    )
}

export default RasaHome;