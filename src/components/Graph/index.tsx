import React, { useContext, useEffect, useState } from "react";
import Paths from "./Paths";
import Grid from "./Grid";
import { DateTimeContext, IntersectionContext } from "../Context";
import useData, {
  createRequest,
  IntersectionData,
} from "../Hooks/useData";
import { getScale, Scale } from "../Scaling";
import { getEndtime } from "../Context/DateTimeContext";
import GraphOptions from "./GraphOptions";


const Graph = () => {
  const { intersections } = useContext(IntersectionContext)
  const [graphOptions, setGraphOptions] = useState(["aggregated"]);
  const { starttime, interval } = useContext(DateTimeContext);
  const { data, error, isLoading, setPayload } = useData("data");
  const endtime = getEndtime(starttime, interval);
  const binSize = interval === "day" ? 1 : 4;
  useEffect(() => {
    const request = createRequest(
      {
        starttime,
        endtime,
        graphOptions,
        binSize,
        intersections
      }
    );
    if (intersections.length > 0) {
      setPayload(request);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setPayload, intersections, graphOptions, starttime, interval]);

  const isGraphData = (
    variableToCheck: any
  ): variableToCheck is IntersectionData =>
    (variableToCheck as IntersectionData).pathData !== undefined;
  if (data === null || !isGraphData(data) || error !== "" || isLoading || data.pathData === null)
    return <BlankGraph />;
  const values = Array.from(Array.from(data.pathData)[0][1].values())
    .map((x) => Array.from(x.values()))
    .map((y) => Array.from(y.values()))
    .flat();
  const scale: Scale = getScale(
    values.length > 0
      ? values.flat().map((x) => (x === null ? 0 : x))
      : [0, 50, 100, 200, 500]
  );
  const xInterval = 100 / data.dates.length;
  const paths = Array.from(data.pathData).map(([groupType, group]) => (
    <Paths
      scale={scale}
      xInterval={xInterval}
      group={groupType}
      key={"Paths" + groupType}
      data={group}
      dates={data.dates}
    />
  ));
  const grid = <Grid scale={scale} dates={data.dates} interval={interval} />;
  return (
    <div className="chart">
      <svg
        viewBox="-10 -10 115 120"
        preserveAspectRatio="none"
        height="100%"
        width="100%">
        <g>
          {grid}
          {paths}
          <text strokeWidth="0" fontSize="4" textAnchor="right" x="-6" y="-5">
            Passings
          </text>
        </g>
      </svg>
      <GraphOptions
        setGraphOptions={setGraphOptions}
        graphOptions={graphOptions}
      />
    </div>
  );
};

const BlankGraph = () => {
  return (
    <div className="chart">
      <h3 style={{ textAlign: "center" }}>No Data</h3>
    </div>
  );
};

export default Graph;
