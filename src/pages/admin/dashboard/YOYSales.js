import React, { useState } from "react";
import { VictoryBar, VictoryChart, VictoryTheme, VictoryAxis } from 'victory';

let data = [
    {year: 2024, revenue: 13000},
    {year: 2023, revenue: 16500},
    {year: 2022, revenue: 14250},
    {year: 2021, revenue: 19000}
];

function YOYSales(props){

    const [salesData, setSalesData] = useState(data);
    const [currProduct, setCurrProduct] = useState("");


    return (
        <div style={{width: "500px", margin: "0 auto"}}>
            <VictoryChart
        // adding the material theme provided with Victory
        theme={VictoryTheme.material}
        domainPadding={20}
      >
        <VictoryAxis
          tickValues={[2024, 2023, 2022, 2021]}
          tickFormat={["2024", "2023", "2022", "2021"]}
        />
        <VictoryAxis
          dependentAxis
          tickFormat={(x) => (`$${x / 1000}k`)}
        />
        <VictoryBar
          data={salesData}
          x="year"
          y="revenue"
        />
      </VictoryChart>
        </div>
    )


}

export default YOYSales;


