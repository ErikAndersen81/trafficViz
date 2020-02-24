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
		   id="real"
		   name="source"
		   value="real"
		   onChange={() => props.setSimulation("real")}
		   checked={props.simulation === "real"}/>
	    <label htmlFor="real">Continous values</label>
	</form>
    )
};

export default SelectSource;
