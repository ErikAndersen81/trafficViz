import React, { useState } from "react";

import DatePicker from "../Date";
import Skip from "../Skip";
import RunButton from "../RunButton";
import Map from "../Map";
import Graph from "../Graph";
import GraphOptions from "../GraphOptions";
import { HighlightContext, DateTimeContext } from "../Context";
import { Datetime, SkipInterval } from "../Context/DateTimeContext";
import { LeafletMouseEvent } from "leaflet";

function App() {
  /* Set default values */
  const [graphOptions, setGraphOptions] = useState(["aggregated"]);
  const [intersections, setIntersections] = useState<Array<string>>([]);
  const [starttime, setStarttime] = useState<Date>(
    new Date("2016-09-01 05:00")
  );
  const [endtime, setEndtime] = useState<Date>(new Date("2016-09-02 06:00"));
  const [skipInterval, setSkipInterval] = useState<SkipInterval>("hour");
  const [highlighted, setHighlighted] = useState("");
  const interval: Datetime = {
    starttime,
    setStarttime,
    endtime,
    setEndtime,
    skipInterval,
    setSkipInterval,
  };

  const handleIntersectionClick = (event: LeafletMouseEvent) => {
    const key: string = event.target.options.children._owner.key;
    const intersection = key.slice(0, key.indexOf("I"));
    if (intersections.find((x) => intersection === x)) {
      setIntersections(() => intersections.filter((x) => x !== intersection));
    } else {
      setIntersections(() => intersections.concat([intersection]));
    }
  };

  return (
    <DateTimeContext.Provider value={interval}>
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
            <span>From</span>
            <DatePicker
              datetime={starttime}
              setDatetime={setStarttime}
              max={endtime}
            />
          </div>
          <div className="DatetimeSelector">
            <span>To</span>
            <DatePicker
              datetime={endtime}
              setDatetime={setEndtime}
              min={starttime}
            />
          </div>
          <div className="DatetimeSelector">
            <span>Step through time</span>
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
