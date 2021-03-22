import React, { useContext, useEffect, useState } from "react";
import { DateTimeContext } from "../Context";
import { getEndtime } from "../Context/DateTimeContext";
import { useData } from "../Hooks";
import { createTimeframeRequest, DistanceData } from "../Hooks/useData";
import Blocks from "./Blocks";
import Labels from "./Labels";

type HeatmapProps = {
  intersections: Array<string>;
};

const Heatmap = (props: HeatmapProps) => {
  const { intersections } = { ...props }; // Let the user select intersections as in Graph!!
  const { starttime, interval } = useContext(DateTimeContext);
  const { data, error, isLoading, setPayload } = useData("distances");
  const [sortby, setSortby] = useState<number | null>(null);
  const endtime = getEndtime(starttime, interval);

  useEffect(() => {
    const markersPayload: RequestInit = createTimeframeRequest(
      starttime,
      endtime
    );
    setPayload(markersPayload);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setPayload, starttime, interval]);

  const isDistanceData = (
    variableToCheck: any
  ): variableToCheck is DistanceData =>
    (variableToCheck as DistanceData).matrix !== undefined;

  if (data === null || !isDistanceData(data) || error !== "" || isLoading)
    return <BlankGraph />;

  const gridSize = 100 / data.columns.length;

  const { columns, matrix } = sortDataBy(data, sortby);

  return (
    <>
      <svg
        viewBox="-10 -10 115 120"
        preserveAspectRatio="none"
        height="100%"
        width="100%">
        <Labels columns={data.columns} rows={columns} gridSize={gridSize} />
        <Blocks matrix={matrix} gridSize={gridSize} />
      </svg>
      <Options options={data.columns} setOption={setSortby} />
    </>
  );
};

const BlankGraph = () => {
  return (
    <>
      <div>
        <h3 style={{ textAlign: "center" }}>Heatmap</h3>
      </div>
    </>
  );
};

const sortDataBy = (
  data: DistanceData,
  sortby: number | null
): DistanceData => {
  if (sortby === null) return { columns: data.columns, matrix: data.matrix };
  var indices = data.columns.map((x, i) => i);
  const sortFunc = (a: number | null, b: number | null) => {
    const A = a === null ? 1 : a;
    const B = b === null ? 1 : b;
    return A - B;
  };
  indices = indices.sort((a, b) =>
    sortFunc(data.matrix[sortby][a], data.matrix[sortby][b])
  );
  const columns = indices.map((i) => data.columns[i]);
  const matrix = indices.map((i) => data.matrix[i]);
  return { columns, matrix };
};

type OptionsProps = {
  options: Array<string>;
  setOption: React.Dispatch<React.SetStateAction<number | null>>;
};

const Options = (props: OptionsProps) => {
  const { setOption, options } = { ...props };
  return (
    <select>
      {options.map((str, idx) => (
        <option onClick={() => setOption(idx)} key={"option" + idx} value={idx}>
          {str}
        </option>
      ))}
      <option selected={true} onClick={() => setOption(null)}>
        Unsorted
      </option>
    </select>
  );
};

export default Heatmap;
