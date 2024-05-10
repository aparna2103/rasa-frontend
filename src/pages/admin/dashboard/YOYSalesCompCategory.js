import React, { useState } from "react";
import { Form } from "react-bootstrap";
import { VictoryPie, VictoryChart, VictoryTheme, VictoryAxis, VictoryTooltip } from 'victory';



let yoydata = [
    {x: "Laptops", y: 20},
    {x: "Tablets", y: 10},
    {x: "Smartphones", y: 30},
    {x: "Cameras", y: 15}
];

function YOYSalesCompCategory(props){

    let [salesData, setSalesData] = useState(yoydata);
    let [year, setYear] = useState(2024);

    const getProdNames = () => {
        let prodNames = []

        salesData.forEach(int => prodNames.push(int.x))

        return prodNames;
    }

    return (
        <>
            <div style={{width: "500px", margin: "0 auto"}}>
                <h5>Select year: </h5>
                <Form.Select aria-label="Default select example" value={year} onChange={e => setYear(parseInt(e.target.value))}>
                    <option value="2024">2024</option>
                    <option value="2023">2023</option>
                    <option value="2022">2022</option>
                </Form.Select>

                <VictoryPie
                    theme={VictoryTheme.material}
                    data={salesData}
                />
            </div>
        </>
    )


}

export default YOYSalesCompCategory;