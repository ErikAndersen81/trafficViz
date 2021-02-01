import React, { useContext, useEffect } from "react";
/* import Disturbances from "./Disturbances";*/
import Paths from "./Paths";

import Grid from "./Grid";
import { DateTimeContext } from "../Context";
import useData, { getGraphDataRequest, GraphData } from "../Hooks/useData";

type GraphProps = {
  intersections: Array<string>;
  graphOptions: Array<string>;
};

const Graph = (props: GraphProps) => {
  const { graphOptions, intersections } = { ...props };
  const { starttime, endtime } = useContext(DateTimeContext);
  const { data, error, isLoading, setPayload } = useData("data");

  useEffect(() => {
    const request = getGraphDataRequest(
      starttime,
      endtime,
      intersections,
      graphOptions
    );
    setPayload(request);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setPayload, intersections, graphOptions, starttime, endtime]);

  const isGraphData = (variableToCheck: any): variableToCheck is GraphData =>
    (variableToCheck as GraphData).pathData !== undefined;
  if (data === null || !isGraphData(data) || error !== "" || isLoading)
    return <BlankGraph />;
  const slice = data.interval;
  const maxVal = data.maxVal !== 0 ? data.maxVal : 1;
  const scalar_x = 100 / slice;
  const scalar_y = 100 / maxVal;
  const paths = Array.from(data.pathData).map(([groupType, group]) => (
    <Paths
      scalar_x={scalar_x}
      scalar_y={scalar_y}
      group={groupType}
      key={"Paths" + groupType}
      data={group}
    />
  ));
  const grid = (
    <Grid
      scalar_x={scalar_x}
      scalar_y={scalar_y}
      slice={slice}
      maxVal={maxVal}
      dates={data.dates}
    />
  );
  return (
    <svg
      viewBox="-7 -10 110 120"
      preserveAspectRatio="none"
      height="100%"
      width="100%">
      <g>
        {grid}
        {paths}

        <text strokeWidth="0" fontSize="4" textAnchor="right" x="-6" y="-5">
          Passings
        </text>
        {/*<Disturbances data={data.disturbances} scalar_x={scalar_x} />*/}
      </g>
    </svg>
  );
};

const BlankGraph = () => {
  return (
    <>
      <h3>Loading...</h3>
    </>
  );
};

export default Graph;
