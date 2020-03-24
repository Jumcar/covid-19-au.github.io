import React, { useEffect, useState } from "react";

import CanvasJSReact from "./assets/canvasjs.react";
const CanvasJSChart = CanvasJSReact.CanvasJSChart;

/** Creates the Canvas data points for a particular state*/
function createInstances(stateData, state) {
  let instances = [];

  for (let day in stateData) {
    const cases = stateData[day];
    instances.push({
      x: new Date(day),
      y: stateData[day][state][0]
    });      
  }

  return instances;
}

/** Breaks the data down into spline data points */
function createSeries(stateData) {
  // Map each state into its series
  const states = ['VIC', 'NSW', 'QLD', 'WA', 'SA', 'TAS', 'NT', 'ACT'];
  return states.map(state => 
    ({
      type: "spline",
      name: state,
      showInLegend: true,
      dataPoints: createInstances(stateData, state)
    })
  )
}

/** Generates line graphs for state-level case data */
function StateGraph({stateData}) {
  // CanvasJS API settings
  const [graphOptions, setGraphOptions] = useState(null);
  // Display loading text if data is not yet parsed
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setGraphOptions({
      data: createSeries(stateData),
      animationEnabled: true,
      height: 400,
      title: {
        fontFamily:
          "Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif",
        fontSize: 20
      },
      axisX: {
        labelFontFamily: "sans-serif",
        valueFormatString: 'MMM DD'
      },
      axisY: {
        labelFontFamily: "sans-serif"
      },
      legend: {
        verticalAlign: "top",
        fontFamily: "sans-serif"
      },
      toolTip: {
        shared: true
      }
    })

    setIsLoading(false);
  }, [stateData]);

  return (
    <div className="card">
      <h2>Confirmed Cases in Australian States</h2>
      {isLoading ? <p>Loading...</p> : <CanvasJSChart options={graphOptions} style = {{paddingLeft: '500px'}}/>}
    </div>
  );
}

export default StateGraph;