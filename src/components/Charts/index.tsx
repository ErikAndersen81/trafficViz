import React, { useState } from "react";
import Graph from "../Graph";
import Heatmap from "../Heatmap";
import Timeframe from "../Timeframe";


const Charts = () => {
    const [showing, setShowing] = useState<string>("heatmap");
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
                    <Graph />
                </div>
            )}
            {showing === "heatmap" && (
                <div className="ChartBox">
                    <Heatmap />
                </div>
            )}
        </div>
    );
};

export default Charts;