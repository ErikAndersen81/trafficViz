import React, { useContext, useEffect } from "react";
import Paths from "./Paths";
import Grid from "./Grid";
import { DateTimeContext } from "../Context";
import useData, { getGraphDataRequest, GraphData } from "../Hooks/useData";
import { getScale, Scale } from "../Scaling";
import { getEndtime } from "../Context/DateTimeContext";

type GraphProps = {
  intersections: Array<string>;
  graphOptions: Array<string>;
};

const Graph = (props: GraphProps) => {
  const { graphOptions, intersections } = { ...props };
  const { starttime, interval } = useContext(DateTimeContext);
  const { data, error, isLoading, setPayload } = useData("data");
  const endtime = getEndtime(starttime, interval);
  useEffect(() => {
    const request = getGraphDataRequest(
      starttime,
      endtime,
      intersections,
      graphOptions
    );
    setPayload(request);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setPayload, intersections, graphOptions, starttime, interval]);

  const isGraphData = (variableToCheck: any): variableToCheck is GraphData =>
    (variableToCheck as GraphData).pathData !== undefined;
  if (data === null || !isGraphData(data) || error !== "" || isLoading)
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
  const xInterval = 100 / data.interval;
  const paths = Array.from(data.pathData).map(([groupType, group]) => (
    <Paths
      scale={scale}
      xInterval={xInterval}
      group={groupType}
      key={"Paths" + groupType}
      data={group}
    />
  ));
  const grid = <Grid scale={scale} dates={data.dates} interval={interval} />;
  return (
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
