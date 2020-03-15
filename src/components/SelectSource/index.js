import React from 'react';

const SelectSource = (props) => {
    return (
	<form>
	    <input type="radio"
		   id="median"
		   name="source"
		   value="median"
		   onChange={() => props.setSimulation("median")}
		   checked={props.simulation === "median"} />
	    <label htmlFor="median">Median week</label>
	    <input type="radio"
		   id="mean"
		   name="source"
		   value="mean"
		   onChange={() => props.setSimulation("mean")}
		   checked={props.simulation === "mean"}/>
	    <label htmlFor="mean">Mean Week</label>
	    <input type="radio"
		   id="real"
		   name="source"
		   value="real"
		   onChange={() => props.setSimulation("real")}
		   checked={props.simulation === "real"}/>
	    <label htmlFor="real">Actual Measurements</label>
	    <input type="radio"
		   id="bounds"
		   name="source"
		   value="bounds"
		   onChange={() => props.setSimulation("bounds")}
		   checked={props.simulation === "bounds"}/>
	    <label htmlFor="real">Bounds</label>
	</form>
    )
};

export default SelectSource;
