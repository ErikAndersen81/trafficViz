import React from 'react';

const SelectVisualization = (props) => {
    const visualizations = {
	'barchart':'Bar Charts', 'map':'Map', 'interval':'Graph'
    }
    return (
	<form>
	    {
		Object.keys(visualizations).map( key =>
		    <React.Fragment key={key}>
			<input type="radio"
			       id={key}
			       key={key}
			       name="source"
			       value={key}
			       onChange={() => props.setVisualization(key)}
			       checked={props.visualization === key} />
			<label htmlFor={key}>{visualizations[key]}</label></React.Fragment>)
	    }
	</form>
    )
};

export default SelectVisualization;
