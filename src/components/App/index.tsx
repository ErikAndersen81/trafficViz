import React, { useState } from "react";

import DatePicker from "../Timeframe";
import Skip from "../Skip";
import RunButton from "../RunButton";
import Map from "../Map";
import Graph from "../Graph";
import { HighlightContext, DateTimeContext } from "../Context";
import { Datetime, Interval } from "../Context/DateTimeContext";
import { LeafletMouseEvent } from "leaflet";
import Heatmap from "../Heatmap";
import Timeframe from "../Timeframe";

function App() {
  /* Set default values */
  const [intersections, setIntersections] = useState<Array<string>>([]);
  const [starttime, setStarttime] = useState<Date>(
    new Date("2016-09-01 05:00")
  );
  const [interval, setInterval] = useState<Interval>("week");
  const [highlighted, setHighlighted] = useState("");
  const datetime: Datetime = {
    starttime,
    setStarttime,
    interval,
    setInterval,
  };

  const handleIntersectionClick = (
    event: LeafletMouseEvent,
    intersection: string
  ) => {
    if (intersections.find((x) => intersection === x)) {
      setIntersections(() => intersections.filter((x) => x !== intersection));
    } else {
      setIntersections(() => intersections.concat([intersection]));
    }
  };

  return (
    <DateTimeContext.Provider value={datetime}>
      <div className="mapAndGraphsContainer">
        <HighlightContext.Provider
          value={{
            highlighted: highlighted,
            setHighlighted: setHighlighted,
          }}>
          <div className="MapBox">
            <Map handleIntersectionClick={handleIntersectionClick} />
          </div>
          <Charts intersections={intersections} />
        </HighlightContext.Provider>
      </div>
    </DateTimeContext.Provider>
  );
}

type ChartProps = {
  intersections: Array<string>;
};

const Charts = (props: ChartProps) => {
  const { intersections } = { ...props };
  const [showing, setShowing] = useState<string>("heatmap");
  console.log(showing);
  return (
    <div className="Charts">
      <Timeframe />
      <select defaultValue={showing} onChange={(e: React.ChangeEvent<HTMLSelectElement>) => { setShowing(e.currentTarget.value) }}>
        <option
          value="graph">
          Graph
      </option>
        <option
          value="heatmap">
          Heatmap
      </option>
      </select>
      {showing === "graph" && (
        <div className="ChartBox">
          <Graph intersections={intersections} />
        </div>
      )}
      {showing === "heatmap" && (
        <div className="ChartBox">
          <Heatmap intersections={intersections} />
        </div>
      )}
    </div>
  );
};

export default App;
