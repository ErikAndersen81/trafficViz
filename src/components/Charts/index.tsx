import React, { useState } from "react";
import Graph from "../Graph";
import Heatmap from "../Heatmap";
import IntersectionSelection from "../IntersectionSelection";
import Timeframe from "../Timeframe";


const Charts = () => {
    const [showing, setShowing] = useState<string>("heatmap");
    return (
        <div className="Charts">
            <Timeframe />
            <IntersectionSelection />
            <div className="box">
                <span>Chart: </span>
                <select title="Graph type" defaultValue={showing} onChange={(e: React.ChangeEvent<HTMLSelectElement>) => { setShowing(e.currentTarget.value) }}>
                    <option
                        title="Temporal flow intensities"
                        value="graph">
                        Timeline
        </option>
                    <option
                        title="Flow probability distances"
                        value="heatmap">
                        Distances
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
        </div>
    );
};

export default Charts;