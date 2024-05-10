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

function InventoryLeftByCategory(){
    const [tag, setTags] = useState([]);
    const [inventory, setInventory] = useState([]);    

    useEffect(() => {
        backendFetchUrl("/inventory/category", {
            method: "POST",
        }).then(response => response.json())
        .then(data => {
            console.log(data);
            if(data.status == 1){
                setTags(data.tags);
                setInventory(data.inventory);
            }
        }).catch(e => {
            console.log(e);
        });
    }, [])

    const getCategories = () => {
        let categories = []

        inventory.forEach(int => categories.push(int.category))

        return categories;
    }

    return (
        <div style={{width: "500px", margin: "0 auto"}}>
            <h5>Inventory Left Per Category</h5>
            <VictoryChart
                // adding the material theme provided with Victory
                theme={VictoryTheme.material}
                domainPadding={20}
            >
                <VictoryAxis
                    tickValues={getCategories()}
                    tickFormat={getCategories()}
                />
                <VictoryAxis
                    dependentAxis
                    tickFormat={((x) => x)}
                />
                <VictoryBar horizontal
                    labelComponent={<VictoryTooltip/>}
                    theme={VictoryTheme.material}
                    data={inventory}
                    x="category"
                    y="quantityLeft"
                />
            </VictoryChart>
        </div>
    )
}

export default InventoryLeftByCategory;