import React, { useState } from "react";
import Map from "../Map";
import { DateTimeContext, IntersectionContext } from "../Context";
import { Interval } from "../Context/DateTimeContext";
import { LeafletMouseEvent } from "leaflet";
import { IntersectionSelection } from "../Context/IntersectionContext";
import Charts from "../Charts";

function App() {
  /* Set default values */
  const [intersections, setIntersections] = useState<Array<string>>([]);
  const [starttime, setStarttime] = useState<Date>(
    new Date("2016-09-01 05:00")
  );
  const [interval, setInterval] = useState<Interval>("week");
  const [highlighted, setHighlighted] = useState("");
  const datetimeContext = {
    starttime,
    setStarttime,
    interval,
    setInterval
  }
  const intersectionSelection: IntersectionSelection = {
    intersections,
    setIntersections,
    highlighted,
    setHighlighted
  }


  return (
    <DateTimeContext.Provider value={datetimeContext}>
      <IntersectionContext.Provider value={intersectionSelection}>
        <div className="mapAndGraphsContainer">
          <div className="MapBox">
            <Map />
          </div>
          <Charts />
        </div>
      </IntersectionContext.Provider>
    </DateTimeContext.Provider >
  );
}




export default App;
