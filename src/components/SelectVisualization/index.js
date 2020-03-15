import React from 'react';

const SelectVisualization = (props) => {
    return (
	<form>
	    <input type="radio"
		   id="median"
		   name="source"
		   value="map"
		   onChange={() => props.setVisualization("map")}
		   checked={props.visualization === "map"} />
	    <label htmlFor="map">Map</label>
	    <input type="radio"
		   id="mean"
		   name="source"
		   value="barchart"
		   onChange={() => props.setVisualization("barchart")}
		   checked={props.visualization === "barchart"}/>
	    <label htmlFor="barchart">Bar Chart</label>
	</form>
    )
};

export default SelectVisualization;
