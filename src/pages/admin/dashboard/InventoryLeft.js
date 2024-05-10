import React, { useEffect, useState } from "react";
import { useAccordionButton } from "react-bootstrap";
import { VictoryBar, VictoryChart, VictoryTheme, VictoryAxis, VictoryTooltip } from 'victory';
import { Form } from "react-bootstrap";
import { backendFetchUrl } from "../../../utils/api";

let data = [
    {product: "lenovo", inventory: 2000, label: 2000},
    {product: "apple", inventory: 5000, label: 5000},
    {product: "samsung", inventory: 200, label: 200},
    {product: "acer", inventory: 1500, label: 1500},
    {product: "lenfovo", inventory: 2000, label: 2000},
    {product: "apfple", inventory: 5000, label: 5000},
    {product: "samhsung", inventory: 200, label: 200},
    {product: "acegfr", inventory: 1500, label: 1500},
    {product: "ledsnovo", inventory: 2000, label: 2000},
    {product: "appssle", inventory: 5000, label: 5000},
    {product: "samhhsung", inventory: 200, label: 200},
    {product: "aceddr", inventory: 1500, label: 1500}
];

function InventoryLeft(){
    const [tag, setTag] = useState("Laptops");
    const [inventory, setInventory] = useState([]);

    

    useEffect(() => {
        backendFetchUrl("/inventory", {
            method: "POST",
            body: JSON.stringify({"tagName": tag})
        }).then(response => response.json())
        .then(data => {
            console.log(data);
            if(data.status == 1){
                setInventory(data.inventory);
            }
        }).catch(e => {
            console.log(e);
        });
    }, [tag])

    const getProdNames = () => {
        let prodNames = []

        inventory.forEach(int => prodNames.push(int.productName))

        return prodNames;
    }

    return (
        <div style={{width: "500px", margin: "0 auto"}}>
            <div className="dashboardSelect">
                <h5>Select category: </h5>
                <Form.Select aria-label="Default select example" value={tag} onChange={e => setTag(e.target.value)}>
                    <option value="Laptops">Laptops</option>
                    <option value="Tablets">Tablets</option>
                    <option value="Smartphones">Smartphones</option>
                </Form.Select>
            </div>
            <VictoryChart
                // adding the material theme provided with Victory
                theme={VictoryTheme.material}
                domainPadding={20}
            >
                <VictoryAxis
                    tickValues={getProdNames()}
                    tickFormat={getProdNames()}
                />
                <VictoryAxis
                    dependentAxis
                    tickFormat={((x) => x)}
                />
                <VictoryBar horizontal
                    labelComponent={<VictoryTooltip/>}
                    theme={VictoryTheme.material}
                    data={inventory}
                    x="productName"
                    y="quantityLeft"
                />
            </VictoryChart>
        </div>
    )
}

export default InventoryLeft;