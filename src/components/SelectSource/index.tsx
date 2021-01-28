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
		   id="raw"
		   name="source"
		   value="raw"
		   onChange={() => props.setSimulation("raw")}
		   checked={props.simulation === "raw"}/>
	    <label htmlFor="raw">Actual Measurements</label>
	    <input type="radio"
		   id="upper"
		   name="source"
		   value="upper"
		   onChange={() => props.setSimulation("upper")}
		   checked={props.simulation === "upper"}/>
	    <label htmlFor="upper">Upper bounds</label>
	    <input type="radio"
		   id="lower"
		   name="source"
		   value="lower"
		   onChange={() => props.setSimulation("lower")}
		   checked={props.simulation === "lower"}/>
	    <label htmlFor="lower">Bounds</label>
	    <input type="radio"
		   id="filled"
		   name="source"
		   value="filled"
		   onChange={() => props.setSimulation("filled")}
		   checked={props.simulation === "filled"}/>
	    <label htmlFor="filled">Filled with median</label>
	</form>
    )
};

export default SelectSource;
