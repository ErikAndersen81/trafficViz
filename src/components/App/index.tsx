import React, { useState } from "react";

import DatePicker from "../Date";
import Skip from "../Skip";
import RunButton from "../RunButton";
import Map from "../Map";
import Graph from "../Graph";
import GraphOptions from "../GraphOptions";
import { HighlightContext, DateTimeContext } from "../Context";
import { Datetime, Interval } from "../Context/DateTimeContext";
import { LeafletMouseEvent } from "leaflet";

function App() {
  /* Set default values */
  const [graphOptions, setGraphOptions] = useState(["aggregated"]);
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
    console.log(intersection);
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
          <div className="GraphBox">
            <Graph graphOptions={graphOptions} intersections={intersections} />
            <GraphOptions
              graphOptions={graphOptions}
              setGraphOptions={setGraphOptions}
            />
          </div>
        </HighlightContext.Provider>
        <div className="DatetimeBox">
          <div className="DatetimeSelector">
            <span>Start time</span>
            <DatePicker datetime={starttime} setDatetime={setStarttime} />
          </div>
          <div className="DatetimeSelector">
            <span>Time span</span>
            <Skip />
          </div>
          <div className="DatetimeSelector">
            <span>Automatic step</span>
            <RunButton />
          </div>
        </div>
      </div>
    </DateTimeContext.Provider>
  );
}

export default App;
