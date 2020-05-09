import React from 'react';

const GraphOptions = props => {
    const meanChecked = props.datatypes.indexOf('mean') > -1;
    const medianChecked = props.datatypes.indexOf('median') > -1;
    const simplifiedChecked = props.datatypes.indexOf('simplified') > -1;
    const change = event => {
	if (event.target.checked){
	    let dts = props.datatypes.concat([event.target.value]);
	    props.setDatatypes(dts);
	} else {
	    let dts = props.datatypes.filter(x => x !== event.target.value);
	    props.setDatatypes(dts);
	}
    }
    return (
	<form onChange={change}>
	    <input type="checkbox"
		   id="mean"
		   name="mean"
		   value="mean"
		   defaultChecked = {meanChecked}/>
	    <label htmlFor="mean">Mean </label>
	    <input type="checkbox"
		   id="median"
		   name="median"
		   value="median"
		   defaultChecked = {medianChecked}/>
	    <label htmlFor="median">Median </label>
	    <input type="checkbox"
		   id="simplified"
		   name="simplified"
		   value="simplified"
		   defaultChecked = {simplifiedChecked}/>
	    <label htmlFor="simplified">Aggregated </label>
	</form>)
}

export default GraphOptions;